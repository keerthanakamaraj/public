import { NgModule } from '@angular/core';
import { ScoreCardComponent } from './score-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ ScoreCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ScoreCardComponent
  ]
})
export class ScoreCardModule { }
