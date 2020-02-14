import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeSummaryFormComponent } from './IncomeSummaryForm.component';
const routes: Routes = [
{
path: '',
component: IncomeSummaryFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class IncomeSummaryFormRoutingModule { }
