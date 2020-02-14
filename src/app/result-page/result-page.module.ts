import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultPageRoutingModule } from './result-page-routing.module';
import { ResultPageComponent } from './result-page.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    ResultPageRoutingModule,
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
  declarations: [
    ResultPageComponent,
  ] 
}) 
export class ResultPageModule { }

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
