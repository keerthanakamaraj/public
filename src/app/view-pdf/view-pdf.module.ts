import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPdfRoutingModule } from './view-pdf-routing.module';
import { ViewPdfComponent } from './view-pdf.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ViewPdfRoutingModule,
    RAFormModule,
    PdfViewerModule
  ],
  declarations: [
    ViewPdfComponent,
  ],
  exports:[
    ViewPdfComponent
  ]
})
export class ViewPdfModule { }

