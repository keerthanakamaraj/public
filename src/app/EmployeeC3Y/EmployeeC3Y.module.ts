import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { EmployeeC3YRoutingModule } from './EmployeeC3Y-routing.module';
import { EmployeeC3YComponent } from './EmployeeC3Y.component';
@NgModule({
    imports: [
        CommonModule,
        EmployeeC3YRoutingModule,
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
        EmployeeC3YComponent,
    ],
    exports: [
        EmployeeC3YComponent,
    ],
})
export class EmployeeC3YModule { }
