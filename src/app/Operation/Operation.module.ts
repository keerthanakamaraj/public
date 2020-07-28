import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { OperationRoutingModule } from './Operation-routing.module';
import { OperationComponent } from './Operation.component';
import { HeaderModule } from '../Header/Header.module';
import { ApplicationDtlsModule } from '../ApplicationDtls/ApplicationDtls.module';
import { CustGridModule } from '../CustGrid/CustGrid.module';
import { CreditCardDetailsModule } from '../CreditCardDetails/CreditCardDetails.module';
@NgModule({
imports: [
CommonModule,
OperationRoutingModule,
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
],
declarations: [
OperationComponent,
],
exports:[
OperationComponent,
],
})
export class OperationModule { }
