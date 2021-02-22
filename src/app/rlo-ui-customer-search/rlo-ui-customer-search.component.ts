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
  @Input('inputType') inputType: string = 'text';
  @Input('allowFormat') allowFormat = true;
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
  componentName: string = 'RLOUICustomerSearchComp';

  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() {
  }

  //validate data added in input
  async loadOptions() {

  }
  async validateValue(value, event = undefined): Promise<number> {
    var totalErrors: number = 0;
    if (this.inputType == 'text') {
      totalErrors += this.onTextInput(value, event);
    } else {
      totalErrors += this.onNumberInput(value, event);
    }

    if(totalErrors == 0){ // Validate Regular Expression if Min Max are valid
      totalErrors += this.validateRegEx(value, event);
    }

    if (this.allowFormat && totalErrors === 0 ){ // format
      this.value =  this.services.rloui.formatText( this.value + '' );
    }

    return totalErrors;
  }


  validateRegEx(value, event) {
    var totalErrors: number = 0;
    if (this.regex) {
      try {
        var patt = new RegExp(this.regex);
        if (!patt.test(value)) {
          this.setError('rlo.error.invalid.regex');
          totalErrors++;
        }
      } catch (e) {
        console.error("Error validating Reg Ex ", e);
      }
    }
    return totalErrors;
  }
  onNumberInput(value: number, event?): number {
    var totalErrors: number = 0;
    value = +value;
    if (this.minValue && value < this.minValue) {
      this.setError("Value should be greater than " + this.minValue);
      totalErrors++;
    } else if (this.maxValue && value > this.maxValue) {
      this.setError("Value should be less than " + this.maxValue);
      totalErrors++;
    } else if ((this.DecimalLength && this.countDecimals(value) >= this.DecimalLength)) {
      if (event) {
        event.target.value = value.toFixed(this.DecimalLength);
        this.value = value.toFixed(this.DecimalLength);
      } else {
        this.setError("Maximum " + this.DecimalLength + " decimal are allowed");
        totalErrors++;
      }
    }
    else {
      this.clearError();
    }

    return totalErrors;
  }
  countDecimals(value) {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  }

  onTextInput(value: string, event?): number {
    var totalErrors: number = 0;
    if (this.minLength && value.length < this.minLength) {
      this.setError("Minimum " + this.minLength + " characters are required");
      totalErrors++;
    } else {
      this.clearError();
    }
    return totalErrors;
  }
  validateCustomer() {
    console.log('DEEP | btn click searchType', this.searchType, this.value);
    if (this.readOnly)
      return;

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
    if (!this.readOnly)
      this.searchCustomer.emit({ type: 'blur', inputBtn: this.searchType });
  }

  getFieldValue() {
    return this.value;
  }

}
