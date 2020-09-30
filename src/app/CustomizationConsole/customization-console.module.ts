import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';

import { CustDtlsGridModule } from '../CustDtlsGrid/CustDtlsGrid.module';
import { InitiationHandlerModule } from '../Initiation/initiation-handler.module';
import { RloUiAccordionModule } from '../rlo-ui-accordion/rlo-ui-accordion.module';

import { ConsoleLandingComponent } from './console-landing/console-landing.component'
import { CustomizationConsoleRoutingModule } from './customization-console-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CustomizationConsoleRoutingModule,
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
    ],
    declarations: [
        ConsoleLandingComponent
    ],
    exports: [
        ConsoleLandingComponent,
    ],
})
export class CustomizationConsoleModule { }
