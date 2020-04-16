import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { IMyDpOptions, IMyInputFocusBlur, IMyInputFieldChanged, IMyDateModel, MyDatePicker } from 'mydatepicker';
import { ProvidehttpService } from '../providehttp.service';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})

export class DateComponent extends FieldComponent implements OnInit {
  @Input('format') format : string = 'dd-mm-yyyy';

  @ViewChild('field', { static: true }) field: MyDatePicker;

  // format: string;
  maxlength = 0;
  public myDatePickerOptions: IMyDpOptions;
  constructor(services: ServiceStock) {
    super(services);
  }

  alignmentClass: string = 'valueLeft';

  isDate(event) {
  }


  ngOnInit() {
    if (this.valueAlign == 'right') { this.alignmentClass = 'valueRight'; }
    if (this.valueAlign == 'center') { this.alignmentClass = 'valueCenter'; }
    this.myDatePickerOptions = {
      dateFormat: this.format,
      inline: false,
      height: '1.8rem',
      selectionTxtFontSize: '0.9rem',
      showClearDateBtn: false,
    };
  }

  onDataChanged(event: IMyDateModel) {
    this.blur.emit(event.formatted);
  }
  


  getFieldValue(){
    return this.getFieldInfo();
  }
  

  async validateValue(value): Promise<number> {
    var totalErrors: number = 0;

    if (value.length == 10 && this.parseDate(value)) {
      this.maxlength = 10;
    } else {
      this.setError('INVALID_DATE');
      totalErrors++;
    }

    return totalErrors;
  }


  setFocus(value: boolean) {
    value ? this.field.setFocusToInputBox() : this.onBlur();
  }

  onInputFocusBlur(event: IMyInputFocusBlur): void {
    (event.reason == 2) ? this.blur.emit(event.value) : this.onFocus();
  }

  onReset() {
    this.value = undefined;
    this.field.updateDateValue({ year: 0, month: 0, day: 0 });
    this.additionalInfo = undefined;
    this.error = false;
    this.errorCode = undefined;
    this.dependencyMap.clear();
    this.fieldReset();
  }

  getFieldInfo() {
    if (this.value) {
      if(this.value.formatted){
        return this.value.formatted;
      }
      let format = this.format.toUpperCase();
      let saperator;
      let splits;
      let dateString = '';
      if (format.includes('/')) {
        saperator = '/';
        splits = format.split('/');
      } else if (format.includes('-')) {
        saperator = '-';
        splits = format.split('-');
      } else if (format.includes('.')) {
        saperator = '.';
        splits = format.split('.');
      }
      for (var i = 0; i < 3; i++) {
        if (splits[i] == 'YYYY') {
          dateString += this.value.date.year;
        } else if (splits[i] == 'MM') {
          if(this.value.date.month < 10){
            dateString += '0';
          }
          dateString += this.value.date.month;
        } else {
          if(this.value.date.day < 10){
            dateString += '0';
          }
          dateString += this.value.date.day;
        }
        if (i < 2) {
          dateString += saperator;
        }
      }
      this.value.formatted = dateString;
      return dateString;
    }
    return "";
  }

  setValue(value, additionalInfo = undefined) {

    this.value = undefined;
    let date;
    if (typeof value === 'string' && value.length == 10) {
      date = this.parseDate(value);
    } else if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
      date = value;
    }else {
      var consoleErrorMsg = this.fieldID + ".setValue()" + ": Ivalid Input Value"
      + "\nInput Value: "+ JSON.stringify(value);
      console.error(consoleErrorMsg);
      this.onReset();
    }

    if (date) {
      this.value = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
      this.maxlength = 10;
    }

    

    this.passNewValue(this.value==undefined?undefined:this.getFieldInfo());
  }

  /*parseDate(input, format) {
    format = format || 'yyyy-mm-dd'; // default format
    var parts = input.match(/(\d+)/g), 
        i = 0, fmt = {};
    // extract date-part indexes from the format
    format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });
  
    return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
  }*/

  parseDate(value) {
    let year;
    let month;
    let day;
    if (this.format) {
      let format = this.format.toUpperCase();
      let splits;
      let valArray;
      if (format.includes('/')) {
        splits = format.split('/');
        valArray = value.split('/');
      } else if (format.includes('-')) {
        splits = format.split('-');
        valArray = value.split('-');
      } else if (format.includes('.')) {
        splits = format.split('.');
        valArray = value.split('.');
      }

      for (var i = 0; i < 3; i++) {
        if (splits[i] == 'YYYY') {
          year = valArray[i];
        } else if (splits[i] == 'MM') {
          month = valArray[i];
        } else {
          day = valArray[i];
        }
      }

      let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

      if ((date.getFullYear() == (+year)) && (date.getMonth() == ((+month) - 1)) && (date.getDate() == (+day))) {
        return date;
      }else{
        var consoleErrorMsg = this.fieldID + ".parseDate() : Invalid Value\nDate Format : "
        +this.format+"\nInput Value : "+value;
        console.error(consoleErrorMsg);
      }

      return undefined;
    }
  }

}
