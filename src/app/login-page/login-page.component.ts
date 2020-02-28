import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProvidehttpService } from '../providehttp.service';
import { ServiceStock } from '../service-stock.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  announcements: any = [];

  constructor(private router: Router, private services: ServiceStock) { }

  ngOnInit() {
   // this.router.navigate(['/login', 'elogin']);
   // this.loadannouncements();
    this.carousel()
  }

  myIndex = 0;
  carousel() {
    var i;
     var x = <any>document.getElementsByClassName("item");
     var y = <any>document.getElementsByClassName("itemText");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
      y[i].style.display = "none"; 
    }
    this.myIndex++;
    if (this.myIndex > x.length) {this.myIndex = 1}    
    x[this.myIndex-1].style.display = "block";  
    y[this.myIndex-1].style.display = "block";
    setTimeout(this.carousel.bind(this), 7000);    
  }

  // loadannouncements(){
  //   setTimeout(() => {
  //     this.services.http.fetchData("ELOGIN", "SSGW", "ANNOUNCEBEFORE", new Map()).subscribe(
  //       res => {
  //         if (res && res['data']) {
  //           this.announcements = res['data'];
  //         }
  //       }
  //     );  
  //   }, 1000);
  // }
}
