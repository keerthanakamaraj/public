import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { CustomerDtlsRoutingModule } from './CustomerDtls-routing.module';
import { CustomerDtlsComponent } from './CustomerDtls.component';
import { AddressDetailsModule } from '../AddressDetails/AddressDetails.module';
import { OccupationDtlsFormModule } from '../OccupationDtlsForm/OccupationDtlsForm.module';
import { CustomerDtlsGridModule } from '../CustomerDtlsGrid/CustomerDtlsGrid.module';
@NgModule({
imports: [
CommonModule,
CustomerDtlsRoutingModule,
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
AddressDetailsModule,
OccupationDtlsFormModule,
CustomerDtlsGridModule,
],
declarations: [
CustomerDtlsComponent,
],
exports:[
CustomerDtlsComponent,
],
})
export class CustomerDtlsModule { }
