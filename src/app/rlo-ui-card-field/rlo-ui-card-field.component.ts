import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// import { FieldComponent } from '../field/field.component';
import { ServiceStock } from '../service-stock.service';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { FormComponent } from '../form/form.component';
import { FieldComponent } from '../field/field.component';
import { IDeserializable, IGeneralCardData, ICardListData } from "../Interface/masterInterface";
import { reduce } from 'rxjs/operators';
import { isContext } from 'vm';
import { SelectControlValueAccessor } from '@angular/forms';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { IModalData } from '../popup-alert/popup-interface';

@Component({
  selector: 'rlo-ui-card-field',
  templateUrl: './rlo-ui-card-field.component.html',
  styleUrls: ['./rlo-ui-card-field.component.css']
})
export class RloUiCardFieldComponent extends FieldComponent implements OnInit {
  @Input() type: string;
  @Output() onIconClick = new EventEmitter<any>();
  @Output() onInterfaceRefresh = new EventEmitter<any>();
  subTitle: string = "";

  @Input('cardFieldMetaData') cardFieldMetaData: ICardListData;
  @Input('parentCardName') parentCardName: string;
  @Input('applicationId') applicationId: any;
  @Input('borrowerSeq') borrowerSeq: any;
  @Input('componentCode') componentCode: any;

  myIcon: boolean;

  testCibilResponse: string = "PHA+PGJyPjwvcD48cD48YnI+PC9wPjxwPjxicj48L3A+PGgzIGNsYXNzPSdxbC1hbGlnbi1jZW50ZXInPjxzdHJvbmc+U21hcnQgQmFuayBMb2FuIDwvc3Ryb25nPjwvaDM+PHAgY2xhc3M9J3FsLWFsaWduLWNlbnRlcic+MTIzIEJhbmsgU3RyZWV0LCA3dGggQnVzaW5lc3MgRGlzdHJpY3QsPC9wPjxwIGNsYXNzPSdxbC1hbGlnbi1jZW50ZXInPjxicj48L3A+PGgzIGNsYXNzPSdxbC1hbGlnbi1jZW50ZXInPlN3ZWRlbjwvaDM+PHA+PGJyPjwvcD48cD48YnI+PC9wPjxwPk1TIExpbGx5IEFiZWJlPC9wPjxwPjxicj48L3A+PHA+QEFERFIxPC9wPjxwPjxicj48L3A+PHA+QENPVU5UUlksPC9wPjxwPjxicj48L3A+PHA+MTAwMDUuPC9wPjxwPjxicj48L3A+PHA+PHN0cm9uZz5TdWJqZWN0IDogSXNzdWFuY2Ugb2YgTG9hbiBhZ2FpbnN0IHlvdXIgYXBwbGljYXRpb24gbm8gOiAxMTEwUEVSMDAwMDA5MDE8L3N0cm9uZz48L3A+PHA+PGJyPjwvcD48cD5EZWFyIE1TIExpbGx5IEFiZWJlPC9wPjxwPjxicj48L3A+PHA+V2UgYXJlIHZlcnkgZ2xhZCB0byBpbmZvcm0geW91IHRoYXQgaW4gcmVzcG9uc2UgdG8geW91ciByZXF1ZXN0IGZvciBhIGJhbmsgbG9hbiBpbiBvcmRlciB0byBtZWV0PC9wPjxwPmZpbmFuY2lhbCByZXF1aXJlbWVudHMsIHdlIGhhdmUgYXBwcm92ZWQgeW91ciByZXF1ZXN0LjwvcD48cD48YnI+PC9wPjxwPllvdSByZXF1ZXN0ZWQgYSBAUFJPRFVDVF9DT0RFIG9mIEVVUiAzMDAwLiBIZW5jZSwgdGhlIGJhbmsgaGFzIGRlY2lkZWQgdG88L3A+PHA+YXBwcm92ZSB5b3VyIGFwcGxpY2F0aW9uIG9mIGxvYW4gZm9yIEVVUiAzMDAwLjwvcD48cD48YnI+PC9wPjxwPlRoZSBpbnRlcmVzdCByYXRlIHRoYXQgeW91IHdpbGwgaGF2ZSB0byBwYXkgb24gdGhlIGxvYW4gd2lsbCBiZSAxMCAlLiBUaGlzIGludGVyZXN0IHJhdGUgaGFzIGJlZW48L3A+PHA+Y2FsY3VsYXRlZCB3aXRoIHRoZSBoZWxwIG9mIHN0YW5kYXJkIGZvcm11bGEgdXNlZCBmb3IgY2FsY3VsYXRpbmcgaW50ZXJlc3QgcmF0ZSAoUExSKS4gV2UgaG9wZSB0aGF0IHRoaXM8L3A+PHA+aW50ZXJlc3QgcmF0ZSB3aWxsIGJlIGdvb2QgZm9yIHlvdS48L3A+PHA+PGJyPjwvcD48cD5Zb3Ugd2lsbCBoYXZlIHRvIHBheSB0aGUgbG9hbiBiYWNrIHdpdGhpbiAxMCB5ZWFycy4gTW9yZW92ZXIsIHRoZSBpbnRlcmVzdCByYXRlIG1heSBjaGFuZ2UgZGVwZW5kaW5nPC9wPjxwPm9uIHRoZSBkdXJhdGlvbiBvZiBsb2FuIHlvdSBjaG9vc2UuIFRoZSByZXBheW1lbnQgc2NoZWR1bGUgaXMgZW5jbG9zZWQuPC9wPjxwPjxicj48L3A+PHA+UGxlYXNlIGNvbWUgdG8gdGhlIGJhbmsgYW5kIHJldmlldyB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgb2YgdGhlIGxvYW4gYWdyZWVtZW50IHdpdGggdGhlIGJhbmsuIFRoZSB0ZXJtcyBoYXZlIGJlZW4gY29tcGxldGVseSBvdXRsaW5lZCBpbiB0aGUgcHJvbWlzc29yeSBub3RlLiBZb3UgYXJlIHJlcXVlc3RlZCB0byBjb21lIGFuZCBzaWduIGl0LiBXZSBoYXZlIGF0dGFjaGVkIHNldmVyYWwgcmVsYXRlZCBkb2N1bWVudHMgd2l0aCB0aGlzIGxldHRlciB0aGF0IGFyZSBmYXZvcmFibGUgZm9yIHlvdS4gUGxlYXNlIHJldmlldyB0aGUgZm9ybSB0aG9yb3VnaGx5IGFuZCByZXR1cm4gdXMgc28gdGhhdCB0aGUgcHJvY2Vzc2luZyBvZiBsb2FuIGNhbiBiZSBkb25lLiZuYnNwOzwvcD48cD48YnI+PC9wPjxwPlNpbmNlcmVseSwmbmJzcDs8L3A+PHA+PGJyPjwvcD48cD5CcmFuY2ggTWFuYWdlcjwvcD4=";

  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.subTitle = this.cardFieldMetaData.subTitle;

