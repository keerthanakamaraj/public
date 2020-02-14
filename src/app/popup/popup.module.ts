import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { PopupContentComponent } from '../popup-content/popup-content.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    PopupModalComponent,
    PopupContentComponent
  ],
  declarations: [
    PopupModalComponent,
    PopupContentComponent
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