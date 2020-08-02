import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyHandlerComponent } from '../PropertyDetails/property-handler.component';

@NgModule({
  declarations: [PropertyHandlerComponent],
  exports: [PropertyHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class PropertyHandlerModule { }
