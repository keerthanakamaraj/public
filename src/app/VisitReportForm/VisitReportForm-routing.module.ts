import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitReportFormComponent } from './VisitReportForm.component';
const routes: Routes = [
{
path: '',
component: VisitReportFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class VisitReportFormRoutingModule { }
