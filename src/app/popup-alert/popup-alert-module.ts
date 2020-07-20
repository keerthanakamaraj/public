import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupAlertComponent } from './popup-alert.component';
import { NotepadDetailsFormModule } from '../NotepadDetailsForm/NotepadDetailsForm.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import {AmortizationScheduleModule} from '../amortization-schedule/AmortizationSchedule.module'
@NgModule({
    imports: [
        CommonModule,
         NotepadDetailsFormModule,
        // PersonalInterviewModule,
        AmortizationScheduleModule
    ],
    declarations: [
        PopupAlertComponent,
    ],
    exports: [
        PopupAlertComponent
    ],

})
export class PopUpAlertModule { }
