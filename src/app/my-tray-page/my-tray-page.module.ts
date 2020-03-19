import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MYTRAYPAGERoutingModule } from './my-tray-page-routing.module';
import { MyTrayPageComponent } from './my-tray-page.component';
import { MyTrayFormModule } from '../MyTrayForm/MyTrayForm.module';


@NgModule({
  imports: [
    CommonModule,
    MYTRAYPAGERoutingModule,
    MyTrayFormModule
  ],
  declarations: [MyTrayPageComponent],
  exports: [MyTrayPageComponent],
})
export class MYTRAYPAGEModule { }
