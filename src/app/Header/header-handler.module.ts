import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderHandlerComponent } from './header-handler.component';

@NgModule({
  declarations: [HeaderHandlerComponent],
  exports: [HeaderHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class HeaderHandlerModule { }
