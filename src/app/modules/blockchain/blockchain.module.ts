import { BlockchainService } from '@blockhain/services/blockchain.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './components/block/block.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BlockComponent],
  providers: [BlockchainService],
  exports: [BlockComponent],
})
export class BlockchainModule {}
