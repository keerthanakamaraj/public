import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiabilityDtlsFormComponent } from './LiabilityDtlsForm.component';
const routes: Routes = [
{
path: '',
component: LiabilityDtlsFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LiabilityDtlsFormRoutingModule { }
