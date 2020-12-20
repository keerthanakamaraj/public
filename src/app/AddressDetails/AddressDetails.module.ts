import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { AddressDetailsRoutingModule } from './AddressDetails-routing.module';
import { AddressDetailsComponent } from './AddressDetails.component';
import { AddressDetailsGridModule } from '../AddressDetailsGrid/AddressDetailsGrid.module';
import { AddressHandlerModule } from '../AddressDetails/address-handler.module';
@NgModule({
  imports: [
    CommonModule,
    AddressDetailsRoutingModule,
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
    AddressDetailsGridModule,
    AddressHandlerModule,
  ],
  declarations: [
    AddressDetailsComponent,
  ],
  exports: [
    AddressDetailsComponent,
  ],
})
export class AddressDetailsModule { }
