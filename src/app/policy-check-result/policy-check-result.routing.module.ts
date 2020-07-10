import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyCheckResultComponent } from './policy-check-result.component';

const routes: Routes = [
    {
        path: '',
        component: PolicyCheckResultComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PolicyCheckResultRoutingModule { }
