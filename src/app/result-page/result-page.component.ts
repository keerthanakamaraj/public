import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../DataService';
import { RoutingService } from '../routing-service';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  additionalInfo = {};
  additionalInfoKeys : any;
  additionalInfoKeysi18n : any;
  title  : string;
  status : string;
  message : string;
  message1 : string;
  constructor(public services: ServiceStock) {
  
    let map = this.services.dataStore.getData(this.services.routing.currModal);
    this.title = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'FormCode');
    this.status = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'Status');
    this.message = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'Message');
    this.message1 = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'Message1');

    // if(map.get('responseMsg')){
    //   let res = map.get('responseMsg');
    //   this.status = res['Status'];
    //   if(this.status == 'S'){
    //     this.additionalInfo = JSON.parse(res['_RESPONSE_MESSAGE']);
    //     if(this.additionalInfo['Response']){
    //       this.additionalInfo = this.additionalInfo['Response'];
    //       this.additionalInfoKeys = [];
    //       this.additionalInfoKeysi18n = [];
    //       Object.keys(this.additionalInfo).forEach(key => {
    //         this.additionalInfoKeys.push(key);
    //         this.additionalInfoKeysi18n[key] = 'RESULT.' + key;
    //       });
    //     }
    //   }else{
    //     this.additionalInfoKeys = [];
    //     let response = JSON.parse(res['_RESPONSE_MESSAGE']);
    //     this.additionalInfoKeys = this.additionalInfoKeys.concat(response['ERROR_CODE']);
    //     this.additionalInfo[response['ERROR_CODE']] = 'ErrorCodes.' + response['ERROR_CODE'];
    //   }
    // }
  }

  ngOnInit() {
  }
  goBack() {
    window.history.back();
  }
}
