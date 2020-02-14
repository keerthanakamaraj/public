import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { componentRoutes } from '../route-mapping';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: componentRoutes
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
 