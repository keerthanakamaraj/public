import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { PropertyDetailsRoutingModule } from './PropertyDetails-routing.module';
import { PropertyDetailsComponent } from './PropertyDetails.component';
import { PropertyHandlerModule } from '../PropertyDetails/property-handler.module';
import { DisbursInputGridModule } from 'src/app/DisbursInputGrid/DisbursInputGrid.module';
@NgModule({
imports: [
CommonModule,
PropertyDetailsRoutingModule,
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
PropertyHandlerModule,
DisbursInputGridModule,

],
declarations: [
PropertyDetailsComponent,
],
exports:[
PropertyDetailsComponent,
],
})
export class PropertyDetailsModule { }
