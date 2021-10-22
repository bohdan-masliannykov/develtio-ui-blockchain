import { Component, OnInit } from '@angular/core';
import { MessageTypes } from '@blockhain/enums/message-types.enum';

import { BlockchainService } from '../blockchain/services/blockchain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: BlockchainService) {}

  ngOnInit() {}
}
