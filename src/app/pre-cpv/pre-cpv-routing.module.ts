import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreCPVComponent } from './pre-cpv.component';
const routes: Routes = [
  {
    path: '',
    component: PreCPVComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreCPVRoutingModule { }
