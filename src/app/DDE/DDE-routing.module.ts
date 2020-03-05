import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DDEComponent } from './DDE.component';
const routes: Routes = [
{
path: '',
component: DDEComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class DDERoutingModule { }
