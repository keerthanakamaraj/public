import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TEST_LOAN_GRID_FORMComponent } from './TEST_LOAN_GRID_FORM.component';
const routes: Routes = [
{
path: '',
component: TEST_LOAN_GRID_FORMComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TEST_LOAN_GRID_FORMRoutingModule { }
