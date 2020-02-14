import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestAddLoanFormComponent } from './TestAddLoanForm.component';
const routes: Routes = [
{
path: '',
component: TestAddLoanFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TestAddLoanFormRoutingModule { }
