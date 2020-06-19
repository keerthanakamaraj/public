import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { VisitReportFormRoutingModule } from './VisitReportForm-routing.module';
import { VisitReportFormComponent } from './VisitReportForm.component';
import { VisitReportGridModule } from '../VisitReportGrid/VisitReportGrid.module';
//import { VisitReportModule } from '../VisitReportForm/visitreport-handler.module';
import { VisitReportHandlerModule } from '../VisitReportForm/visitreport-handler.module'
@NgModule({
    imports: [
        CommonModule,
        VisitReportFormRoutingModule,
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
        VisitReportGridModule,
        //VisitReportModule,
        VisitReportHandlerModule,
    ],
    declarations: [
        VisitReportFormComponent,
    ],
    exports: [
        VisitReportFormComponent,
    ],
})
export class VisitReportFormModule { }
