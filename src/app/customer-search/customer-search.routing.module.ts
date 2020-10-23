import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerSearchComponent } from './customer-search.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerSearchComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerSearchRoutingModule { }
