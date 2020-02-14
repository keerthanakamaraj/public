import { Component, OnInit, Input, ViewChildren, Output, EventEmitter, QueryList, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FreshCurrencyModel } from './FreshCurrency.model';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { DateComponent } from '../date/date.component';
import { AmountComponent } from '../amount/amount.component';
import { GridComponent } from '../grid/grid.component';
import { ServiceStock } from '../service-stock.service';
import { HiddenComponent } from '../hidden/hidden.component';
const customCss: string = '';
@Component({
    selector: 'app-FreshCurrency',
    templateUrl: './FreshCurrency.component.html'
})
export class FreshCurrencyComponent extends GridComponent implements OnInit {
    @ViewChildren('FieldId_5') FieldId_5: QueryList<ComboBoxComponent>;
    @ViewChildren('FieldId_4') FieldId_4: QueryList<TextBoxComponent>;
    @ViewChildren('FieldId_3') FieldId_3: QueryList<TextBoxComponent>;
    @ViewChildren('FieldId_6') FieldId_6: QueryList<ComboBoxComponent>;
    @ViewChildren('FieldId_7') FieldId_7: QueryList<AmountComponent>;
    @ViewChildren('FieldId_8') FieldId_8: QueryList<AmountComponent>;
    constructor(services: ServiceStock, cdRef: ChangeDetectorRef) {
        super(services, cdRef);
        this.value = new FreshCurrencyModel();
        this.componentCode = 'FreshCurrency';
        this.initRowCount = 4;
        this.uniqueColumns = [];
        this.primaryColumns = [];
    }
    ngOnInit() {
        if (this.gridType == 1) { this.initRows(); }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customCss;
        styleElement.id = 'FreshCurrency_customCss';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    ngOnDestroy() {
        for (var i = 0; i < this.unsubscribeRow$.length; i++) {
            this.unsubscribeRow$[i].next();
            this.unsubscribeRow$[i].complete();
        }
        var styleElement = document.getElementById('FreshCurrency_customCss');
        styleElement.parentNode.removeChild(styleElement);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.gridLoad();
        });
    }
    async gridLoad() {
    }
    async onRowAdd(rowNo) {
        this.FieldId_4.toArray()[rowNo].setReadOnly(true);
    }
    async onRowDelete(rowNo) {
    }
    getFieldInfo() {
        let addInfo = [];
        for (var i = 0; i < this.getRowsCount(); i++) {
            let row = {};
            row['FieldId_5_desc'] = this.FieldId_5.toArray()[i].getFieldInfo();
            row['FieldId_6_desc'] = this.FieldId_6.toArray()[i].getFieldInfo();
            row['FieldId_7_desc'] = this.FieldId_7.toArray()[i].getFieldInfo();
            row['FieldId_8_desc'] = this.FieldId_8.toArray()[i].getFieldInfo();
            addInfo.push(row);
        }
        this.additionalInfo = addInfo;
        return addInfo;
    }
    setFooterData(footerData) {
        this.value.clearFooterData();
        if (footerData) {
            this.value.footerData.FieldId_5 = footerData['FieldId_5'];
            this.value.footerData.FieldId_4 = footerData['FieldId_4'];
            this.value.footerData.FieldId_3 = footerData['FieldId_3'];
            this.value.footerData.FieldId_6 = footerData['FieldId_6'];
            this.value.footerData.FieldId_7 = footerData['FieldId_7'];
            this.value.footerData.FieldId_8 = footerData['FieldId_8'];
        }
    }
    fieldDependencies = {}

}
