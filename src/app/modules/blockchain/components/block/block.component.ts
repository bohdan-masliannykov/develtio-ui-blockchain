import { Component, Input, OnInit } from '@angular/core';
import { Block } from '@blockhain/models/block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {
  @Input() block: Block;

  constructor() {}

  ngOnInit() {}
}
