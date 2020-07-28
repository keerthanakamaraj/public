import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderStatusCardComponent } from './header-status-card.component';
import { StatusIndicatorModule } from '../status-indicator/status-indicator.module';

@NgModule({
    imports: [
        CommonModule,
        StatusIndicatorModule
    ],
    declarations: [
        HeaderStatusCardComponent,
    ],
    exports: [
        HeaderStatusCardComponent
    ],

})
export class HeaderStatusCardModule { }