    if (this.cardFieldMetaData.subTitle != "NA" && this.cardFieldMetaData.formatToCurrency) {
      this.cardFieldMetaData.subTitle = this.services.formatAmount(this.cardFieldMetaData.subTitle, null, null, false)
    }
    console.log(this.cardFieldMetaData);
  }

  onClickButton(event) {
    this.onIconClick.emit(event);
  }

  onButtonClick() {
    // console.log(this.cardFieldMetaData);

    const obj: IGeneralCardData = {
      name: '',
      modalSectionName: this.cardFieldMetaData.modalSectionName,
      borrowerSeq: this.borrowerSeq,
      applicationId: this.applicationId,
      componentCode: this.componentCode
    }

    switch (this.cardFieldMetaData.modalSectionName) {
      case "FeesAndChargesDetails":
        obj.name = "Fees & Charges"
        break;

      case "Total Investment Amount":
        obj.name = "Loan Details"
        break;

      case "OccupationDetails":
        obj.name = "Financial Summary"
        break;

      case "Amortization":
        obj.name = "Amortization Schedule"
        break;

      case "LiabilityDetails":
        obj.name = "Total Liability"
        break;

      case "DisbursementDetails":
        obj.name = "Disbursement Details"
        break;

      case "AssetDetails":
        obj.name = "Asset Details"
        break;

      case "ObligationDetails":
        obj.name = "Total Obligation"
        break;

      default:
        break;
    }

    this.services.rloui.openComponentModal(obj);
  }

  getInterfaceData(type: "CIBIL" | "Experian") {
    let appId = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'appId');
    this.services.rloCommonData.getInterfaceModalData(appId, type);
  }

  interfaceRefeshed(cardFieldMetaData) {
    let obj = {
      'interfaceId': cardFieldMetaData.interfaceId,
      'type': cardFieldMetaData.title
    }
    this.onInterfaceRefresh.emit(obj);
  }
}
