import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { CreditCardDetailsRoutingModule } from './CreditCardDetails-routing.module';
import { CreditCardDetailsComponent } from './CreditCardDetails.component';
import { CreditCardDetailsGridModule } from '../CreditCardDetailsGrid/CreditCardDetailsGrid.module';
@NgModule({
imports: [
CommonModule,
CreditCardDetailsRoutingModule,
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
CreditCardDetailsGridModule,
],
declarations: [
CreditCardDetailsComponent,
],
exports:[
CreditCardDetailsComponent,
],
})
export class CreditCardDetailsModule { }
