import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormComponent } from '../form/form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceStock } from '../service-stock.service';
import { LabelComponent } from '../label/label.component';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

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

    let customerList = [{
      "CustomerId": "22",
      "CD_CUSTOMER_NAME": "Ronald Weasley",
      "CD_CUSTOMER_TYPE": "B"
    },
    {
      "CustomerId": "23",
      "CD_CUSTOMER_NAME": "Molly Weasley",
      "CD_CUSTOMER_TYPE": "CB"
    },
    {
      "CustomerId": "24",
      "CD_CUSTOMER_NAME": "Arthur Weasley",
      "CD_CUSTOMER_TYPE": "CB"
    },
    {
      "CustomerId": "25",
      "CD_CUSTOMER_NAME": "Willy Weasley",
      "CD_CUSTOMER_TYPE": "OP"
    },
    {
      "CustomerId": "26",
      "CD_CUSTOMER_NAME": "Ginny Weasley",
      "CD_CUSTOMER_TYPE": "G"
    },
    {
      "CustomerId": "996",
      "CD_CUSTOMER_NAME": "Remus Lupin",
      "CD_CUSTOMER_TYPE": "CB"
    }
    ];
    this.setCustomerList(customerList);
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
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
      tag.custId = eachCustomer.CustomerId;
      tag.label = eachCustomer.CD_CUSTOMER_TYPE;
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

  showCustomer(selectedCustomerId) {
    alert("section clicked" + selectedCustomerId);

    for (const eachCustomer of this.customerDataArr) {
      (eachCustomer.CustomerId == selectedCustomerId) ? eachCustomer.isActive = true : eachCustomer.isActive = false;
    }

    for (const eachTag of this.tagsArr) {
      (eachTag.custId == selectedCustomerId) ? eachTag.isActive = true : eachTag.isActive = false;
    }
  }

}
