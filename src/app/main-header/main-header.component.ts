import { Component, ElementRef, OnInit, EventEmitter, Output, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { ProvidehttpService } from '../providehttp.service';
import { KeycloakService } from 'keycloak-angular';

declare let $: any;
declare let document: any;
window["$"] = $;
window["jQuery"] = $;
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent implements OnInit {

  notifs: any = [];
  downloads: any = [];
  serviceListObj: any;
  searchText: String;

  showLogin = false;
  showDownloads = false;
  showNotification = false;
  showSearchBar = false;

  languages = [];
  selectedlang: string;
  menuList = [];
  // menu = {};
  termAndConditionMenuList = [];

  @Output() componentPath = new EventEmitter<String>();

  serviceList = [];
  fullName: string;
  userID: string;
  LastLogin: string;
  notificationLength = 0;
  downloadsLength = 0;

  blockSize: number = 10;
  enableLoadNotifs: boolean = false;
  isLoadingNotifs: boolean = false;
  selectedService: any;
  isShowUnread: boolean = true;
  notificationUnreadLenth;

  today = new Date();


  @ViewChild('loginDiv', { static: false }) loginDiv: ElementRef;//userInfo
  @ViewChild('userInfo', { static: false }) userInfo: ElementRef;
  @ViewChild('notificationDiv', { static: false }) notificationDiv: ElementRef;
  @ViewChild('downloadsDiv', { static: false }) downloadsDiv: ElementRef;

  constructor(private router: Router, public services: ServiceStock, public dataService: ProvidehttpService, private keycloakService: KeycloakService) {
    this.selectedlang = this.services.http.currentLanguage;

    // TODO: Get Menu List from entitlements
    //   this.menuList = [{ Menu: 'NEW_TO_BANK', MenuList: [{ id: 'Initiation', text: 'Initiate' }] },
    //       { Menu: 'MODIFICATION', MenuList: [{ id: 'QDE', text: 'QDE' }]},
    //   // { Menu: 'MODIFICATION', MenuList: [{ id: 'modWithEnhancement', text: 'WITH_ENHANCEMENT' },
    //   //                                  { id: 'modWithReduction', text: 'WITH_REDUCTION' },
    //   //                                  { id: 'modTermAndCondition', text: 'TERM_AND_CONDITION' }] },
    //   // { Menu: 'RENEWAL', MenuList: [{ id: 'renewalWithEnhancement', text: 'WITH_ENHANCEMENT' },
    //   //                             { id: 'renewalWithReduction', text: 'WITH_REDUCTION' },
    //   //                             { id: 'renewalWithChanges', text: 'WITH_CHANGES' },
    //   //                             { id: 'renewalWithoutChanges', text: 'WITHOUT_CHANGES' },
    //   //                             { id: 'starCondition', text: 'STAR'}] },
    //   // { Menu: 'DISBURSEMENT', MenuList: [ { id: 'dnTranche', text: 'DN_TRANCHE' }] },
    // ];

    //this.menuList = [{ Menu: 'MODIFICATION', MenuList: [{ id: 'Initiation', text: 'Initiate' }, { id: 'QDE', text: 'QDE' }]},
    this.menuList = [{ Menu: 'MODIFICATION', MenuList: [{ id: 'Initiation', text: 'Initiate' }] },
      //   // { Menu: 'MODIFICATION', MenuList: [{ id: 'modWithEnhancement', text: 'WITH_ENHANCEMENT' },
      //   //                                  { id: 'modWithReduction', text: 'WITH_REDUCTION' },
      //   //                                  { id: 'modTermAndCondition', text: 'TERM_AND_CONDITION' }] },
      //   // { Menu: 'RENEWAL', MenuList: [{ id: 'renewalWithEnhancement', text: 'WITH_ENHANCEMENT' },
      //   //                             { id: 'renewalWithReduction', text: 'WITH_REDUCTION' },
      //   //                             { id: 'renewalWithChanges', text: 'WITH_CHANGES' },
      //   //                             { id: 'renewalWithoutChanges', text: 'WITHOUT_CHANGES' },
      //   //                             { id: 'starCondition', text: 'STAR'}] },
      //   // { Menu: 'DISBURSEMENT', MenuList: [ { id: 'dnTranche', text: 'DN_TRANCHE' }] },
    ];

    //this.menu = { MenuList: [{ id: 'Initiation', text: 'Initiate' }]};


    this.termAndConditionMenuList = [{ id: 'modTermAndConditionWithFL', text: 'WITH_FL' },
    { id: 'modTermAndConditionWithoutFL', text: 'WITHOUT_FL' }];
  }
  public navbarSearchOpen = false;
  public sessionStorage = sessionStorage;
  ngAfterViewInit() {
  }

  ngOnInit() {
    this.fullName = sessionStorage.getItem('fullName');
    this.userID = sessionStorage.getItem('userId');

    const  lastLoginTime = sessionStorage.getItem('lastloginDate');

    if(lastLoginTime) {
      try {
        const lastLoginTimeInt = parseInt(lastLoginTime);
        this.LastLogin = this.services.formatDateTime(lastLoginTimeInt);
      } catch(e){ // ignore error and use last login as it is
        this.LastLogin = this.services.formatDateTime(lastLoginTime);
      }
    } else {
      this.LastLogin = this.services.formatDateTime(new Date());
    }

  }

  logout() {
    //old code below
    /*this.services.http.sessionValid = false;
    this.services.dataStore.formGenericData = "";
    this.router.navigate(['/login/elogin']);*/

    let keycloakInstance = this.keycloakService.getKeycloakInstance();
    keycloakInstance.clearToken();
    keycloakInstance.logout();

    this.navigateToHome();
  }

  // redirect(id) {
  //   if(id && id != ""){
  //     this.router.navigate(['/home/' + id]);
  //   } else {
  //     this.navigateToHome();
  //   }

  // }

  AddOn_click(id : string) {
    // var id = "AddOn";
    if (id && id != "") {
      this.router.navigate(['/home/' + id]);
    } else {
      this.navigateToHome();
    }
  }
  
  

  navigateToHome() {
    this.router.navigate(['/home/LANDING']);
  }

  /* Un-implemented Methods */
  getTray() { }
  getHistory() { }

  isMytrayAvilable: boolean = false;
  btnck: boolean = false;
  btnckd: boolean = false;
}
