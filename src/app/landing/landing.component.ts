import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvidehttpService } from '../providehttp.service';
//import { MainHeaderComponent } from '../main-header/main-header.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
//@ViewChild headercomponent : MainHeaderComponent;
  constructor(public router : Router, public dataService : ProvidehttpService) { }
  
  ngOnInit() {
    //this.router.navigate(['/home/EACNOPENREQ']);
   // console.log('landing : ' + this.dataService.tfaapplet);
    //(window as any).signValues(this.dataService.tfaValue);
  }

}
