import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { DisbursementDetailsRoutingModule } from './DisbursementDetails-routing.module';
import { DisbursementDetailsComponent } from './DisbursementDetails.component';
import { DisbursementGridModule } from '../DisbursementGrid/DisbursementGrid.module';
import { DisbursementHandlerModule } from '../DisbursementDetails/disbursement-handler.module';
@NgModule({
imports: [
CommonModule,
DisbursementDetailsRoutingModule,
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
DisbursementGridModule,
DisbursementHandlerModule,
],
declarations: [
DisbursementDetailsComponent,
],
exports:[
DisbursementDetailsComponent,
],
})
export class DisbursementDetailsModule { }
