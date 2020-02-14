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
  routToMyTray() {
    this.router.navigate(['/home/MyWorkflow']);
  }
  toggleFullScreen() {
    if (!document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen((<any>Element).ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
    $("#ToggleFullScreen").toggleClass("fa-expand");
    $("#ToggleFullScreen").toggleClass("fa-compress");

  }

}
