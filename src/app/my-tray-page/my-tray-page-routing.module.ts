import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTrayPageComponent } from './my-tray-page.component';


 const routes: Routes = [
  {
  path: '',
  component: MyTrayPageComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MYTRAYPAGERoutingModule { }
