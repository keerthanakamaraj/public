import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { FieldComponent } from '../field/field.component';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.css']
})
export class AmountComponent extends FieldComponent implements OnInit {

  @Input('displayCurrCode') displayCurrCode: boolean = false;

  @Input('minValue') minValue: number;
  @Input('maxValue') maxValue: number;
  @Input('maxLength') maxLength: number;
  @Input('minLength') minLength: number;
  @Input('DecimalLength') DecimalLength: number = 2;

  currencyCode = 'INR';
  languageCode = 'en-IN';
  constructor(services: ServiceStock) {
    super(services);
  }

  allowNumbersOnly(event) {
    if (event.key > 0 || event.key < 9 || event.key == 'ArrowRight' || event.key == 'ArrowLeft' || event.key == 'Backspace' || event.key == 'Delete' || event.key == 'Tab') {
    }
    else if (event.key == "." || event.key == ",") {
    } else {
      event.preventDefault();
    }
  }


  setFormatOptions(Json) {
    if (Json.currencyCode)
      this.currencyCode = Json.currencyCode;
    if (Json.languageCode)
      this.languageCode = Json.languageCode;
    if (Json.DecimalLength)
      this.DecimalLength = Json.DecimalLength;
    if (this.value) {
      this.isOnFocus = false;
      this.value = this.additionalInfo;
      this.additionalInfo = this.formatAmount(+this.value, this.languageCode, this.DecimalLength);
    }
  }

  //OG
  // formatAmount(number, languageCode, minFraction) {
  //   // return this.services.formatAmount(number, languageCode, minFraction);
  //   // Dirty Fix
  //   return this.services.formatAmount(number, languageCode, minFraction).substr(1);
  // }


  formatAmount(number, languageCode, minFraction, hideSymbol?: boolean) {
    // return this.services.formatAmount(number, languageCode, minFraction);
    // Dirty Fix
    return this.services.formatAmount(number, languageCode, minFraction).substr(3);
    // return this.services.formatAmount(number, languageCode, minFraction);
  }

  onBlur() {
    this.isOnFocus = false;
    this.languageCode = "en-US";

    if (this.value) {
      this.additionalInfo = this.formatAmount(+this.value, this.languageCode, this.DecimalLength, true);
      //this.additionalInfo = this.formatAmount(+this.value , this.languageCode , this.DecimalLength);

      //this.additionalInfo=this.value;
    }
    this.blur.emit(this.value);
  }

  onChange() {
    this.value = this.additionalInfo;
    this.languageCode = "en-US";
    this.change.emit();

    if (this.value) {
      this.additionalInfo = this.formatAmount(+this.value, this.languageCode, this.DecimalLength, true);
    }
  }

  async validateValue(value, event = undefined): Promise<number> {
    var totalErrors: number = 0;
    totalErrors += this.onNumberInput(value, event);
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
    } else if ((this.DecimalLength && this.countDecimals(value) > this.DecimalLength)) {
      if (event) {
        event.target.value = value.toFixed(+this.DecimalLength);
        this.additionalInfo = value.toFixed(+this.DecimalLength);
        this.value = value.toFixed(+this.DecimalLength);
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
  isNumberKey(event) {
    var charCode = event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  setValue(value, additionalInfo = undefined) {
    this.value = value;
    if (value) {
      let inputMap = new Map();
      inputMap.set('IP_AMT', value);
      if (additionalInfo) {
        this.additionalInfo = additionalInfo;
      } else {
        this.additionalInfo = this.formatAmount(+this.value, this.languageCode, this.countDecimals(+value) == 0 ? this.DecimalLength : this.countDecimals(+value));
      }
    }
    this.passNewValue(this.value);
  }
  onFocus() {
    this.additionalInfo = this.value;
    this.isOnFocus = true;
    this.clearError();
  }
  getFieldValue() {
    return this.value == undefined ? this.value : +this.value;
  }

  ngOnInit() { }

}
