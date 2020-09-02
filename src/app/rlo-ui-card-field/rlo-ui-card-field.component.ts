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

@Component({
  selector: 'rlo-ui-card-field',
  templateUrl: './rlo-ui-card-field.component.html',
  styleUrls: ['./rlo-ui-card-field.component.css']
})
export class RloUiCardFieldComponent extends FieldComponent implements OnInit {
  @Input() type: string;
  @Output() onIconClick = new EventEmitter<any>();
  subTitle: string = "";

  @Input('cardFieldMetaData') cardFieldMetaData: ICardListData;
  @Input('parentCardName') parentCardName: string;
  @Input('applicationId') applicationId: any;
  @Input('borrowerSeq') borrowerSeq: any;
  @Input('componentCode') componentCode: any;

  myIcon: boolean;

  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.subTitle = this.cardFieldMetaData.subTitle;
    // console.log(this.cardFieldMetaData, this.applicationId, this.borrowerSeq, this.componentCode);

    if (this.cardFieldMetaData.subTitle != "NA" && this.cardFieldMetaData.formatToCurrency) {
      this.cardFieldMetaData.subTitle = this.services.formatAmount(this.cardFieldMetaData.subTitle, null, null,false)
    }
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
}
