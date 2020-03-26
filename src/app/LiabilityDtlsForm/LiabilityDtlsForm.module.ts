import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { LiabilityDtlsFormRoutingModule } from './LiabilityDtlsForm-routing.module';
import { LiabilityDtlsFormComponent } from './LiabilityDtlsForm.component';
import { LiabilityDtlsGridModule } from '../LiabilityDtlsGrid/LiabilityDtlsGrid.module';
import { LiabilityHandlerModule } from '../LiabilityDtlsForm/liability-handler.module';
@NgModule({
imports: [
CommonModule,
LiabilityDtlsFormRoutingModule,
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
LiabilityDtlsGridModule,
LiabilityHandlerModule,
],
declarations: [
LiabilityDtlsFormComponent,
],
exports:[
LiabilityDtlsFormComponent,
],
})
export class LiabilityDtlsFormModule { }
