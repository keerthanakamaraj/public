import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { ServiceTypeMasterRoutingModule } from './ServiceTypeMaster-routing.module';
import { ServiceTypeMasterComponent } from './ServiceTypeMaster.component';
import { FreshCurrencyModule } from '../FreshCurrency/FreshCurrency.module';
@NgModule({
imports: [
CommonModule,
ServiceTypeMasterRoutingModule,
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
FreshCurrencyModule,
],
declarations: [
ServiceTypeMasterComponent,
],
exports:[
ServiceTypeMasterComponent,
],
})
export class ServiceTypeMasterModule { }
