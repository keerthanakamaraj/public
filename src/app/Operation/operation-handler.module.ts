import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationFormHandlerComponent } from './opertion-handler.component';

@NgModule({
  declarations: [OperationFormHandlerComponent],
  exports: [OperationFormHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class OperationHandlerModule { }
