import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { PreCPVRoutingModule } from './pre-cpv-routing.module';
import { PreCPVComponent } from './pre-cpv.component';
import { HeaderModule } from '../Header/Header.module';
import { ApplicationDtlsModule } from '../ApplicationDtls/ApplicationDtls.module';
import { CustGridModule } from '../CustGrid/CustGrid.module';
import { CreditCardDetailsModule } from '../CreditCardDetails/CreditCardDetails.module';
import { PreCPVInputGridModule } from '../PreCPVInputGrid/PreCPVInputGrid.module';
import {DisbursInputGridModule} from '../DisbursInputGrid/DisbursInputGrid.module';
@NgModule({
imports: [
CommonModule,
PreCPVRoutingModule,
RAFormModule,
FormsModule,
HttpClientModule,
HeaderModule,
ApplicationDtlsModule,
CustGridModule,
CreditCardDetailsModule,
TranslateModule.forChild({
loader: {
provide: TranslateLoader,
useFactory: HttpLoaderFactory,
deps: [HttpClient]
}
}),
PreCPVInputGridModule,
DisbursInputGridModule,
],
declarations: [
PreCPVComponent,
],
exports:[
PreCPVComponent,
],
})
export class PreCPVModule { }
