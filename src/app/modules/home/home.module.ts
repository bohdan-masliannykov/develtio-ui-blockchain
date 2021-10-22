import { BlockchainStateComponent } from './components/blockchain-state/blockchain-state.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { PendingTransactionsComponent } from './components/pending-transactions/pending-transactions.component';
import { BlockchainStatusComponent } from './components/blockchain-status/blockchain-status.component';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTrimModule } from 'ng2-trim-directive';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { InputNumberDirective } from './directives/input-number.directive';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

const DUMB_COMPONENTS = [
  TransactionFormComponent,
  PendingTransactionsComponent,
  BlockchainStatusComponent,
  BlockchainStateComponent,
];

@NgModule({
  imports: [
    CommonModule,
    BlockchainModule,
    FormsModule,
    ReactiveFormsModule,
    InputTrimModule,
    DigitOnlyModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomeComponent, InputNumberDirective, DUMB_COMPONENTS],
})
export class HomeModule {}
