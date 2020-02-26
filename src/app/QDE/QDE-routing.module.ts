import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QDEComponent } from './QDE.component';
const routes: Routes = [
{
path: '',
component: QDEComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class QDERoutingModule { }
