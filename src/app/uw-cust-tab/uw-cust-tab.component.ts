import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormComponent } from '../form/form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IUwCustomerTab } from '../Interface/masterInterface';

const customCss: string = '';
export class ITag {
  label?: string = '';
  text?: string = '';
  custId?: string = '';
  isActive?: boolean = false;
}
@Component({
  selector: 'app-uw-cust-tab',
  templateUrl: './uw-cust-tab.component.html'
})
export class UWCustomerTabComponent implements OnInit, AfterViewInit {

  @Output() customerChanged = new EventEmitter<any>();
  @Input() isLoanCategory=this.services.rloCommonData.globalApplicationDtls.isLoanCategory;

  customerDataArr: any[];
  isFirstAPICall: boolean = true;
  tagsArr: ITag[] = [];
  isMore: boolean = false;
  firstIndex = 0;
  lastIndex = 0;
  moreTag: any = {};
  isFirstLoad: boolean = false;
  sliderLength: number = 4;

  constructor(private services: ServiceStock) { }

  ngOnInit() {

    // const customerList = [{
    //   "BorrowerSeq": "22",
    //   "CD_CUSTOMER_NAME": "Ronald Weasley",
    //   "CD_CUSTOMER_TYPE": "B"
    // },
    // {
    //   "BorrowerSeq": "23",
    //   "CD_CUSTOMER_NAME": "Molly Weasley",
    //   "CD_CUSTOMER_TYPE": "CB"
    // },
    // {
    //   "BorrowerSeq": "24",
    //   "CD_CUSTOMER_NAME": "Arthur Weasley",
    //   "CD_CUSTOMER_TYPE": "CB"
    // },
    // {
    //   "BorrowerSeq": "25",
    //   "CD_CUSTOMER_NAME": "Willy Weasley",
    //   "CD_CUSTOMER_TYPE": "OP"
    // },
    // {
    //   "BorrowerSeq": "26",
    //   "CD_CUSTOMER_NAME": "Ginny Weasley",
    //   "CD_CUSTOMER_TYPE": "G"
    // },
    // {
    //   "BorrowerSeq": "996",
    //   "CD_CUSTOMER_NAME": "Remus Lupin",
    //   "CD_CUSTOMER_TYPE": "CB"
    // }
    // ];
    //this.setCustomerList(customerList);
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    //this.setCustomerList(this.customerList);
  }

  // onClickButton(event) {
  //   this.onIconClick.emit(event);
  // }

  resetToFirst() {
    this.tagsArr.forEach(element => {
      element.isActive = false;
    });

    this.customerDataArr.forEach(element => {
      element.isActive = false;
    });

    this.customerDataArr[0].isActive = true;
    this.tagsArr[0].isActive = true;
    this.firstIndex = 0;
    this.lastIndex = this.sliderLength;
  }

  setCustomerList(customerList) {
    this.customerDataArr = customerList;
    if (!this.isFirstLoad) {
      this.customerDataArr[0].isActive = true;
      this.isFirstLoad = true;
    }
    this.setCustomerTagList();
  }

  trimTagsIfRequired(tags, maxAllowedTags) {
    const totalLength = this.customerDataArr.length;
    if (totalLength > maxAllowedTags) {
      tags.length = maxAllowedTags;
      this.moreTag = { label: '+ ' + (totalLength - maxAllowedTags) };
      this.isMore = true;
    }
    return tags;
  }

  setCustomerTagList() {
    this.cloneCustomerArray();
    this.tagsArr = this.trimTagsIfRequired(this.tagsArr, this.sliderLength);
    this.firstIndex = 0;
    this.lastIndex = this.sliderLength;
    //this.tagsArr[0].isActive = true;
  }

  cloneCustomerArray() {
    this.customerDataArr.forEach(eachCustomer => {
      const tag: ITag = {};
      tag.custId = eachCustomer.BorrowerSeq;
      if(!this.isLoanCategory && this.services.rloCommonData.globalApplicationDtls.CustomerType=='C'){
        tag.label=('B'==eachCustomer.CD_CUSTOMER_TYPE)?'C':'M'
      }else if(!this.isLoanCategory && this.services.rloCommonData.globalApplicationDtls.CustomerType=='I'){
        tag.label=('B'==eachCustomer.CD_CUSTOMER_TYPE)?'P':'A'
      }else{
        tag.label = eachCustomer.CD_CUSTOMER_TYPE;
      }
   
      tag.text = eachCustomer.CD_CUSTOMER_NAME;
      tag.isActive = eachCustomer.isActive ? eachCustomer.isActive : false;
      this.tagsArr.push(tag);
    });
  }

  shiftNext(direction) {
    if (this.customerDataArr.length > this.lastIndex) {
      this.tagsArr = [];
      this.cloneCustomerArray();

      this.lastIndex = this.lastIndex + 1;
      this.firstIndex = this.firstIndex + 1;

      this.tagsArr = this.tagsArr.slice(this.firstIndex);
      this.tagsArr = this.trimTagsIfRequired(this.tagsArr, this.sliderLength);
    }
  }

  shiftPrev(direction) {
    if (this.firstIndex > 0) {
      this.tagsArr = [];
      this.cloneCustomerArray();

      this.lastIndex = this.lastIndex - 1;
      this.firstIndex = this.firstIndex - 1;

      this.tagsArr = this.tagsArr.slice(this.firstIndex);
      this.tagsArr = this.trimTagsIfRequired(this.tagsArr, this.sliderLength);
    }
  }

  showCustomer(selectedBorrowerSeq, index) {
    let obj = {
      "selectedBorrowerSeq": selectedBorrowerSeq,
      "index": index
    }
    this.customerChanged.emit(obj);

    for (const eachCustomer of this.customerDataArr) {
      (eachCustomer.BorrowerSeq == selectedBorrowerSeq) ? eachCustomer.isActive = true : eachCustomer.isActive = false;
    }

    for (const eachTag of this.tagsArr) {
      (eachTag.custId == selectedBorrowerSeq) ? eachTag.isActive = true : eachTag.isActive = false;
    }
  }

}
