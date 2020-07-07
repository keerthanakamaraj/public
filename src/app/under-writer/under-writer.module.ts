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
        QDEHandlerModule,
        CardModule,
        UWCustomerTabModule
    ],
    declarations: [
        UnderWriterComponent
    ],
    exports: [
        UnderWriterComponent,
    ],
})
export class UnderWriterModule { }