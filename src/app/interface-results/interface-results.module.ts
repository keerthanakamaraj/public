import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';

import { InterfaceResultsComponent } from './interface-results.component'
import { InterfaceResultsRoutingModule } from './interface-results.routing.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        InterfaceResultsRoutingModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        InterfaceResultsComponent
    ],
    exports: [
        InterfaceResultsComponent
    ],
})
export class InterfaceResultsModule { }
