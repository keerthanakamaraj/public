import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FDDetailsHandlerComponent } from './fd-handler.component';

@NgModule({
  declarations: [FDDetailsHandlerComponent],
  exports: [FDDetailsHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class FDDetailsHandlerModule { }
