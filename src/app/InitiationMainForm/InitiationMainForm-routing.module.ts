import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiationMainFormComponent } from './InitiationMainForm.component';
const routes: Routes = [
{
path: '',
component: InitiationMainFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class InitiationMainFormRoutingModule { }
