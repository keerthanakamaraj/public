import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferralDetailsFormComponent } from './ReferralDetailsForm.component';
const routes: Routes = [
{
path: '',
component: ReferralDetailsFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ReferralDetailsFormRoutingModule { }
