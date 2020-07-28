import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { AmortizationScheduleRoutingModule } from './AmortizationSchedule-routing.module';
import { AmortizationScheduleComponent } from './AmortizationSchedule.component';
import {AmortizationGridModule } from '../AmortizationGrid/AmortizationGrid.module';
import { AmortizationScheduleHandlerModule } from './AmortizationSchedule-handler.module';

@NgModule({
    imports: [
        CommonModule,
        AmortizationScheduleRoutingModule,
        RAFormModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AmortizationGridModule,
        AmortizationScheduleHandlerModule,
    ],
    declarations: [
        AmortizationScheduleComponent,
    ],
    exports: [
        AmortizationScheduleComponent,
    ],

})
export class AmortizationScheduleModule { }
