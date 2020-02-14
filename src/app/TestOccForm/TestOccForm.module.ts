import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { TestOccFormRoutingModule } from './TestOccForm-routing.module';
import { TestOccFormComponent } from './TestOccForm.component';
@NgModule({
imports: [
CommonModule,
TestOccFormRoutingModule,
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
TestOccFormComponent,
],
exports:[
TestOccFormComponent,
],
})
export class TestOccFormModule { }
