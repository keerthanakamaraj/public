import { NgModule } from '@angular/core';
import { RAFormModule } from '../ra-form/ra-form.module';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { ReadonlyGridModule } from '../readonly-grid/readonly-grid.module';
import { GridPaginationModule } from '../grid-pagination/grid-pagination.module';
import { TEST_LOAN_GRIDComponent } from './TEST_LOAN_GRID.component';
@NgModule({
imports: [
CommonModule,
ReadonlyGridModule,
GridPaginationModule,
RAFormModule,
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
TEST_LOAN_GRIDComponent,
],
exports:[
TEST_LOAN_GRIDComponent,
],
})
export class TEST_LOAN_GRIDModule { }
