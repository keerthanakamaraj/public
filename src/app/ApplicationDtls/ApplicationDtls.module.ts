import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { ApplicationDtlsRoutingModule } from './ApplicationDtls-routing.module';
import { ApplicationDtlsComponent } from './ApplicationDtls.component';
import { ApplicationHandlerModule } from '../ApplicationDtls/application-handler.module';
@NgModule({
    imports: [
        CommonModule,
        ApplicationDtlsRoutingModule,
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
        
        ApplicationHandlerModule,
    ],
    declarations: [
        ApplicationDtlsComponent,
    ],
    exports: [
        ApplicationDtlsComponent,
    ],
})
export class ApplicationDtlsModule { }
