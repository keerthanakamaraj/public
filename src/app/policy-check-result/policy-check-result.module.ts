import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyCheckResultComponent } from './policy-check-result.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { PolicyCheckResultRoutingModule } from './policy-check-result.routing.module';



@NgModule({
  declarations: [
    PolicyCheckResultComponent
  ],
  imports: [
    CommonModule,
    PolicyCheckResultRoutingModule,
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
    PolicyCheckResultComponent
  ]
})
export class PolicyCheckResultModule { }
