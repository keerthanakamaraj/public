import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressHandlerComponent } from './address-handler.component';

@NgModule({
  declarations: [AddressHandlerComponent],
  exports: [AddressHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class AddressHandlerModule { }
