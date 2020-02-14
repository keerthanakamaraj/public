import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanDetailsFormComponent } from './LoanDetailsForm.component';
const routes: Routes = [
{
path: '',
component: LoanDetailsFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LoanDetailsFormRoutingModule { }
