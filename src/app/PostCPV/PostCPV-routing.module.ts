import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCPVComponent } from './PostCPV.component';
const routes: Routes = [
{
path: '',
component: PostCPVComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PostCPVRoutingModule { }
