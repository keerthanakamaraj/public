import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyDetailsComponent } from './PropertyDetails.component';
const routes: Routes = [
{
path: '',
component: PropertyDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PropertyDetailsRoutingModule { }
