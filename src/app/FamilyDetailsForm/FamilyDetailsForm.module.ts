import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { FamilyDetailsFormComponent } from './FamilyDetailsForm.component';
import { FamilyDetailsGridModule } from '../FamilyDetailsGrid/FamilyDetailsGrid.module';
//import { FamilyDetailsFormRoutingModule } from 'src/app/date/FamilyDetailsForm-routing.module';
@NgModule({
imports: [
CommonModule,
//FamilyDetailsFormRoutingModule,
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
FamilyDetailsGridModule,
],
declarations: [
FamilyDetailsFormComponent,
],
exports:[
FamilyDetailsFormComponent,
],
})
export class FamilyDetailsFormModule { }
