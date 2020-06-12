import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {
    checkForAlerts: Subject<any> = new Subject<any>();

    showAlert(alertType: number, alertMsg: string, timeout: number = 5000, customErrorMsg: string = "") {
        this.checkForAlerts.next({ alertType: alertType, alertMsg: alertMsg, timeout: timeout, customErrorMsg: customErrorMsg });
    }
}