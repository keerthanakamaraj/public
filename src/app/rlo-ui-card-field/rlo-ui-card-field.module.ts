import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RloUiCardFieldComponent } from './rlo-ui-card-field.component';
import { StatusIndicatorModule } from '../status-indicator/status-indicator.module';


@NgModule({
    imports: [
        CommonModule,
        StatusIndicatorModule
    ],
    declarations: [
        RloUiCardFieldComponent,
    ],
    exports: [
        RloUiCardFieldComponent
    ],

})
export class RloUiCardFieldModule { }
