import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'rlo-ui-mobile',
  templateUrl: './rlo-ui-mobile.component.html',
  styleUrls: ['./rlo-ui-mobile.component.css']
})
export class RloUiMobileComponent extends FieldComponent implements OnInit {

  @Input('inputType') inputType: string = 'text';

  @Input('minValue') minValue: number;
  @Input('maxValue') maxValue: number;
  @Input('maxLength') maxLength: number;
  @Input('minLength') minLength: number;
  @Input('DecimalLength') DecimalLength: number;
  @Input('numberType') type: string;


  // RLO Additions
  @Input('regex') regex: string;
  // maxLengthValidation : number = 8;

  staticData: any = {
    "CD_COUNTRY_CODE": {
      inDep: [
        { paramKey: "VALUE1", depFieldID: "CD_COUNTRY_CODE", paramType: "PathParam" },
        { paramKey: "APPID", depFieldID: "hidAppId", paramType: "QueryParam" },
        { paramKey: "KEY1", depFieldID: "hideISDCode", paramType: "QueryParam" },
      ],
      outDep: [
      ]
    }
  }

  dependencyMap2 = new Map<string, any>();
  showLoader: boolean = false;
  countriesList: any = [];
  countryCode: string = this.defaultCountryCode();//default val

  defaultCountryCode() {
    return "46";
  }

  constructor(services: ServiceStock, private cdRef: ChangeDetectorRef) {
    super(services);
  }

  ngOnInit() {
    this.showLoader = false;
  }

  ngAfterViewInit() {
    this.loadOptions();
    this.getFieldValue();
    // console.log(this.staticData);

    this.dependencyMap2.set("VALUE1", {
      paramType: "PathParam",
      value: undefined
    });

    this.dependencyMap2.set("APPID", {
      paramType: "QueryParam",
      value: "RLO"
    });

    this.dependencyMap2.set("KEY1", {
      paramType: "QueryParam",
      value: "ISD_COUNTRY_CODE"
    });

    // console.log(this.dependencyMap2);
  }

  //replaced generic 'setValue' fn used (in eg: CustomerDtls)
  setComponentSpecificValue(value, countryCode: string, additionalInfo = undefined) {
    this.setValue(value, additionalInfo = undefined);
    this.countryCode = countryCode == null || countryCode == undefined ? this.defaultCountryCode() : countryCode;
  }

  //replaced generic 'onReset' fn used (in eg: CustomerDtls)
  onResetMobileNo() {
    this.onReset();
    this.countryCode = this.defaultCountryCode();
  }

  selectedCode(code: string) {
    console.warn(code);
    this.countryCode = code;
  }

  async loadOptions() {
    let count = 0;
    this.showLoader = true;
    this.cdRef.detectChanges();
    this.countriesList = [];
    this.services.http.loadLookup('/MSTGENERALPARAM', this.dependencyMap2, 1, "", count, '/masters').subscribe(
      data => {
        this.showLoader = false;
        if (data) {
          this.countriesList = data['Data'];
        }
      },
      err => { },
      () => {
        this.showLoader = false;
      });
  }

  async open() {
    if (this.doCustomScript) {
      await this.doCustomScript();
    }
    this.loadOptions();
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

    return totalErrors;
  }

  validateRegEx(value, event) {
    var totalErrors: number = 0;
    //this.regex = "^([5]{1})([0-9]{7})*$";
    if(this.type == 'LandlineNo'){ 
    this.regex = "^([246]{1})([0-9]{6})*$";
    // this.maxLengthValidation = 7
    }
    else{
      this.regex = "^([5]{1})([0-9]{7})*$";
      // this.maxLengthValidation = 8

      // this.regex="^([7-9]{1})([0-9]+)*$";
    }
   
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
