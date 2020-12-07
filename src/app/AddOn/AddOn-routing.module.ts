import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOnComponent } from './AddOn.component';
const routes: Routes = [
{
path: '',
component: AddOnComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AddOnRoutingModule { }
