import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecisionAlertComponent } from './DecisionAlert.component';
const routes: Routes = [
{
path: '',
component: DecisionAlertComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class DecisionAlertRoutingModule { }
