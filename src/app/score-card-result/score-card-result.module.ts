import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreCardResultComponent } from './score-card-result.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { ScoreCardResultRoutingModule } from './score-card-result.routing.module';



@NgModule({
  declarations: [
    ScoreCardResultComponent
  ],
  imports: [
    CommonModule,
    ScoreCardResultRoutingModule,
    RAFormModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    ScoreCardResultComponent
  ]
})
export class ScoreCardResultModule { }
