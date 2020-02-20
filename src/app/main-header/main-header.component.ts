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
  }
  public navbarSearchOpen = false;
  public sessionStorage = sessionStorage;
  ngAfterViewInit() {
  }
   formatMoney(number , languageCode , minFraction) {
    return number.toLocaleString(languageCode, { minimumFractionDigits: minFraction});
  }
  
  
  ngOnInit() {
    console.log(this.formatMoney(1000000000.235 , 'en' , 2));
    var d = new Date("2015-12-03");
    console.log(d.toLocaleDateString("en-US"));

    this.userName = sessionStorage.getItem('userName');
    this.userID = sessionStorage.getItem('userId');
    this.LastLogin = sessionStorage.getItem('lastloginDate');

  }

  logOut() {
    this.services.http.sessionValid = false;
    this.services.dataStore.formGenericData = "";
    this.router.navigate(['/login/elogin']);
  }
 
}
