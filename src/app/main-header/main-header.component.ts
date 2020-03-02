import { Component, ElementRef, OnInit, EventEmitter, Output, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { ProvidehttpService } from '../providehttp.service';
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
  termAndConditionMenuList = [];

  @Output() componentPath = new EventEmitter<String>();

  serviceList = [];
  userName: string;
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

  @ViewChild('loginDiv', { static: false }) loginDiv: ElementRef;//userInfo
  @ViewChild('userInfo', { static: false }) userInfo: ElementRef;
  @ViewChild('notificationDiv', { static: false }) notificationDiv: ElementRef;
  @ViewChild('downloadsDiv', { static: false }) downloadsDiv: ElementRef;

  constructor(private router: Router, public services: ServiceStock, public dataService: ProvidehttpService) {
    this.selectedlang = this.services.http.currentLanguage;

    this.menuList = [{ Menu: 'NEW_TO_BANK', MenuList: [{ id: 'Initiation', text: 'NTB' }] },
    { Menu: 'MODIFICATION', MenuList: [{ id: 'QDE', text: 'QDE' }] }
  ];
  this.termAndConditionMenuList = [{id : 'modTermAndConditionWithFL', text : 'WITH_FL'},
    {id : 'modTermAndConditionWithoutFL', text : 'WITHOUT_FL'}];
  }
  public navbarSearchOpen = false;
  public sessionStorage = sessionStorage;
  ngAfterViewInit() {
  }

  ngOnInit() {
    this.userName = sessionStorage.getItem('userName');
    this.userID = sessionStorage.getItem('userId');
    this.LastLogin = sessionStorage.getItem('lastloginDate');

  }

  logOut() {
    this.services.http.sessionValid = false;
    this.services.dataStore.formGenericData = "";
    this.router.navigate(['/login/elogin']);
  }

  redirect(id) {
    if (id === 'Initiation') {
      this.router.navigate(['/' + id]);
    } else if (id === 'modWithEnhancement' || id === 'modWithReduction'
      || id === 'modTermAndConditionWithFL' || id === 'modTermAndConditionWithoutFL'
      || id === 'renewalIOM' || id === 'renewalWithEnhancement' || id === 'renewalWithReduction' || id === 'renewalWithChanges'
      || id === 'renewalWithoutChanges' || id === 'renewalSTAR') {
        this.router.navigate(['/modificationRenewalComponent'],
      { queryParams: {modRenType: id} } );
    } else if (id === 'dnReissue' || id === 'dnTranche') {
      this.router.navigate(['/searchDN'], { queryParams: {dnType: id} } );
    } else if (id === 'starCondition') {
      this.router.navigate(['/starProcessComponent'], { queryParams: {modRenType: id, taskName : 'fileMaker'} } );
    }
  }

}
