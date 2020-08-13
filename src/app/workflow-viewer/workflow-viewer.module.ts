import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowViewerRoutingModule } from './workflow-viewer-routing.module';
import { WorkflowViewerComponent } from './workflow-viewer.component';


@NgModule({
  declarations: [
    WorkflowViewerComponent
  ],
  imports: [
    CommonModule,
    WorkflowViewerRoutingModule
  ],
  exports: [
    WorkflowViewerComponent
  ]
})
export class WorkflowViewerModule { }
