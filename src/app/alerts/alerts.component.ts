import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, Injectable } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { errorMap } from '../providehttp.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: "translate(-50%,-200px)" }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: "translate(-50%,-200px)" }))
      ])
    ])
  ],
})
export class AlertsComponent implements OnInit {

  alertsInfo: {
    displayAlert: boolean,
    alertType: number,
    // 1 - success
    // 2 - failed
    // 3 - warning
    // 4 - info

    alertMsg: string,
    alertIconClass: string,
    textColor: string,
    showCloseButton: boolean
  }[] = [];

  timer: any;
  constructor() { }

  ngOnInit() {

  }

  setAlertValues(alertType: number, alertMsg: string) {

    let tempObj = {
      displayAlert: true,
      alertType: alertType,
      alertMsg: "",
      alertIconClass: "",
      textColor: "",
      showCloseButton: false
    };

    switch (alertType) {
      case 1:
        tempObj.alertMsg = this.getAlertMessage((alertMsg == "" || alertMsg == undefined) ? "Success" : alertMsg);
        tempObj.alertIconClass = "fa-check-circle";
        tempObj.textColor = "#38d038";
        break;
      case 2:
        tempObj.alertMsg = this.getAlertMessage((alertMsg == "" || alertMsg == undefined) ? "Failed" : alertMsg);
        tempObj.alertIconClass = "fa-times-circle";
        tempObj.textColor = "#ec1919";
        break;
      case 3:
        tempObj.alertMsg = alertMsg;
        tempObj.alertIconClass = "fa-warning";
        tempObj.textColor = "#ead430";
        break;
      case 4:
        tempObj.alertMsg = alertMsg;
        tempObj.alertIconClass = "fa-info-circle";
        tempObj.textColor = "#56abe8";
        break;
    }

    return tempObj;
  }

  getAlertMessage(alertMsg: string) : string {
    return errorMap[alertMsg] ? errorMap[alertMsg] : alertMsg;
  }


  showAlert(alertType: number, alertMsg: string, timeout: number = 5000) {
    var tempObj = this.setAlertValues(alertType, alertMsg);
    if(timeout<=-1){
      tempObj["showCloseButton"] = true;
    }
    
    var thisObject = this;

    this.alertsInfo = [];
    clearTimeout(this.timer);
    this.alertsInfo.push(tempObj);

    if (timeout > -1) {
      this.timer = setTimeout(function () {
        thisObject.alertsInfo = [];
      }, timeout);
    }

  }

  closeAlert() {
    this.alertsInfo = [];
  }

}
