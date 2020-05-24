import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RloUtilService {

  constructor() {
    // console.log("Util Service .. constructor --------------------------------");
  }
 
  concatenate( strArray: Array<string>, joinStr: string){
    if(strArray && strArray.length > 0){
      return strArray.filter( s => !( s == undefined || s == '' ) ).join(joinStr);
    } else {
      return undefined;
    }
  }
}
