import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { RealignmentRequestRoutingModule } from './RealignmentRequest-routing.module';
import { RealignmentRequestComponent } from './RealignmentRequest.component';
@NgModule({
imports: [
CommonModule,
RealignmentRequestRoutingModule,
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
RealignmentRequestComponent,
],
exports:[
RealignmentRequestComponent,
],
})
export class RealignmentRequestModule { }
