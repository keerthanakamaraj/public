import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, Injectable } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
//import { errorMap } from '../providehttp.service';
import { errorMap, RlouiService } from '../rlo-services/rloui.service';

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

  constructor(public rloService: RlouiService) { }

  ngOnInit() { }

  async setAlertValues(alertType: number, alertMsg: string, customErrorMsg: string) {
    let tempObj = {
      displayAlert: true,
      alertType: alertType,
      alertMsg: "",
      alertIconClass: "",
      textColor: "",
      showCloseButton: false
    };

    await this.rloService.getAlertMessage(alertMsg, customErrorMsg).then((data) => {
      tempObj.alertMsg = data;
    });

    switch (alertType) {
      case 1:
        tempObj.alertIconClass = "fa-check-circle";
        tempObj.textColor = "#38d038";
        break;
      case 2:
        tempObj.alertIconClass = "fa-times-circle";
        tempObj.textColor = "#ec1919";
        break;
      case 3:
        tempObj.alertIconClass = "fa-warning";
        tempObj.textColor = "#ead430";
        break;
      case 4:
        tempObj.alertIconClass = "fa-info-circle";
        tempObj.textColor = "#56abe8";
        break;
    }
    return tempObj;
  }

  // async getAlertMessage(alertMsg: string) {
  //   console.log(errorMap, alertMsg);
  //   var customeMsg = "";
  //   function getCode(alertMsg) {
  //     if (errorMap[alertMsg]) {
  //       customeMsg = errorMap[alertMsg]
  //     }
  //     else {
  //       let keyArray = alertMsg.split(".");
  //       keyArray.pop();
  //       console.log(keyArray);
  //       var newKey = "";
  //       keyArray.forEach(ele => {
  //         let node = ele + "."
  //         newKey += node;
  //       });
  //       getCode(newKey.slice(0, newKey.lastIndexOf(".")))
  //     }
  //   }
  //   getCode(alertMsg);
  //   return customeMsg;
  // }

  //this.services.alert.showAlert(1, 'rlo.success.save.address', 5000);
  showAlert(alertType: number, alertMsg: string, timeout: number = 5000, customErrorMsg: string = "") {
    var tempObj;
    this.setAlertValues(alertType, alertMsg, customErrorMsg).then((data) => {
      tempObj = data;

      if (timeout <= -1) {
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
    });
  }

  closeAlert() {
    this.alertsInfo = [];
  }

}
