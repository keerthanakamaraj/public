import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitiationComponent } from './Initiation.component';
const routes: Routes = [
{
path: '',
component: InitiationComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class InitiationRoutingModule { }
