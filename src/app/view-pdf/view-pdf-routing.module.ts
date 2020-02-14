import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewPdfComponent  } from './view-pdf.component';

const routes: Routes = [
  {
    path: '',
    component: ViewPdfComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPdfRoutingModule { }
 