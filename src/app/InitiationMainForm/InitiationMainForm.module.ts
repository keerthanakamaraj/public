import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { InitiationMainFormRoutingModule } from './InitiationMainForm-routing.module';
import { InitiationMainFormComponent } from './InitiationMainForm.component';
@NgModule({
imports: [
CommonModule,
InitiationMainFormRoutingModule,
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
InitiationMainFormComponent,
],
exports:[
InitiationMainFormComponent,
],
})
export class InitiationMainFormModule { }
