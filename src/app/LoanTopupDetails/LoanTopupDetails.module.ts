import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { LoanTopupDetailsRoutingModule } from './LoanTopupDetails-routing.module';
import { LoanTopupDetailsComponent } from './LoanTopupDetails.component';
import { AmortizationGridModule } from '../AmortizationGrid/AmortizationGrid.module';
import { LoanTopupHandlerModule } from './LoanTopup-handler.module ';
@NgModule({
imports: [
CommonModule,
LoanTopupDetailsRoutingModule,
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
AmortizationGridModule,
LoanTopupHandlerModule
],
declarations: [
LoanTopupDetailsComponent,
],
exports:[
LoanTopupDetailsComponent,
],
})
export class LoanTopupDetailsModule { }
