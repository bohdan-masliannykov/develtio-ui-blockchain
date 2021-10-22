import { NgControl } from '@angular/forms';
import { Directive, ElementRef } from '@angular/core';

/**
 * Store/Clean up old input value
 *
 * @export
 * @class InputNumberDirective
 */
@Directive({
  selector: '[inputNumber]',
})
export class InputNumberDirective {
  input: HTMLInputElement;
  tempValue: any;

  changed: boolean = false;

  get isReadOnly() {
    return this.input?.hasAttribute('readonly');
  }

  constructor(private _elemRef: ElementRef, private control: NgControl) {
    this.input = this._elemRef.nativeElement;

    //Input events automatically removed onDestroy
    this.input.addEventListener('focus', () => this.updateFocusIn());
    this.input.addEventListener('input', () => this.updateInput());
    this.input.addEventListener('focusout', () => this.updateFocusOut());
  }

  updateInput() {
    this.changed = true; // trigger change
  }

  updateFocusIn() {
    if (this.isReadOnly) return;
    this.tempValue = this.input.value; // store old value
    this.input.value = ''; //clean the input
  }

  updateFocusOut() {
    if (this.isReadOnly) return;
    // check if field changed don`t modify
    if (this.changed) {
      this.changed = false;
      return;
    }
    this.control?.control?.setValue(this.tempValue); // Update reactive form if needed
    this.input.value = this.tempValue; // re-write temp value if nothing changed
  }
}
