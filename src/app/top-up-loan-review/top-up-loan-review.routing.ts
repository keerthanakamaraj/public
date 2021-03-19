import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopUpLoanReviewComponent } from './top-up-loan-review.component';

const routes: Routes = [
    {
        path: '',
        component: TopUpLoanReviewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TopUpLoanReviewRoutingModule { }
