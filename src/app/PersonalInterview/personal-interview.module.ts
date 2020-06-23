import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInterviewComponent } from './personal-interview.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { PersonalInterviewRoutingModule } from './personal-interview.routing.module';



@NgModule({
  declarations: [
    PersonalInterviewComponent
  ],
  imports: [
    CommonModule,
    PersonalInterviewRoutingModule,
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
    PersonalInterviewComponent
  ]
})
export class PersonalInterviewModule { }
