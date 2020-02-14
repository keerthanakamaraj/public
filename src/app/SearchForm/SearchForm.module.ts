import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { SearchFormRoutingModule } from './SearchForm-routing.module';
import { SearchFormComponent } from './SearchForm.component';
import { SearchCustomerGridModule } from '../SearchCustomerGrid/SearchCustomerGrid.module';
@NgModule({
imports: [
CommonModule,
SearchFormRoutingModule,
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
SearchCustomerGridModule,
],
declarations: [
SearchFormComponent,
],
exports:[
SearchFormComponent,
],
})
export class SearchFormModule { }
