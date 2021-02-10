import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FDDetailsRoutingModule } from './FDDetails-routing.module';
import { FDDetailsComponent } from './FDDetails.component';
import { FDDetailsGridModule } from '../FDDetailsGrid/FDDetailsGrid.module';
import { FDDetailsHandlerModule } from './fd-handler.module';
@NgModule({
imports: [
CommonModule,
FDDetailsRoutingModule,
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
FDDetailsGridModule,
FDDetailsHandlerModule
],
declarations: [
FDDetailsComponent,
],
exports:[
FDDetailsComponent,
],
})
export class FDDetailsModule { }
