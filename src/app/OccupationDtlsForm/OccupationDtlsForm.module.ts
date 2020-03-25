import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { OccupationDtlsFormRoutingModule } from './OccupationDtlsForm-routing.module';
import { OccupationDtlsFormComponent } from './OccupationDtlsForm.component';
import { OccuptionDtlsGridModule } from '../OccuptionDtlsGrid/OccuptionDtlsGrid.module';
import { OccupationHandlerModule } from '../OccupationDtlsForm/occupation-handler.module';
@NgModule({
imports: [
CommonModule,
OccupationDtlsFormRoutingModule,
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
OccuptionDtlsGridModule,
OccupationHandlerModule,
],
declarations: [
OccupationDtlsFormComponent,
],
exports:[
OccupationDtlsFormComponent,
],
})
export class OccupationDtlsFormModule { }
