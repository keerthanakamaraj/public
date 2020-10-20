import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSearchFieldsComponent } from '../customer-search-fields/customer-search-fields.component';
// import { RAFormModule } from '../ra-form/ra-form.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { CustomerSearchFieldsRoutingModule } from './customer-search-fileds.routing.module';
import { IgcbDatepickerModule } from '../igcb-datepicker/igcb-datepicker.module';

@NgModule({
  declarations: [
    CustomerSearchFieldsComponent
  ],
  imports: [
    CommonModule,
    // RAFormModule,
    FormsModule,
    HttpClientModule,
    CustomerSearchFieldsRoutingModule,
    IgcbDatepickerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    CustomerSearchFieldsComponent
  ]
})
export class CustomerSearchFieldsModule { }
