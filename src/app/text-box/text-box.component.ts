import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { ProvidehttpService } from '../providehttp.service';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent extends FieldComponent implements OnInit {
  @Input('inputType') inputType: string = 'text';

  @Input('minValue') minValue: number;
  @Input('maxValue') maxValue: number;
  @Input('maxLength') maxLength: number;
  @Input('minLength') minLength: number;
  @Input('DecimalLength') DecimalLength: number;

  // RLO Additions
  @Input('regex') regex: string;

  // RLO Additions
  // Restrict Tenant level case formatting, default: true
  @Input('allowFormat') allowFormat = true;

  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() {
    // if (this.align) {
    //   this.textalign = ":" + this.align + ";";
    // }
  }

  getFieldInfo() {
    return (this.value == undefined) ? "" : this.value;
  }

  async validateValue(value, event = undefined): Promise<number> {
    var totalErrors: number = 0;
    if (this.inputType == 'text') {
      totalErrors += this.onTextInput(value, event);
    } else {
      totalErrors += this.onNumberInput(value, event);
    }

    // Validate Regular Expression
    totalErrors += this.validateRegEx(value, event);

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

}
