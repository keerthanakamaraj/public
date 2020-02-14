import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestLoanModalComponent } from './TestLoanModal.component';
const routes: Routes = [
{
path: '',
component: TestLoanModalComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TestLoanModalRoutingModule { }
