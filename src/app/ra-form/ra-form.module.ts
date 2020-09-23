

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyDatePickerModule } from 'mydatepicker';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';


import { ChartComponent } from '../chart/chart.component';
//import { LoadDraftComponent } from '../load-draft/load-draft.component';
import { GridPaginationComponent } from '../grid-pagination/grid-pagination.component';
//import { DraftFormComponent } from '../draft-form/draft-form.component';

import { FileuploadComponent } from '../fileupload/fileupload.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { DateComponent } from '../date/date.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { FieldComponent } from '../field/field.component';
import { ButtonComponent } from '../button/button.component';
import { HiddenComponent } from '../hidden/hidden.component';
import { AmountComponent } from '../amount/amount.component';
import { FormComponent } from '../form/form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpLoaderFactory } from '../app.module';
import { LabelComponent } from '../label/label.component';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';
import {ReadOnlyComponent} from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';


import { RloUiMobileComponent } from '../rlo-ui-mobile/rlo-ui-mobile.component';
import { RloUiCurrencyComponent } from '../rlo-ui-currency/rlo-ui-currency.component';
// import { RloUiCardTileComponent } from '../rlo-ui-card-tile/rlo-ui-card-tile.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule,
    MyDatePickerModule,
    FormsModule,
    NgSelectModule,
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
    ComboBoxComponent,
    FileuploadComponent,
    TextBoxComponent,
    TextAreaComponent,
    DateComponent,
    ButtonComponent,
    CheckBoxComponent,
    AmountComponent,
    FormComponent,
    HiddenComponent,
   // LoadDraftComponent,
    FieldComponent,
    LabelComponent,
    // RLO
    RLOUIRadioComponent,
    RloUiMobileComponent,
    ReadOnlyComponent,
    // RloUiCardTileComponent
    RloUiCurrencyComponent
  ],
  exports: [
    ComboBoxComponent,
    FileuploadComponent,
    TextBoxComponent,
    TextAreaComponent,
    DateComponent,
    ButtonComponent,
    CheckBoxComponent,
    AmountComponent,
    FormComponent,
    HiddenComponent,
    //LoadDraftComponent,
    FieldComponent,
    LabelComponent,
    // RLO
    RLOUIRadioComponent,
    RloUiMobileComponent,
    ReadOnlyComponent,
    // RloUiCardTileComponent
    RloUiCurrencyComponent
  ]
})
export class RAFormModule { }
