import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { TestAddLoanFormRoutingModule } from './TestAddLoanForm-routing.module';
import { TestAddLoanFormComponent } from './TestAddLoanForm.component';
@NgModule({
imports: [
CommonModule,
TestAddLoanFormRoutingModule,
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
TestAddLoanFormComponent,
],
exports:[
TestAddLoanFormComponent,
],
})
export class TestAddLoanFormModule { }
