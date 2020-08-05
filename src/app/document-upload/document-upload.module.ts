import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentUploadRoutingModule } from './document-upload-routing.module';
import { DocumentUploadComponent } from './document-upload.component';
import { FormCommonModule } from '../form-common/form-common.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IGCBDatepickerComponent } from '../igcb-datepicker/igcb-datepicker.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IgcbDatepickerModule } from '../igcb-datepicker/igcb-datepicker.module';


@NgModule({
  declarations: [
    DocumentUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    FileUploadModule,
    IgcbDatepickerModule,
    DocumentUploadRoutingModule,
  ],
  exports: [
    DocumentUploadComponent
  ]
})
export class DocumentUploadModule { }
