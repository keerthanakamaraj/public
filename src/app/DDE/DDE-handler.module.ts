import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DDEHandlerComponent } from './DDE-handler.component';

@NgModule({
  declarations: [DDEHandlerComponent],
  exports: [DDEHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class DDEHandlerModule { }
