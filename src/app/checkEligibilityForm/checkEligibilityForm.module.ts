import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { checkEligibilityFormRoutingModule } from './checkEligibilityForm-routing.module';
import { checkEligibilityFormComponent } from './checkEligibilityForm.component';
import { CheckEligibilityGridModule } from '../CheckEligibilityGrid/CheckEligibilityGrid.module';
@NgModule({
imports: [
CommonModule,
checkEligibilityFormRoutingModule,
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
CheckEligibilityGridModule,
],
declarations: [
checkEligibilityFormComponent,
],
exports:[
checkEligibilityFormComponent,
],
})
export class checkEligibilityFormModule { }
