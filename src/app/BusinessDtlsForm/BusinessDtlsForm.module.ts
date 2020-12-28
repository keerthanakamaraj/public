import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { BusinessDtlsFormRoutingModule } from './BusinessDtlsForm-routing.module';
import { BusinessDtlsFormComponent } from './BusinessDtlsForm.component';
import { BusinessHandlerModule } from './business-handler.module';

@NgModule({
  imports: [
    CommonModule,
    BusinessDtlsFormRoutingModule,
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
    BusinessHandlerModule
  ],
  declarations: [
    BusinessDtlsFormComponent,
  ],
  exports: [
    BusinessDtlsFormComponent,
  ],
})
export class BusinessDtlsFormModule { }
