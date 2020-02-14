import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDtlsComponent } from './ApplicationDtls.component';
const routes: Routes = [
{
path: '',
component: ApplicationDtlsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ApplicationDtlsRoutingModule { }
