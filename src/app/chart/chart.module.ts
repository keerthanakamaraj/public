import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { ChartComponent } from './chart.component';
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ChartComponent,
    ],
    exports: [
        ChartComponent,
    ],
})
export class ChartModule { }
