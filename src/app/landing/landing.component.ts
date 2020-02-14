import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvidehttpService } from '../providehttp.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(public router : Router, public dataService : ProvidehttpService) { }

  ngOnInit() {
    //this.router.navigate(['/home/EACNOPENREQ']);
   // console.log('landing : ' + this.dataService.tfaapplet);
    //(window as any).signValues(this.dataService.tfaValue);
  }

}
