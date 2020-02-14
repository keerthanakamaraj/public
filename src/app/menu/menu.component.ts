import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';
import { Router } from '@angular/router';
declare let $: any;
window["$"] = $;
window["jQuery"] = $;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public services: ServiceStock, private cdRef: ChangeDetectorRef, private router: Router) {
   
  }
  public isSideBarToggled = false;
  public OpenTabArray=[];
  public Menu=[];
  ngOnInit() {
  this.LoadMenuJson();
  }

  async LoadMenuJson(){
    let inputMap = new Map();
    inputMap.set('QueryParam.scope', "MENU");
    this.services.http.showSpinner();
    await this.services.http.fetchApi('/scopeBasedPermission', 'GET', inputMap).toPromise()
    .then(
    async (res)=>{
    this.services.http.hideSpinner();
    },
    async (httpError)=>{
    this.services.http.hideSpinner();
    }
    );
  }

  async openPage(formCode) {
    this.services.http.ActiveTab=formCode;
    this.services.http.navBarMessage='';
    this.router.navigate(['home', formCode]);
    // setTimeout(() => { 
    //   this.router.navigate(['home', formCode]);
    // }, 0);
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
  }
  onclickSlider(){
    this.isSideBarToggled ? this.isSideBarToggled = false : this.isSideBarToggled = true;
    if(this.isSideBarToggled){
      document.getElementById("MenuHeaderName").style.display="none";
      }else{
        document.getElementById("MenuHeaderName").style.display="flex";
    }
  }
  openTab(formCode){
   if(this.OpenTabArray.indexOf(formCode)>=0){
    this.OpenTabArray.splice(this.OpenTabArray.indexOf(formCode), 1);
   }else{
    this.OpenTabArray.push(formCode);
   }

  }
 

}
