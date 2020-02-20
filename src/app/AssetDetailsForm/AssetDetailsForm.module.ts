import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { AssetDetailsFormRoutingModule } from './AssetDetailsForm-routing.module';
import { AssetDetailsFormComponent } from './AssetDetailsForm.component';
import { AssetDetailsGridModule } from '../AssetDetailsGrid/AssetDetailsGrid.module';
@NgModule({
imports: [
CommonModule,
AssetDetailsFormRoutingModule,
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
AssetDetailsGridModule,
],
declarations: [
AssetDetailsFormComponent,
],
exports:[
AssetDetailsFormComponent,
],
})
export class AssetDetailsFormModule { }
