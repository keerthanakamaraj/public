import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RloUiCardFieldComponent } from './rlo-ui-card-field.component';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        RloUiCardFieldComponent,
    ],
    exports: [
        RloUiCardFieldComponent
    ],

})
export class RloUiCardFieldModule { }
