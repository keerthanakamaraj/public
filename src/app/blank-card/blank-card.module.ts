import { NgModule } from '@angular/core';
import { BlankCardComponent } from './blank-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        BlankCardComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        BlankCardComponent
    ]
})
export class BlankCardModule { }
