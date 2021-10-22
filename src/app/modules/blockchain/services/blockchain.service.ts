import { Message, UUID } from '@blockhain/models/message';
import { Injectable } from '@angular/core';
import { WebsocketController } from '@blockhain/controllers/websocket.controller';
import { MessageTypes } from '@blockhain/enums/message-types.enum';
import { Blockchain } from '../models/blockchain';
import { v4 as uuid } from 'uuid';
import { Block } from '@blockhain/models/block';

@Injectable()
export class BlockchainService {
  correlationId: UUID;
  blockchain: Blockchain;
  websocketCtrl: WebsocketController;

  constructor() {
    const uuidname = 'develtio-uuid';
    const item = localStorage.getItem(uuidname);
    this.correlationId = item || uuid();

    if (!item) {
      localStorage.setItem(uuidname, uuid());
    }

    this.blockchain = new Blockchain();
    this.websocketCtrl = new WebsocketController(this.handleServerMessages.bind(this), this.correlationId);
    this.initializeBlockchainNode();
  }

  private async initializeBlockchainNode() {
    const blocks: Block[] = await this.websocketCtrl.requestLongestChain();
    if (blocks.length > 0) {
      this.blockchain.setTheLongestChain(blocks);
    } else {
      await this.blockchain.createGenesisBlock();
    }
  }

  private handleServerMessages(message: Message) {
    switch (message.type) {
      case MessageTypes.GET_LONGEST_CHAIN_REQUEST:
        return this.handleGetLongestChainRequest(message);
      case MessageTypes.GET_LONGEST_CHAIN_RESPONSE:
        return this.handleNewBlockRequest(message);
      case MessageTypes.NEW_BLOCK_ANNOUNCEMENT:
        return this.handleNewBlockAnnouncement(message);
      default: {
        console.log(`Received message of unknown type: "${message.type}"`);
      }
    }
  }

  private handleGetLongestChainRequest(message: Message): void {
    this.websocketCtrl.send({
      type: MessageTypes.GET_LONGEST_CHAIN_RESPONSE,
      correlationId: message.correlationId,
      payload: this.blockchain.chain,
    });
  }

  private handleNewBlockRequest(message: Message): void {}

  private handleNewBlockAnnouncement(message: Message): void {
    console.log('New transactions to be mined', message.payload);
  }

  announceNewBlockRequest() {
    this.websocketCtrl.send({
      type: MessageTypes.NEW_BLOCK_ANNOUNCEMENT,
      correlationId: this.correlationId,
      payload: this.blockchain.pendingTransactions,
    });

    this.blockchain.minePendingTransactions().then((block) => {
      this.blockchain.addBlockToBlockchain(block);
      this.newBlockAnnounce(block);
    });
  }

  newBlockAnnounce(block: Block) {
    this.websocketCtrl.send({
      type: MessageTypes.NEW_BLOCK_ANNOUNCEMENT,
      correlationId: this.correlationId,
      payload: block,
    });
  }
}
