import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { FieldComponent } from '../field/field.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-rlo-ui-currency',
  templateUrl: './rlo-ui-currency.component.html',
  styleUrls: ['./rlo-ui-currency.component.css']
})
export class RloUiCurrencyComponent extends FieldComponent implements OnInit {

  @Input('inputType') inputType: string = 'text';

  @Input('minValue') minValue: number;
  @Input('maxValue') maxValue: number;
  @Input('maxLength') maxLength: number;
  @Input('minLength') minLength: number;
  @Input('DecimalLength') DecimalLength: number;
  @Input('numberType') type: string;

  @Input('currencyReadOnly') currencyReadOnly: boolean;
  @Input('inputReadOnly') inputReadOnly: boolean;

  @Input('formCode') formCode: any;
  @Input('componentFieldId') componentFieldId: string;// name of the viewChild used in the component

  @ViewChild('amountTextbox', { static: false }) amountTextbox: TextBoxComponent;

  @Output() onBlurEvent: EventEmitter<any> = new EventEmitter<any>();

  showLoader: boolean = false;
  currencyCode: string = this.defaultCurrencyCode();//default val
  currencyList: any = [];
  dependencyMap2 = new Map<string, any>();
  exchangeRate: number = 1;
  componentName: string = 'RloUiCurrencyComponent';

  staticData: any = {
    "CD_COUNTRY_CODE": {
      inDep: [
        { paramKey: "CurrencySrc", depFieldID: "OD_CURRENCY", paramType: "PathParam" },
        // { paramKey: "CurrencyDest", depFieldID: "hideCurrencyDesc", paramType: "QueryParam" },
      ],
      outDep: [
        { paramKey: "MstCurrencyDetails.ExchangeRate", depFieldID: "hidExchangeRate" },
      ]
    }
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

    console.log(this.dependencyMap2);
  }

  constructor(services: ServiceStock, private cdRef: ChangeDetectorRef) {
    super(services);
  }

  defaultCurrencyCode() {
    return localStorage.getItem("currency.code.default");
  }

  async loadOptions() {
    let count = 0;
    this.showLoader = true;
    this.cdRef.detectChanges();
    this.currencyList = [];
    this.services.http.loadLookup('/MstCurrencyDetails', this.dependencyMap2, 1, "", count, '/masters').subscribe(
      data => {
        this.showLoader = false;
        if (data) {
          this.currencyList = data['Data'];
        }
      },
      err => { },
      () => {
        this.showLoader = false;
      });
  }

  selectedCode(code: string, getExhangeRate: boolean = true) {
    console.warn(code);
    if (code == undefined) {
      return;
    }

    this.currencyCode = code;
    console.log("selectedCode()", this.amountTextbox.value);

    if (!getExhangeRate) {
      this.genericOnBlur(this.currencyCode, this.amountTextbox.value);
      return
    }


    this.services.http.fetchApi('/MstCurrencyDetails/' + this.currencyCode, 'GET', undefined, '/masters').subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var res = httpResponse.body;
        console.log('Deep | res', res);
        console.log("DEEP | onBlur()", this.amountTextbox.value);
        this.exchangeRate = res.MstCurrencyDetails.ExchangeRate
        this.genericOnBlur(this.currencyCode, this.amountTextbox.value, this.exchangeRate);
      },
      async (httpError) => {

      }
    );
    //this.genericOnBlur(this.currencyCode, this.amountTextbox.value);
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

  //replaced generic 'setValue' fn used (in eg: CustomerDtls)
  setComponentSpecificValue(value, countryCode?: string, additionalInfo?:string) {
    this.amountTextbox.setValue(value);
    this.amountTextbox.value = value;

    this.setValue(value, additionalInfo = undefined);
    this.currencyCode = countryCode == null || countryCode == undefined ? this.defaultCurrencyCode() : countryCode;

    if (countryCode != null || countryCode != undefined) {
      this.selectedCode(countryCode);
      return;
    }

    this.genericOnBlur(this.currencyCode, value);
  }

  genericOnBlur(currencyDropdownChanged: any, value: any, exchangeRate?: number) {
    console.log(currencyDropdownChanged);
    let data = { field: this.componentFieldId, textFieldValue: value, exchangeRate }
    this.onBlurEvent.emit(data);
  }

  amountFieldBlur() {
    console.log("DEEP | amountFieldBlur()");
    console.warn(this.currencyCode, this.amountTextbox.value);
    this.genericOnBlur(this.currencyCode, this.amountTextbox.value, this.exchangeRate);

    this.onBlur();
  }

  resetFieldAndDropDown() {
    this.amountTextbox.onReset();
    this.error = false;
    this.currencyCode = this.defaultCurrencyCode();
  }

  getTextBoxValue() {
    return this.amountTextbox.value;
  }

  getFieldValue() {
    return this.amountTextbox.value;
  }

  setReadOnly(readOnly) {
    this.inputReadOnly = readOnly;
  }
}
