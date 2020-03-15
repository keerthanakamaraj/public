import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiationHandlerComponent } from './initiation-handler.component';

@NgModule({
  declarations: [InitiationHandlerComponent],
  exports: [InitiationHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class InitiationHandlerModule { }
