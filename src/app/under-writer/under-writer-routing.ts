import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderWriterComponent } from './under-writer.component';

const routes: Routes = [
    {
        path: '',
        component: UnderWriterComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UnderWriterRoutingModule { }
