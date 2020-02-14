import { Component, OnInit } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { Data } from '../DataService';
import { RoutingService } from '../routing-service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  constructor(private httpService: ProvidehttpService, private dataStore: Data, private routing: RoutingService) { }
  images = [];

  cfsNumber: any = [];
  config = {
    containerBackgroundColor: '#fbfbfb',
  }

  ngOnInit() {

    // For Multiple Image Files
    // inputMap.set('cfsNumber', ['23022019134755015789', '23022019140614015791', '23022019140928015792']);

    // For Single Image FIle
    // inputMap.set('cfsNumber', '23022019140928015792');
    // OR
    // inputMap.set('cfsNumber', ['23022019140928015792']);


    let inputJson = this.httpService.mapToJson(this.dataStore.getData(this.routing.currModal));
    this.cfsNumber = inputJson['cfsNumber'];
    if(this.isArray(this.cfsNumber)){
      this.images = this.cfsNumber.map(this.getImgUrl);
    }else{
      this.images.push(this.getImgUrl(this.cfsNumber));
    }
  }

  isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  getImgUrl(cfsNumber){
    return this.httpService.baseURL + 'servlet/FileDownloadProcessor?CFS_INV_NUM=' + cfsNumber;
  }

}
