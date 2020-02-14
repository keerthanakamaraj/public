import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetDetailsFormComponent } from './AssetDetailsForm.component';
const routes: Routes = [
{
path: '',
component: AssetDetailsFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AssetDetailsFormRoutingModule { }
