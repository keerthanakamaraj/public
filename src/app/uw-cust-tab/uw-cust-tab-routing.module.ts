import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UWCustomerTabComponent } from './uw-cust-tab.component';
const routes: Routes = [
    {
        path: '',
        component: UWCustomerTabComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UWCustomerTabRoutingModule { }
