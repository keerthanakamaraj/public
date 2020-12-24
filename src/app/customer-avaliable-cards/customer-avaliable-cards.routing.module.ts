import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAvaliableCardsComponent } from './customer-avaliable-cards.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerAvaliableCardsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerAvaliableCardsRoutingModule { }
