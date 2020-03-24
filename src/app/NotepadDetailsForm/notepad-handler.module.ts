import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotepadHandlerComponent } from './notepad-handler.component';

@NgModule({
  declarations: [NotepadHandlerComponent],
  exports: [NotepadHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class NotepadHandlerModule { }
