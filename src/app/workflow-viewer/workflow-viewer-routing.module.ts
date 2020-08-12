import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowViewerComponent } from './workflow-viewer.component';


const routes: Routes = [
  {
    path: '',
    component: WorkflowViewerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowViewerRoutingModule { }
