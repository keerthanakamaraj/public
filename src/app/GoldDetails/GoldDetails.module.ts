import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { GoldDetailsRoutingModule } from './GoldDetails-routing.module';
import { GoldDetailsComponent } from './GoldDetails.component';
import { GoldDetailsGridModule } from '../GoldDetailsGrid/GoldDetailsGrid.module';
import { GoldDetailsHandlerModule } from './gold-handler.module';
@NgModule({
imports: [
CommonModule,
GoldDetailsRoutingModule,
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
GoldDetailsGridModule,
GoldDetailsHandlerModule
],
declarations: [
GoldDetailsComponent,
],
exports:[
GoldDetailsComponent,
],
})
export class GoldDetailsModule { }
