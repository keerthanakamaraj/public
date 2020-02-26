import { NgModule } from '@angular/core';
import { RAFormModule } from '../ra-form/ra-form.module';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { ReadonlyGridModule } from '../readonly-grid/readonly-grid.module';
import { GridPaginationModule } from '../grid-pagination/grid-pagination.module';
import { AddressDetailsGridComponent } from './AddressDetailsGrid.component';
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
AddressDetailsGridComponent,
],
exports:[
AddressDetailsGridComponent,
],
})
export class AddressDetailsGridModule { }
