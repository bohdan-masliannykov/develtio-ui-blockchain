import { Transaction } from './transaction';
import { Block } from './block';

export class Blockchain {
  processingTransactions: boolean = false;

  private _chain: Block[] = [];
  private _pendingTransactions: Transaction[] = [];

  get lastBlock(): Block {
    return this._chain[this._chain.length - 1];
  }

  get chain(): Block[] {
    return [...this._chain];
  }

  get pendingTransactions(): Transaction[] {
    return [...this._pendingTransactions];
  }

  constructor() {}

  setTheLongestChain(chain: Block[]) {
    this._chain = [...chain];
  }

  async createGenesisBlock(): Promise<any> {
    const block = new Block('0', Date.now(), []);
    await block.mine();
    this._chain.push(block);
  }

  createPendingTransaction(transaction: Transaction): void {
    this._pendingTransactions.push(transaction);
  }

  async minePendingTransactions(): Promise<Block> {
    return new Promise(async (res, reject) => {
      if (this.processingTransactions) return;
      this.processingTransactions = true;

      const block = new Block(this.lastBlock.hash, Date.now(), this._pendingTransactions);
      await block.mine();
      res(block);
    });
  }

  addBlockToBlockchain(block: Block) {
    this._chain.push(block);
    this._pendingTransactions = [];
    this.processingTransactions = false;
  }
}
