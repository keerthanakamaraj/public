import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { CustomerGridDTLSRoutingModule } from './CustomerGridDTLS-routing.module';
import { CustomerGridDTLSComponent } from './CustomerGridDTLS.component';
@NgModule({
imports: [
CommonModule,
CustomerGridDTLSRoutingModule,
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
CustomerGridDTLSComponent,
],
exports:[
CustomerGridDTLSComponent,
],
})
export class CustomerGridDTLSModule { }
