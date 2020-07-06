import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { UWCustomerListRoutingModule } from './UWCustomerList-routing.module';
import { UWCustomerListComponent } from './UWCustomerList.component';
@NgModule({
    imports: [
        CommonModule,
        UWCustomerListRoutingModule,
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
        UWCustomerListComponent,
    ],
    exports: [
        UWCustomerListComponent,
    ],
})
export class UWCustomerListModule { }
