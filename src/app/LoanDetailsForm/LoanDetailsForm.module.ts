import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { LoanDetailsFormRoutingModule } from './LoanDetailsForm-routing.module';
import { LoanDetailsFormComponent } from './LoanDetailsForm.component';
import { LoanHandlerModule } from '../LoanDetailsForm/loan-handler.module';
// import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
@NgModule({
imports: [
CommonModule,
LoanDetailsFormRoutingModule,
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
LoanHandlerModule,
],
declarations: [
LoanDetailsFormComponent,
],
exports:[
LoanDetailsFormComponent,
],
})
export class LoanDetailsFormModule { }
