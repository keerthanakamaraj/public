import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessDtlsFormComponent } from './BusinessDtlsForm.component';
const routes: Routes = [
  {
    path: '',
    component: BusinessDtlsFormComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessDtlsFormRoutingModule { }
