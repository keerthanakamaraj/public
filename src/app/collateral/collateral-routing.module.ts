import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollateralParentComponent } from './collateral-parent/collateral-parent.component';


const routes: Routes = [
  {
    path: '',
    component: CollateralParentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollateralRoutingModule { }
