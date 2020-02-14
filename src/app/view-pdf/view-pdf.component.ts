import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as printJS from 'print-js';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {

  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }

  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

  pdfSrc: any;
  pdfUrl: any;
  cfsNumber: any;

  error: any = {
    hasErrors: false
  }

  ngOnInit() {
    this.services.http.showSpinner();
    let inputJson = this.services.http.mapToJson(this.services.dataStore.getData(this.services.routing.currModal));
    this.cfsNumber = inputJson['cfsNumber'];
    this.pdfSrc = this.getPdfSrc(this.cfsNumber);
  }

  nextPage() {
    // window.scrollTo(0, 0);
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  gotoPage(pageNo: number) {
    if (pageNo && pageNo >= 1 && pageNo <= this.totalPages) {
      this.page = pageNo;
      this.cdRef.detectChanges();
    }
  }

  getPdfSrc(cfsNumber) {
    this.pdfUrl = this.services.http.baseURL + 'servlet/FileDownloadProcessor?CFS_INV_NUM=' + cfsNumber;
    return {
      url: this.pdfUrl,
      withCredentials: true
    }
  }

  onError(event) {
    this.error.hasErrors = true;
    this.error["message"] = event.message;
    this.services.http.hideSpinner();
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
    this.services.http.hideSpinner();
  }

  printPdf(){
    printJS({printable: this.pdfUrl, type: 'pdf'});
  }
  
}
