import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerSearchFieldsComponent } from './customer-search-fields.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerSearchFieldsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerSearchFieldsRoutingModule { }
