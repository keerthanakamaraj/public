import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FDDetailsComponent } from './FDDetails.component';
const routes: Routes = [
{
path: '',
component: FDDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class FDDetailsRoutingModule { }
