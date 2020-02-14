import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraftFormRoutingModule } from './draft-form-routing.module'
import { DraftFormComponent } from './draft-form.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';

@NgModule({
  imports: [
    CommonModule,
    DraftFormRoutingModule,
    RAFormModule,
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
    DraftFormComponent,
  ]
})
export class DraftFormModule { }

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
