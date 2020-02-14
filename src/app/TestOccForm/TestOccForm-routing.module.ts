import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestOccFormComponent } from './TestOccForm.component';
const routes: Routes = [
{
path: '',
component: TestOccFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class TestOccFormRoutingModule { }
