import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDtlsComponent } from './CustomerDtls.component';
const routes: Routes = [
{
path: '',
component: CustomerDtlsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CustomerDtlsRoutingModule { }
