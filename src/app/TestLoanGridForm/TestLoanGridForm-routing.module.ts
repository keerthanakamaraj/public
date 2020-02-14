import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestLoanGridFormComponent } from './TestLoanGridForm.component';
const routes: Routes = [
{
path: '',
component: TestLoanGridFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TestLoanGridFormRoutingModule { }
