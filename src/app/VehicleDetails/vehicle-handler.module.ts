import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDetailsHandlerComponent } from './vehicle-handler.component';

@NgModule({
  declarations: [VehicleDetailsHandlerComponent],
  exports: [VehicleDetailsHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class VehicleDetailsHandlerModule { }
