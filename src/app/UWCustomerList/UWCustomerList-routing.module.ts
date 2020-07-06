import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UWCustomerListComponent } from './UWCustomerList.component';
const routes: Routes = [
    {
        path: '',
        component: UWCustomerListComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UWCustomerListRoutingModule { }
