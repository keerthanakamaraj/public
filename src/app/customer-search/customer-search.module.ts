import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSearchComponent } from '../customer-search/customer-search.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { CustomerSearchRoutingModule } from './customer-search.routing.module';
import { CustomerSearchFieldsModule } from '../customer-search-fields/customer-search-fileds.module';

@NgModule({
  declarations: [
    CustomerSearchComponent
  ],
  imports: [
    CommonModule,
    CustomerSearchRoutingModule,
    CustomerSearchFieldsModule,
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
    CustomerSearchComponent
  ]
})
export class CustomerSearchModule { }
