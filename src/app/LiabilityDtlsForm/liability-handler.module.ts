import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiabilityHandlerComponent } from './liability-handler.component';

@NgModule({
  declarations: [LiabilityHandlerComponent],
  exports: [LiabilityHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class LiabilityHandlerModule { }
