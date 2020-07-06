import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FeesChargesDetailsRoutingModule } from './Fees&ChargesDetails-routing.module';
import { FeesChargesDetailsComponent } from './Fees&ChargesDetails.component';
@NgModule({
imports: [
CommonModule,
FeesChargesDetailsRoutingModule,
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
FeesChargesDetailsComponent,
],
exports:[
FeesChargesDetailsComponent,
],
})
export class FeesChargesDetailsModule { }
