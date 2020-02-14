import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { GridPaginationComponent } from './grid-pagination.component';
@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        GridPaginationComponent,
    ],
    exports:[
        GridPaginationComponent,
    ]
})
export class GridPaginationModule { }
