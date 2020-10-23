import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationLoanDetailsComponent } from './EducationLoanDetails.component';
const routes: Routes = [
{
path: '',
component: EducationLoanDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class EducationLoanDetailsRoutingModule { }
