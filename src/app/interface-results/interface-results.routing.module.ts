import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterfaceResultsComponent } from './interface-results.component';

const routes: Routes = [
    {
        path: '',
        component: InterfaceResultsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InterfaceResultsRoutingModule { }
