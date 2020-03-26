import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { IncomeSummaryFormRoutingModule } from './IncomeSummaryForm-routing.module';
import { IncomeSummaryFormComponent } from './IncomeSummaryForm.component';
import { IncomeSummaryHandlerModule } from '../IncomeSummaryForm/incomesummary-handler.module';
@NgModule({
imports: [
CommonModule,
IncomeSummaryFormRoutingModule,
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
IncomeSummaryHandlerModule,
],
declarations: [
IncomeSummaryFormComponent,
],
exports:[
IncomeSummaryFormComponent,
],
})
export class IncomeSummaryFormModule { }
