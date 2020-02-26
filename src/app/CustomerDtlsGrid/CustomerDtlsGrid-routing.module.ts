import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDtlsGridComponent } from './CustomerDtlsGrid.component';
const routes: Routes = [
{
path: '',
component: CustomerDtlsGridComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CustomerDtlsGridRoutingModule { }
