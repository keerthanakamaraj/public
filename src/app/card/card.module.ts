import { NgModule } from '@angular/core';
import { CardComponent } from './card.component'
import { CommonModule } from '@angular/common';
import { RloUiCardFieldModule } from '../rlo-ui-card-field/rlo-ui-card-field.module';

@NgModule({
    declarations: [
        CardComponent
    ],
    imports: [
        CommonModule,
        RloUiCardFieldModule
    ],
    exports: [
        CardComponent
    ]
})
export class CardModule { }
