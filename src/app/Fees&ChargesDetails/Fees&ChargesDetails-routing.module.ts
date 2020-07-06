import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeesChargesDetailsComponent } from './Fees&ChargesDetails.component';
const routes: Routes = [
{
path: '',
component: FeesChargesDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class FeesChargesDetailsRoutingModule { }
