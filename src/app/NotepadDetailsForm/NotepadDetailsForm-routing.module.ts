import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotepadDetailsFormComponent } from './NotepadDetailsForm.component';
const routes: Routes = [
{
path: '',
component: NotepadDetailsFormComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class NotepadDetailsFormRoutingModule { }
