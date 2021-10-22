import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/modules/blockchain/services/blockchain.service';

@Component({
  selector: 'app-blockchain-state',
  templateUrl: './blockchain-state.component.html',
  styleUrls: ['./blockchain-state.component.scss'],
})
export class BlockchainStateComponent implements OnInit {
  constructor(public service: BlockchainService) {}

  ngOnInit() {}
}
