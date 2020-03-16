import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MYTRAYPAGERoutingModule } from './my-tray-page-routing.module';
import { MyTrayPageComponent } from './my-tray-page.component';
import { MyTrayGridModule } from '../MyTrayGrid/MyTrayGrid.module';


@NgModule({
  imports: [
    CommonModule,
    MYTRAYPAGERoutingModule,
    MyTrayGridModule
  ],
  declarations: [MyTrayPageComponent],
  exports: [MyTrayPageComponent],
})
export class MYTRAYPAGEModule { }
