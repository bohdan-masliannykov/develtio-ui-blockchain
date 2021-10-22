import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockchainService } from 'src/app/modules/blockchain/services/blockchain.service';

export enum TransactionForm {
  SENDER = 'sender',
  RECIPIENT = 'recipient',
  AMOUNT = 'amount',
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  form: FormGroup;
  TransactionForm = TransactionForm;

  get controls() {
    return this.form?.controls;
  }

  get defaultFormData(): { [key: string]: any } {
    return {
      [TransactionForm.SENDER]: null,
      [TransactionForm.RECIPIENT]: null,
      [TransactionForm.AMOUNT]: '0.00',
    };
  }

  constructor(private fb: FormBuilder, private service: BlockchainService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group(this.defaultFormData);
    this.form.get(TransactionForm.SENDER)?.setValidators([Validators.required]);
    this.form.get(TransactionForm.RECIPIENT)?.setValidators([Validators.required]);
    this.form.get(TransactionForm.AMOUNT)?.setValidators([Validators.required, Validators.min(0.1)]);
    this.form.updateValueAndValidity();
  }

  resetForm() {
    this.form.reset();
    this.form.setValue(this.defaultFormData);
  }

  submitTransaction() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.service.blockchain.createPendingTransaction(this.form.value);
    this.resetForm();
  }
}
