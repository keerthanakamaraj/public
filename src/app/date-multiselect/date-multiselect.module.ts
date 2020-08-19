import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateMultiselectComponent } from './date-multiselect.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';

@NgModule({
    imports: [
        CommonModule,
        MyDateRangePickerModule
    ],
    declarations: [
        DateMultiselectComponent,
    ],
    exports: [
        DateMultiselectComponent
    ],

})
export class DateMultiselectdModule { }
