import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalInterviewComponent } from './personal-interview.component';

const routes: Routes = [
    {
        path: '',
        component: PersonalInterviewComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalInterviewRoutingModule { }
