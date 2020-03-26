import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OccupationHandlerComponent } from './occupation-handler.component';

@NgModule({
  declarations: [OccupationHandlerComponent],
  exports: [OccupationHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class OccupationHandlerModule { }
