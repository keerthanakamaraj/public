import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { ReferralDetailsFormRoutingModule } from './ReferralDetailsForm-routing.module';
import { ReferralDetailsFormComponent } from './ReferralDetailsForm.component';
@NgModule({
imports: [
CommonModule,
ReferralDetailsFormRoutingModule,
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
ReferralDetailsFormComponent,
],
exports:[
ReferralDetailsFormComponent,
],
})
export class ReferralDetailsFormModule { }
