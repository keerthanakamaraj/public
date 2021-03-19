import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanTopupDetailsComponent } from './LoanTopupDetails.component';
const routes: Routes = [
{
path: '',
component: LoanTopupDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LoanTopupDetailsRoutingModule { }
