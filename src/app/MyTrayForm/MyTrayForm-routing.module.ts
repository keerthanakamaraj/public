import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTrayFormComponent } from './MyTrayForm.component';
const routes: Routes = [
{
path: '',
component: MyTrayFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class MyTrayFormRoutingModule { }
