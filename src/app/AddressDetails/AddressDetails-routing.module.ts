import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressDetailsComponent } from './AddressDetails.component';
const routes: Routes = [
{
path: '',
component: AddressDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AddressDetailsRoutingModule { }
