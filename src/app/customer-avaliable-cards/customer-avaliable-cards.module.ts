import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAvaliableCardsComponent } from '../customer-avaliable-cards/customer-avaliable-cards.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { CustomerAvaliableCardsRoutingModule } from './customer-avaliable-cards.routing.module';
import { IgcbDatepickerModule } from '../igcb-datepicker/igcb-datepicker.module';
import { SearchCustomerGridModule } from '../SearchCustomerGrid/SearchCustomerGrid.module';
import { RAFormModule } from '../ra-form/ra-form.module';
import { ReadonlyGridModule } from '../readonly-grid/readonly-grid.module';

@NgModule({
  declarations: [
    CustomerAvaliableCardsComponent
  ],
  imports: [
    CommonModule,
    RAFormModule,
    FormsModule,
    HttpClientModule,
    CustomerAvaliableCardsRoutingModule,
    SearchCustomerGridModule,
    IgcbDatepickerModule,
    ReadonlyGridModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    CustomerAvaliableCardsComponent
  ]
})
export class CustomerAvaliableCardsModule { }
