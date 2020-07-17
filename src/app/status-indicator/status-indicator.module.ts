import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIndicatorComponent } from './status-indicator.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        StatusIndicatorComponent,
    ],
    exports: [
        StatusIndicatorComponent
    ],
})
export class StatusIndicatorModule { }
