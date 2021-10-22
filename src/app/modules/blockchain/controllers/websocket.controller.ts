import { MessageTypes } from '@blockhain/enums/message-types.enum';
import { PromiseExecutor } from '@blockhain/interfaces/promise-executor.interface';
import { UUID, Message } from '@blockhain/models/message';
import { Connection } from '@shared/configs/connection';

export class WebsocketController {
  private websocket: Promise<WebSocket>;
  private readonly messagesAwaitingReply = new Map<UUID, PromiseExecutor<Message>>();

  constructor(private readonly messagesCallback: (messages: Message) => void, private correlationId: UUID) {
    this.websocket = this.connect();
  }

  private connect(): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(Connection.websocket);
      ws.addEventListener('open', () => resolve(ws));
      ws.addEventListener('error', (err) => reject(err));
      ws.addEventListener('message', this.onMessageReceived);
    });
  }

  private readonly onMessageReceived = (event: MessageEvent) => {
    const message = JSON.parse(event.data) as Message;

    if (this.messagesAwaitingReply.has(message.correlationId)) {
      this.messagesAwaitingReply.get(message.correlationId).resolve(message);
      this.messagesAwaitingReply.delete(message.correlationId);
    } else {
      this.messagesCallback(message);
    }
  };

  async send(message: Partial<Message>, awaitForReply: boolean = false): Promise<Message> {
    return new Promise<Message>(async (resolve, reject) => {
      if (awaitForReply) {
        this.messagesAwaitingReply.set(message.correlationId, { resolve, reject });
      }
      this.websocket.then(
        (ws) => ws.send(JSON.stringify(message)),
        () => this.messagesAwaitingReply.delete(message.correlationId)
      );
    });
  }

  async requestLongestChain() {
    const reply = await this.send(
      {
        type: MessageTypes.GET_LONGEST_CHAIN_REQUEST,
        correlationId: this.correlationId,
      },
      true
    );
    return reply.payload;
  }
}
