import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/modules/blockchain/services/blockchain.service';

@Component({
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.scss'],
})
export class PendingTransactionsComponent implements OnInit {
  constructor(public service: BlockchainService) {}

  ngOnInit() {}

  submitPendingTransactions() {
    this.service.announceNewBlockRequest();
  }
}
