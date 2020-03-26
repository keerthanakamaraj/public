import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoNoGoComponent } from './go-no-go.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { GoNoGoRoutingModule } from './go-no-go.routing.module';



@NgModule({
  declarations: [
    GoNoGoComponent
  ],
  imports: [
    CommonModule,
    GoNoGoRoutingModule,
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
    GoNoGoComponent
  ]
})
export class GoNoGoModule { }
