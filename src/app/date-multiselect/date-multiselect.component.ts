import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { IMyDate } from 'mydatepicker';
import { ISelectedDateRange } from '../Interface/masterInterface';

@Component({
  selector: 'app-date-multiselect',
  templateUrl: './date-multiselect.component.html',
  styleUrls: ['./date-multiselect.component.css']
})
export class DateMultiselectComponent implements OnInit {

  @Input('format') format: string = 'dd-mm-yyyy';
  @Output() passSelectedDate: EventEmitter<any> = new EventEmitter<any>();

  date = new Date();
  futureDate = new Date(this.date);

  selectedDateObj: ISelectedDateRange;

  disableDates: IMyDate;

  myDateRangePickerOptions: IMyDrpOptions;

  constructor() {
    this.futureDate.setDate(this.futureDate.getDate() + 1);
    this.disableDates = {
      year: this.futureDate.getFullYear(), month: this.futureDate.getMonth() + 1, day: this.futureDate.getDate()
    }

    this.myDateRangePickerOptions = {
      dateFormat: this.format,
      showClearBtn: false,
      showApplyBtn: false,
      showClearDateRangeBtn: false,
      inline: false,
      height: '1.8rem',
      width: '0',
      selectionTxtFontSize: '0.9rem',
      disableSince: this.disableDates
    };
  }

  ngOnInit() {
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    // event properties are: event.beginDate, event.endDate, event.formatted,
    // event.beginEpoc and event.endEpoc
    console.log(event);
    this.selectedDateObj = {
      startDate: event.beginJsDate,
      endDate: event.endJsDate
    }

    this.passSelectedDate.emit(this.selectedDateObj);
  }

}
