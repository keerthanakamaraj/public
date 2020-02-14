import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewImageRoutingModule } from './view-image-routing.module';
import { ViewImageComponent } from './view-image.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { ImageViewerModule } from 'ngx-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    ViewImageRoutingModule,
    RAFormModule,
    ImageViewerModule.forRoot(),
  ],
  declarations: [
    ViewImageComponent,
  ],
  exports:[
    ViewImageComponent
  ]
})
export class ViewImageModule { }

