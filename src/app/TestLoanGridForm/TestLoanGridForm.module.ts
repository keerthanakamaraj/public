import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { TestLoanGridFormRoutingModule } from './TestLoanGridForm-routing.module';
import { TestLoanGridFormComponent } from './TestLoanGridForm.component';
import { TestLoanDetailGridModule } from '../TestLoanDetailGrid/TestLoanDetailGrid.module';
@NgModule({
imports: [
CommonModule,
TestLoanGridFormRoutingModule,
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
TestLoanDetailGridModule,
],
declarations: [
TestLoanGridFormComponent,
],
exports:[
TestLoanGridFormComponent,
],
})
export class TestLoanGridFormModule { }
