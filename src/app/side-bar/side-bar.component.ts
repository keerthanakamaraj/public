import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RefreshSidebarService } from '../refreshSidebar.service';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css'],
    animations: [
        trigger('rotatedState', [
            state('false', style({ transform: 'rotate(0)' })),
            state('true', style({ transform: 'rotate(-180deg)' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ]),
        trigger('slideInOut', [
            state('false', style({ transform: 'translateX(17.7rem)' })),
            state('true', style({ transform: 'translateX(0rem)' })),
            transition('true => false', animate('300ms ease-out')),
            transition('false => true', animate('300ms ease-in'))
        ])
    ],
})
export class SideBarComponent implements OnInit {

    //openSidebar: boolean = this.;
    favoritesList: any[] = [];
    announcementsList: any[];

    constructor(
        public services: ServiceStock,
        private refreshSidebarService: RefreshSidebarService,
        private eRef: ElementRef
    ) { 
        
    }

    ngOnInit() {


    }

   

  
 

    //To hide side-bar on click outside
    
}
