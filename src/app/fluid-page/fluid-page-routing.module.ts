import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FluidPageComponent } from './fluid-page.component';
const routes: Routes = [
{
path: '',
component: FluidPageComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class FluidPageRoutingModule { }
