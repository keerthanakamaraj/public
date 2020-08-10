import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollateralRoutingModule } from './collateral-routing.module';
import { CollateralParentComponent } from './collateral-parent/collateral-parent.component';
import { CollateralListComponent } from './collateral-list/collateral-list.component';
import { CollateralDetailsComponent } from './collateral-details/collateral-details.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IGCBDatepickerComponent } from '../igcb-datepicker/igcb-datepicker.component';
import { IgcbDatepickerModule } from '../igcb-datepicker/igcb-datepicker.module';
import { GenerateUdfFieldsComponent } from './generate-udf-fields/generate-udf-fields.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CollateralParentComponent,
    CollateralListComponent,
    CollateralDetailsComponent,
    GenerateUdfFieldsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    IgcbDatepickerModule,
    NgbModule,
    CollateralRoutingModule,
  ],
  exports: [
    CollateralParentComponent
  ]
})
export class CollateralModule { }
