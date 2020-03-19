import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChargeDtlsFormComponent } from './ChargeDtlsForm.component';
const routes: Routes = [
{
path: '',
component: ChargeDtlsFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ChargeDtlsFormRoutingModule { }
