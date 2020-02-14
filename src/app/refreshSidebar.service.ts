import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable() 
export class RefreshSidebarService {
    checkForRefresh: Subject<any> = new Subject<any>();

    refreshSidebar(value){
        this.checkForRefresh.next(value);
    }

}