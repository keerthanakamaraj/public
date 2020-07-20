import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmortizationScheduleComponent } from './AmortizationSchedule.component';
const routes: Routes = [
{
path: '',
component: AmortizationScheduleComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AmortizationScheduleRoutingModule { }
