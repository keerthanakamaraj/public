import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { EducationLoanDetailsRoutingModule } from './EducationLoanDetails-routing.module';
import { EducationLoanDetailsComponent } from './EducationLoanDetails.component';
import { CostOfCourseGridModule } from '../CostOfCourseGrid/CostOfCourseGrid.module';
import { FundsAvailableGridModule } from '../FundsAvailableGrid/FundsAvailableGrid.module';
import { PastEducationDtlsGridModule } from '../PastEducationDtlsGrid/PastEducationDtlsGrid.module';
//import { EducationLoanHandlerModule } from '../EducationLoanDetails/education-loan-handler.module';
@NgModule({
imports: [
CommonModule,
EducationLoanDetailsRoutingModule,
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
//EducationLoanHandlerModule,
FundsAvailableGridModule,
PastEducationDtlsGridModule,
CostOfCourseGridModule,
],
declarations: [
EducationLoanDetailsComponent,
],
exports:[
EducationLoanDetailsComponent,
],
})
export class EducationLoanDetailsModule { }
