import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFormComponent } from './SearchForm.component';
const routes: Routes = [
{
path: '',
component: SearchFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class SearchFormRoutingModule { }
