import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoldDetailsHandlerComponent } from './gold-handler.component';

@NgModule({
  declarations: [GoldDetailsHandlerComponent],
  exports: [GoldDetailsHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class GoldDetailsHandlerModule { }
