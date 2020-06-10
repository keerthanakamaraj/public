import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RloCommonData {

    //used to define if the header should be expaneded or collapsed
    headerState = new Subject<boolean>();

    constructor() {
    }

}