import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { TestLoanModalRoutingModule } from './TestLoanModal-routing.module';
import { TestLoanModalComponent } from './TestLoanModal.component';
@NgModule({
imports: [
CommonModule,
TestLoanModalRoutingModule,
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
TestLoanModalComponent,
],
exports:[
TestLoanModalComponent,
],
})
export class TestLoanModalModule { }
