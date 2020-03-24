import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationHandlerComponent } from './application-handler.component';

@NgModule({
  declarations: [ApplicationHandlerComponent],
  exports: [ApplicationHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class ApplicationHandlerModule { }
