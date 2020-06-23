import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditCardDetailsComponent } from './CreditCardDetails.component';
const routes: Routes = [
{
path: '',
component: CreditCardDetailsComponent,
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CreditCardDetailsRoutingModule { }
