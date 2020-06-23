import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface subjectParamsInterface {
    action: string;
    data: any;
}


@Injectable({
    providedIn: 'root'
})


export class RloCommonData {

    //used to define if the header should be expaneded or collapsed
    headerState = new Subject<boolean>();
    childToParentSubject = new Subject<subjectParamsInterface>();
    updateDdeMenu = new Subject<string>();//add or remove

    dataSavedSubject = new Subject<boolean>();//when a particular form section is saved successfully(save),subscribed in DDE

    constructor() {
    }

}