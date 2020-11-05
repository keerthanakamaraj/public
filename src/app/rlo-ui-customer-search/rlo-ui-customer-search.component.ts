import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldComponent } from '../field/field.component';
// import { ICustomSearchObject } from '../Interface/masterInterface';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-rlo-ui-customer-search',
  templateUrl: './rlo-ui-customer-search.component.html',
  styleUrls: ['./rlo-ui-customer-search.component.css']
})
export class RloUiCustomerSearchComponent extends FieldComponent implements OnInit {

  @Input('minValue') minValue: number;
  @Input('maxValue') maxValue: number;
  @Input('maxLength') maxLength: number;
  @Input('minLength') minLength: number;
  @Input('DecimalLength') DecimalLength: number;
  @Input('numberType') type: string;
  @Input('readOnly') readOnly: boolean;
  @Input('searchType') searchType: any;

  // RLO Additions
  @Input('regex') regex: string;

  @Output() selectedCustomerRow = new EventEmitter<any>();
  @Output() inputTabOut = new EventEmitter<any>();

  @Output() searchCustomer = new EventEmitter<any>();

  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() {
  }

  //validate data added in input
  async loadOptions() {

  }

  validateCustomer() {
    console.log('DEEP | btn click searchType', this.searchType, this.value);

    this.searchCustomer.emit({ type: 'btnClick', inputBtn: this.searchType });
    return;
    //let obj: ICustomSearchObject = {};
    let obj: any = {};

    switch (this.searchType) {
      case 'CD_CIF':
        obj.cifNumber = this.value;
        break;

      case 'CD_CUSTOMER_ID':
        obj.customerId = this.value;
        break;

      case 'CD_STAFF_ID':
        obj.staffId = this.value;
        break;

      default:
        break;
    }

    this.services.rloui.openCustomerSearch(obj).then((response: any) => {
      if (response != null) {
        console.log(response);
        if (!response)
          this.selectedCustomerRow.emit(response);
      }
      else {
        console.warn("DEEP | No customer selected");
      }
    });
  }

  onBlur() {
    console.log("DEEP | __onBlur", this.searchType); 
    this.searchCustomer.emit({ type: 'blur', inputBtn: this.searchType });
  }

  getFieldValue() {
    return this.value;
  }

}
