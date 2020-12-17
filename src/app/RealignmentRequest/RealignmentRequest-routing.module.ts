import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealignmentRequestComponent } from './RealignmentRequest.component';
const routes: Routes = [
{
path: '',
component: RealignmentRequestComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class RealignmentRequestRoutingModule { }
