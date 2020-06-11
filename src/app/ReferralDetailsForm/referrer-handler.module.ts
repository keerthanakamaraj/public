import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralDetailsFormHandlerComponent } from './referrer-handler.component';

@NgModule({
  declarations: [ReferralDetailsFormHandlerComponent],
  exports: [ReferralDetailsFormHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class ReferrerDetailsHandlerModule { }
