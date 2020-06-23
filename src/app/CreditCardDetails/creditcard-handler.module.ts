import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardHandlerComponent } from '../CreditCardDetails/creditcard-handler.component';

@NgModule({
  declarations: [CreditCardHandlerComponent],
  exports: [CreditCardHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class CreditCardHandlerModule { }
