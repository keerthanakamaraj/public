import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QDEHandlerComponent } from './QDE-handler.component';

@NgModule({
  declarations: [QDEHandlerComponent],
  exports: [QDEHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class QDEHandlerModule { }
