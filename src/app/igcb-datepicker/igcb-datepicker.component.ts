/*
 * Attributes available to use
 * [(ngModel)] = To Bind with the model name of the component
 * [minDate] = To set minimum selection date - Data Type: Object, 
 * Accepted Format: 	{year: 2017, month: 1, day: 1};
 * [maxDate] = To set maximum selection date - Data Type: Object, 
 * Accepted Format: 	{year: 2017, month: 1, day: 1};
 */
import { DatePipe, FormStyle, getLocaleDayNames, getLocaleFirstDayOfWeek, getLocaleMonthNames, TranslationWidth } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Injectable, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerConfig, NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { UtilityService } from '../services/utility.service';
// import { Tenant } from '../form-common/tenant.model';

export function createCustomInputControlValueAccessor(extendedInputComponent: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => extendedInputComponent),
        multi: true
    };
}

/**
* This class will extend the superclass NgbDatepickerI18n and override its default methods
* with the translated data.
* The firstDayOfWeek will be set in the appmodule globally, so that it can be used everywhere.
*/
@Injectable()
export class IGCBDatepickerI18n extends NgbDatepickerI18n {

    // constructor(private tenant: Tenant) {
    constructor() {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        //let dateFormat = getLocaleDayNames(this.tenant.defaultLanguage, FormStyle.Standalone, TranslationWidth.Narrow);
        let dateFormat = getLocaleDayNames('en-IN', FormStyle.Standalone, TranslationWidth.Narrow);
        return dateFormat[weekday - 1];
    }
    getMonthShortName(month: number): string {
        //let monthNames = getLocaleMonthNames(this.tenant.defaultLanguage, FormStyle.Standalone, TranslationWidth.Wide);
        let monthNames = getLocaleMonthNames('en-IN', FormStyle.Standalone, TranslationWidth.Wide);
        return monthNames[month - 1];
    }

    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}

@Component({
    selector: 'igcb-datepicker',
    template: `
    <div class="igcb-datepicker input-group">
    <input tabindex="-1" autocomplete="off" type="text" [container]="body" [minDate]="minDate" [maxDate]="maxDate" [(ngModel)]="hiddenValue" name="hiddenDatepicker" #d="ngbDatepicker" ngbDatepicker (dateSelect)="onDateSelect($event)" style="position: absolute;left: 0;width: 100%;height: 100%;opacity: 0;" (ngModelChange)="modelChangeEvent(value)">
    <input class="form-control" autocomplete="off" type="text" (blur)="myBlurEvent($event)" [(ngModel)]="innerValue" #input name="datepicker" (ngModelChange)="changeHiddenValue($event)" />
    <span class="input-group-addon" (click)="d.toggle()">
    <span class="glyphicon glyphicon-calendar"></span>                 
    </span>
    </div>
  `,
    styleUrls: [],
    providers: [createCustomInputControlValueAccessor(IGCBDatepickerComponent),
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    { provide: NgbDatepickerI18n, useClass: IGCBDatepickerI18n }, DatePipe]
})
export class IGCBDatepickerComponent implements ControlValueAccessor, OnInit {
    @ViewChild(NgModel, {static: true}) innerNgModel: NgModel;
    @ViewChild('input', {static: true}) inputRef: ElementRef;
    @ViewChild('d', {static: true}) datepickerDayView: any;
    body: any = "body";
    @Output() blur: EventEmitter<Event> = new EventEmitter<Event>();
    // The internal data model
    public innerValue: any = '';
    @Output("ngModel") ngModel: any;
    @Input() minDate: IGCBMinMaxDateModel;
    @Input() maxDate: IGCBMinMaxDateModel;

    public hiddenValue: Date;
    public parentModel: NgModel;
    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onChangeCallback: any;
    private dateFormat = "yyyy-MM-dd";
    momentDate: any;
    allowedDateFormats: any;

