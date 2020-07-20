import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { PopupContentComponent } from '../popup-content/popup-content.component';
import { PopupAlertComponent } from '../popup-alert/popup-alert.component';
import { PopUpAlertModule } from '../popup-alert/popup-alert-module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PopupModalComponent,
    PopupContentComponent,
    //PopupAlertComponent
  ],
  declarations: [
    PopupModalComponent,
    PopupContentComponent,
    //PopupAlertComponent,
  ],
  bootstrap : [PopupModalComponent],
  providers : [
    // { provide: APP_INITIALIZER, useFactory: init_popup_routes, multi : true },
  ]
})
export class PopupModule { 
  // constructor(private router : Router){
  //   init_popup_routes();
  //   console.log(childRoutes);
  //   this.router.config.concat(childRoutes);
  // }
}