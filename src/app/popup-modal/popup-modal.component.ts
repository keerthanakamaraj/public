import { Component, OnInit, Input, OnDestroy, Injector, NgZone, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Data } from '../DataService';
import { RoutingService } from '../routing-service';
import { componentRoutes } from '../route-mapping';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent implements OnInit {
  message: any;

  name: string;
  closeReq: boolean = true;
  
  //  @ViewChild("popupRouterOutlet", { read: ViewContainerRef }) private popupRouterOutlet: ViewContainerRef;

  constructor(public activeModal: NgbActiveModal, private services: ServiceStock) {
    //    console.log(this.router.config);
    //  this.routing.createNewOutlet();
    // this.name = this.routing.currOutlet;
    this.createNewOutlet();
    this.name = this.services.routing.currOutlet;
    //this.modalType = this.services.rloui.modalType;
    // let outletJson = {};
    // outletJson[this.routing.currOutlet] = ['BLANK', 'popup'];
    // this.router.navigate([{ outlets: outletJson }], { skipLocationChange: true });
  }

  ngOnInit() {}

  async openmsg(map) {
    this.message = map;
  }

  async rotueToComponent(map: Map<string, string>) {
    if (map) {
      let URL = map.get('component');
      map.delete("component");
      // this.dataStore.setData(this.routing.currModal, map);
      this.services.dataStore.setRouteParams(this.services.routing.currModal, map);
      let mode = undefined;
      //this.router.navigate([{ outlets: { 'test': [URL] } }], { skipLocationChange: true });
      if (URL) {
        if (map.has('mode')) {
          mode = map.get('mode');
        }
        let res = await this.services.routing.navigateToComponent(URL, mode);
        if (res && URL != 'message') {
          this.services.dataStore.setData(this.services.routing.currModal, res);
          this.closeReq = false;
          this.services.routing.navigateToComponent('message');
        }
      }
    }
  }

  createNewOutlet() {
    let newOutlet = this.services.routing.setnewOutlet();
  }

  async closeModal(): Promise<any> {
    // await this.destroyOutlet();
    await this.services.routing.removeOutlet();
    this.activeModal.close();
    return 'Closed';
  }

  // async destroyOutlet() {
  //   let outletJson = {};
  //   outletJson[this.services.routing.currOutlet] = null;
  //   await this.services.router.navigate([{ outlets: outletJson }]);
  //   this.services.routing.removeOutlet();
  // }

}
