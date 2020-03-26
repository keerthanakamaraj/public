import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHandlerComponent } from './customer-handler.component';

@NgModule({
  declarations: [CustomerHandlerComponent],
  exports: [CustomerHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class CustomerHandlerModule { }
