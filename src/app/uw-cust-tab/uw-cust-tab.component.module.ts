import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { UWCustomerTabRoutingModule } from './uw-cust-tab-routing.module';
import { UWCustomerTabComponent } from './uw-cust-tab.component';
@NgModule({
    imports: [
        CommonModule,
        UWCustomerTabRoutingModule,
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
        UWCustomerTabComponent,
    ],
    exports: [
        UWCustomerTabComponent,
    ],
})
export class UWCustomerTabModule { }
