import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoreCardResultComponent } from './score-card-result.component';

const routes: Routes = [
    {
        path: '',
        component: ScoreCardResultComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScoreCardResultRoutingModule { }
