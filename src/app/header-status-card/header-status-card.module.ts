import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderStatusCardComponent } from './header-status-card.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        HeaderStatusCardComponent,
    ],
    exports: [
        HeaderStatusCardComponent
    ],

})
export class HeaderStatusCardModule { }
