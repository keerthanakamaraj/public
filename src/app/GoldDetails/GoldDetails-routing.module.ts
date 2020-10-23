import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoldDetailsComponent } from './GoldDetails.component';
const routes: Routes = [
{
path: '',
component: GoldDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class GoldDetailsRoutingModule { }
