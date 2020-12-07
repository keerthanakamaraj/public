import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { AddOnRoutingModule } from './AddOn-routing.module';
import { AddOnComponent } from './AddOn.component';
import { SearchCustomerGridModule } from '../SearchCustomerGrid/SearchCustomerGrid.module';
import { IgcbDatepickerModule } from '../igcb-datepicker/igcb-datepicker.module';
import { CustomerSearchModule } from '../customer-search/customer-search.module';
import { CustomerSearchFieldsModule } from '../customer-search-fields/customer-search-fileds.module';
@NgModule({
    imports: [
        CommonModule,
        AddOnRoutingModule,
        RAFormModule,
        FormsModule,
        HttpClientModule,
        IgcbDatepickerModule,
        CustomerSearchFieldsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [
        AddOnComponent,
    ],
    exports: [
        AddOnComponent
    ],
})
export class AddOnModule { }
