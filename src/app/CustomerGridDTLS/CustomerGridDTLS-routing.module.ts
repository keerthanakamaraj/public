import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerGridDTLSComponent } from './CustomerGridDTLS.component';
const routes: Routes = [
{
path: '',
component: CustomerGridDTLSComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CustomerGridDTLSRoutingModule { }
