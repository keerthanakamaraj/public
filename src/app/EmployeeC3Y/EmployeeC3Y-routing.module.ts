import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeC3YComponent } from './EmployeeC3Y.component';
const routes: Routes = [
    {
        path: '',
        component: EmployeeC3YComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeC3YRoutingModule { }
