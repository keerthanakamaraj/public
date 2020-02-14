import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { SaveLoanDetailsFormRoutingModule } from './SaveLoanDetailsForm-routing.module';
import { SaveLoanDetailsFormComponent } from './SaveLoanDetailsForm.component';
@NgModule({
imports: [
CommonModule,
SaveLoanDetailsFormRoutingModule,
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
declarations: [
SaveLoanDetailsFormComponent,
],
exports:[
SaveLoanDetailsFormComponent,
],
})
export class SaveLoanDetailsFormModule { }