    // @CLO-RLO-Merge - 
    // constructor(private tenant: Tenant, private injector: Injector, private datePipe: DatePipe, private dpConfig: NgbDatepickerConfig, private utility: UtilityService) {
    constructor(private injector: Injector, private datePipe: DatePipe, private dpConfig: NgbDatepickerConfig) {

    }

    set value(v: any) {
        if (this.innerValue != v) {
            this.innerValue = v;
            this.onChangeCallback(this.innerValue);
        }
    }
    changeHiddenValue(value) {
        if (!this.innerValue) {
            this.innerNgModel.control.setValue('');
        } else if (this.dateFormat.length == this.innerValue.length) {
            let momentDate = window["moment"](this.innerValue.toUpperCase(), this.dateFormat.toUpperCase(), true);
            if (momentDate.isValid()) {
                this.hiddenValue = momentDate.format();
                this.innerNgModel.control.setValue(this.hiddenValue);
            } else {
                this.innerNgModel.control.setValue(this.innerValue);
            }
        } else {
            this.innerNgModel.control.setValue(this.innerValue);
        }
        /*const dateTrans = this.datePipe.transform(this.hiddenValue, this.dateFormat);
        if (dateTrans) {
            this.innerValue = dateTrans;
            // update the form
            this.onChangeCallback(dateTrans);
        }*/
    }
    // implements ControlValueAccessor interface
    writeValue(value: any) {
        if (!value) {
            this.innerValue = '';
            if (this.inputRef && this.inputRef.nativeElement)
                this.inputRef.nativeElement.value = "";
        }
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    // implements ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // implements ControlValueAccessor interface - not used, used for touch input
    registerOnTouched() { }

    // change events from the textarea
    private onChange() {
        const input = <HTMLInputElement>this.inputRef.nativeElement;
        // get value from text area
        const newValue = input.value;

        // update the form
        this.onChangeCallback(newValue);
    }
    ngOnInit() {
        const inputElement = <HTMLInputElement>this.inputRef.nativeElement;
        const dateFormatKey = "dateFormat";
        const parentElement = inputElement.parentElement.parentElement;
        if (parentElement.hasAttribute(dateFormatKey)) {
            this.dateFormat = parentElement.getAttribute(dateFormatKey);
        }
        if (parentElement.hasAttribute("placeholder")) {
            inputElement.placeholder = parentElement.getAttribute("placeholder");
        } else {
            inputElement.placeholder = "";
        }
        const model: NgModel = this.injector.get(NgControl);
        model.valueAccessor = this.innerNgModel.valueAccessor;
        const control: FormControl = model.control;
        this.innerNgModel = model;
        this.parentModel = model;
        if (!this.minDate) {
            this.minDate = new IGCBMinMaxOffsetModel(new Date("January 01, 1900"), 0);
        }
        // @CLO-RLO-Merge - Date format based on tenant
        //this.dpConfig.firstDayOfWeek = getLocaleFirstDayOfWeek(this.tenant.defaultLanguage) + 1;
        this.dpConfig.firstDayOfWeek = getLocaleFirstDayOfWeek('en-IN') + 1;
        this.allowedDateFormats = [this.dateFormat, "YYYY-MM-DDTHH:mm:ss.SSSSZ", "YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DD HH:mm:SS.s", "YYYYMMDD", "DDMMYYYY"];
        control.valueChanges.subscribe(newValue => {
            this.momentDate = null;
            if (newValue) {
                let date = window["moment"](newValue, this.allowedDateFormats, true);
                this.momentDate = date;
                if (date.isValid()) {
                    //console.log(this.datepickerDayView);
                    /*let minTime = 0;
                    let maxTime = 0;
                    if (this.minDate) {
                        minTime = this.minDate.getDate().getTime();
                    }
                    if (this.maxDate) {
                        maxTime = this.maxDate.getDate().getTime();
                    }
                    let selTime = date._d.getTime();
                    let dateMatchesMinMax = (!minTime || (selTime >= minTime)) && (!maxTime || (selTime <= maxTime));
                    if (dateMatchesMinMax) {
                        const dateTrans = this.datePipe.transform(date._d, this.dateFormat);
                        this.innerValue = dateTrans;
                    } else {
                        let tooltiperror = new ToolTipError();
                        tooltiperror.tooltiperrorshow('hiddenValue', 'Invalid date');
                        this.innerValue = '';
                    }*/
                    // @CLO-RLO-Merge - 
                    // const dateTrans = this.datePipe.transform(date._d, this.tenant.dateFormat, this.tenant.timeZone, this.tenant.defaultLanguage);
                    const dateTrans = this.datePipe.transform(date._d, 'DDMMMYYYY', '0530', 'en-IN');
                    this.innerValue = dateTrans;
                    this.hiddenValue = date._d;
                } else {
                    this.innerValue = newValue;
                }
            } else {
                this.innerValue = newValue;
            }
            //inputElement.focus();
        });
        /*
        inputElement.onchange = () => this.onChange();
        inputElement.onkeyup = () => this.onChange();
        const dateFormatKey = "dateFormat";
        const parentElement = inputElement.parentElement.parentElement;
        const reflectModelKey = "ng-reflect-model";
        if (parentElement.hasAttribute(reflectModelKey)) {
            this.hiddenValue = new Date(parentElement.getAttribute(reflectModelKey));
            this.changeHiddenValue();
        }
        if (parentElement.hasAttribute(dateFormatKey)) {
            this.dateFormat = parentElement.getAttribute(dateFormatKey);
        }*/
    }

    myBlurEvent(event) {
        if (this.momentDate && this.momentDate.isValid()) {
            this.parentModel.control.setValue(this.hiddenValue);
        }
        this.blur.emit(event);
    }

    modelChangeEvent(value) {
        if (this.hiddenValue && this.hiddenValue instanceof Date) {
            // @CLO-RLO-Merge - 
            // const dateTrans = this.utility.getDatePipe().transform(this.hiddenValue, this.dateFormat);
            // this.innerValue = dateTrans;
            // this.parentModel.control.setValue(this.hiddenValue);
        }
    }

    onDateSelect(event) {
        this.inputRef.nativeElement.focus();
    }

    public static validateDate(date: Date, minDate: IGCBMinMaxDateModel, maxDate: IGCBMinMaxDateModel): boolean {
        if (date && !(date instanceof Date)) {
            let momentDate = window["moment"](date, ["DD-MMM-YYYY", "YYYY-MM-DD HH:mm:ss.S", "YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DD HH:mm:SS.s", "YYYYMMDD", "DDMMYYYY"], true);
            if (momentDate.isValid()) {
                date = momentDate._d;
            } else {
                return false;
            }
        }
        if (!date || !(date instanceof Date)) return false;
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        let minTime = 0;
        let maxTime = 0;
        if (minDate) {
            minTime = minDate.getDate().getTime();
        } else {
            minTime = new Date("January 01, 1900").getTime();
        }
        if (maxDate) {
            maxTime = maxDate.getDate().getTime();
        }
        let selTime = date.getTime();
        let dateMatchesMinMax = (!minTime || (selTime >= minTime)) && (!maxTime || (selTime <= maxTime));
        if (dateMatchesMinMax) {
            return true;
        }
        return false;
    }
}

export class IGCBMinMaxDateModel {
    year: number;
    month: number;
    day: number;

    constructor(d: number, m: number, y: number) {
        this.year = y;
        this.month = m;
        this.day = d;
    }

    getDate() : Date {
        let date = new Date(this.year, this.month - 1, this.day);
        return date;
    }
}

export class IGCBMinMaxOffsetModel extends IGCBMinMaxDateModel {

    constructor(date: Date, dateOffset: number) {
        let inputDate = date;
	    let outputDate = new Date(inputDate.getTime() + ((1000*60*60*24)*(dateOffset)));
        super(outputDate.getDate(), outputDate.getMonth() + 1, outputDate.getFullYear());
    }
}
