import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisbursementDetailsComponent } from './DisbursementDetails.component';
const routes: Routes = [
{
path: '',
component: DisbursementDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class DisbursementDetailsRoutingModule { }
