import { Component, OnInit } from '@angular/core';
import { RefreshSidebarService } from '../refreshSidebar.service';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {


  // source=["abc","odjsf","fsdfs","htrhtr","erter","vbgg","kjghg","fbfh"];
  // confirmed=["htrhtr","odjsf"];

  serviceList: any[] = [];
  favorites: any[] = [];

  isLoading: boolean = true;

  constructor(private services: ServiceStock,
    private refreshSidebarService: RefreshSidebarService
  ) {
    
   }

    format = {};

  ngOnInit() {
  
  }

 

 


}
