import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoNoGoComponent } from './go-no-go.component';

const routes: Routes = [
  {
    path: '',
    component: GoNoGoComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoNoGoRoutingModule { }
