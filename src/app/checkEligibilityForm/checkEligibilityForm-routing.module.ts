import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { checkEligibilityFormComponent } from './checkEligibilityForm.component';
const routes: Routes = [
{
path: '',
component: checkEligibilityFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class checkEligibilityFormRoutingModule { }
