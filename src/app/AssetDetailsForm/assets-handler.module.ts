import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsHandlerComponent } from './assets-handler.component';

@NgModule({
  declarations: [AssetsHandlerComponent],
  exports: [AssetsHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class AssetsHandlerModule { }
