import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { AgGridModule } from 'ag-grid-angular';
import { GridPaginationModule } from '../grid-pagination/grid-pagination.module';
import { ReadonlyGridComponent } from './readonly-grid.component';
import { GridButtonColComponent } from '../grid-button-col/grid-button-col.component';

@NgModule({
    imports: [
        CommonModule,
        GridPaginationModule,
        HttpClientModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AgGridModule.withComponents([GridButtonColComponent])
    ],
    declarations: [
        ReadonlyGridComponent,
        GridButtonColComponent
    ],
    exports: [
        ReadonlyGridComponent,
        GridButtonColComponent
    ],
})
export class ReadonlyGridModule { }
