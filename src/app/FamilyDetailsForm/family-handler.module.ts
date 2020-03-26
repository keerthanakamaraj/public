import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyHandlerComponent } from './family-handler.component';

@NgModule({
  declarations: [FamilyHandlerComponent],
  exports: [FamilyHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class FamilyHandlerModule { }
