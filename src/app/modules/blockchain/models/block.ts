import { Transaction } from './transaction';
import * as sha from 'sha.js';

export class Block {
  hash: string = '';
  nonce: number = 0;

  constructor(public previousHash: string, public timestamp: number, public data: Transaction[]) {}

  async mine() {
    while (!this.hash.startsWith('0000')) {
      this.hash = await this.calculateHash(++this.nonce);
    }
  }

  private async calculateHash(nonce: number) {
    const data = this.previousHash + this.timestamp + this.data + nonce;
    return sha('sha256').update(data).digest('hex');
  }
}
