import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OccupationDtlsFormComponent } from './OccupationDtlsForm.component';
const routes: Routes = [
{
path: '',
component: OccupationDtlsFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OccupationDtlsFormRoutingModule { }
