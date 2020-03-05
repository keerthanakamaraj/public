import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FamilyDetailsFormComponent } from './FamilyDetailsForm.component';
const routes: Routes = [
{
path: '',
component: FamilyDetailsFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class FamilyDetailsFormRoutingModule { }
