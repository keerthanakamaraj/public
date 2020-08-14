import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IGCBDatepickerComponent } from './igcb-datepicker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IGCBDatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    IGCBDatepickerComponent
  ]
})
export class IgcbDatepickerModule { }
