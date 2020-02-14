import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-grid-pagination',
  templateUrl: './grid-pagination.component.html',
  styleUrls: ['./grid-pagination.component.css']
})
export class GridPaginationComponent implements OnInit {
   activePage;
   public number;
   public maxSize;
   private gridApi;
   private numbers;
    constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }


  ngOnInit() {
  }
  setGrideApi(gridApi){
   this.gridApi=gridApi;
   this.numbers = Array(5).fill(4);
  }

  previousPage(){
    this.cdRef.detectChanges();
    if(this.number==this.activePage){
      if(this.number>=2){
     this.number=this.number-1;
      }
  }
    if(this.activePage!=1){
      this.activePage=this.activePage-1;
     
        this.gridApi.paginationGoToPage(this.activePage-1);
    }
  
  }
  onBtPage(number){
    this.activePage=number;
    this.gridApi.paginationGoToPage(this.activePage-1);
  }
  nextPage(){
    this.cdRef.detectChanges();
    if(this.number+4==this.activePage){
      if(this.number+4<=this.maxSize-1){
     this.number=this.number+1;
      }
  }
    if(this.maxSize!=this.activePage){
    this.activePage=this.activePage+1;
   
      this.gridApi.paginationGoToPage(this.activePage-1);
  }
  }
  
  pagnationGenerater(number){
    this.maxSize=number;
    this.number=1;
      this.activePage=1;
  }

}
