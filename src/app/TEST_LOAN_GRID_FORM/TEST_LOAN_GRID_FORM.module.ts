import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { TEST_LOAN_GRID_FORMRoutingModule } from './TEST_LOAN_GRID_FORM-routing.module';
import { TEST_LOAN_GRID_FORMComponent } from './TEST_LOAN_GRID_FORM.component';
import { TEST_LOAN_GRIDModule } from '../TEST_LOAN_GRID/TEST_LOAN_GRID.module';
@NgModule({
imports: [
CommonModule,
TEST_LOAN_GRID_FORMRoutingModule,
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
TEST_LOAN_GRIDModule,
],
declarations: [
TEST_LOAN_GRID_FORMComponent,
],
exports:[
TEST_LOAN_GRID_FORMComponent,
],
})
export class TEST_LOAN_GRID_FORMModule { }
