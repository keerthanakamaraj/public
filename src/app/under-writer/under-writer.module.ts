import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';

import { UnderWriterComponent } from './under-writer.component';
import { HeaderModule } from '../Header/Header.module';
import { QDEHandlerModule } from '../QDE/QDE-handler.module';
import { UnderWriterRoutingModule } from './under-writer-routing';
import { CardModule } from '../card/card.module';
import {UWCustomerTabModule} from '../uw-cust-tab/uw-cust-tab.component.module'
import { ScoreCardModule } from '../score-card/score-card.module';
import { RloUiCardFieldModule } from '../rlo-ui-card-field/rlo-ui-card-field.module';
@NgModule({
    imports: [
        CommonModule,
        UnderWriterRoutingModule,
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
        HeaderModule,
        ScoreCardModule,
        QDEHandlerModule,
        CardModule,
        UWCustomerTabModule,
        RloUiCardFieldModule
    ],
    declarations: [
        UnderWriterComponent
    ],
    exports: [
        UnderWriterComponent,
    ],
})
export class UnderWriterModule { }