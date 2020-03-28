 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { ChargeDtlsFormRoutingModule } from './ChargeDtlsForm-routing.module';
import { ChargeDtlsFormComponent } from './ChargeDtlsForm.component';
import { ChargeDtlsGridModule } from '../ChargeDtlsGrid/ChargeDtlsGrid.module';
import { ChargeHandlerModule } from '../ChargeDtlsForm/charge-handler.module';
@NgModule({
imports: [
CommonModule,
ChargeDtlsFormRoutingModule,
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
ChargeDtlsGridModule,
ChargeHandlerModule,
],
declarations: [
ChargeDtlsFormComponent,
],
exports:[
ChargeDtlsFormComponent,
],
})
export class ChargeDtlsFormModule { }
