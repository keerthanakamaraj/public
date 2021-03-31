import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RWEQueueComponent } from './RWEQueue.component';
const routes: Routes = [
{
path: '',
component: RWEQueueComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class RWEQueueRoutingModule { }
