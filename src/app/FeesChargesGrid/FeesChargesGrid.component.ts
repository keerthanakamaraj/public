import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
const customCss: string = '';
@Component({
selector: 'app-FeesChargesGrid',
templateUrl: './FeesChargesGrid.component.html',
animations: [
trigger('slideInOut', [
state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
state('true', style({ height: '*', 'padding-top': '1rem' })),
transition('true => false', animate('300ms ease-out')),
transition('false => true', animate('300ms ease-in'))
])
],
})
export class FeesChargesGridComponent implements AfterViewInit {
    FeeChargeDetails: any[];
    feeChargeDetails: any[];
    feeChargeRecord: boolean;
constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) {}
@ViewChild('readonlyGrid', {static: true}) readonlyGrid: ReadonlyGridComponent;

@Input('formCode') formCode: string;
@Input('displayTitle') displayTitle: boolean = true;
@Input('displayToolbar') displayToolbar: boolean = true;
@Input('fieldID') fieldID: string;
@Output() EditFeeChargesDetails: EventEmitter<any> = new EventEmitter<any>();

componentCode: string = 'FeesChargesGrid';
openedFilterForm:string = '';
hidden:boolean = false;
gridConsts: any = {
paginationPageSize: 10,
gridCode: "FeesChargesGrid",
paginationReq:false
};
columnDefs:any[] = [{
field:"FC_Charge_Desc",
width:10,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Party_Name",
width:10,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Charge_Type",
width:10,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Rate",
width:7,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Amount",
width:10,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Effective_Amt",
width:15,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Frequency",
width:10,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Rate_Charge_On",
width:15,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
field:"FC_Charge_Collection",
width:15,
resizable: true,
cellStyle: {'text-align': 'left'},
filter: false,
},
{
width:6,
field:"FC_Edit",
sortable: false,
filter: false,
resizable: true,
cellRenderer: 'buttonRenderer',
cellStyle: {'text-align': 'center'},
cellRendererParams: {
gridCode: 'FeesChargesGrid',
columnId: 'FC_Edit',
Type: '1',
CustomClass: 'btn-edit',
onClick: this.FC_EDIT_click.bind(this),
},
},
{
width:6,
field:"FC_Delete",
sortable: false,
filter: false,
cellRenderer: 'buttonRenderer',
cellStyle: {'text-align': 'center'},
cellRendererParams: {
gridCode: 'FeesChargesGrid',
columnId: 'FC_Delete',
Type: '1',
CustomClass: 'btn-delete',
onClick: this.FC_DELETE_click.bind(this),
},
},
];
private unsubscribe$: Subject<any> = new Subject<any>();
ngAfterViewInit() {
this.services.translate.onLangChange
.pipe(takeUntil(this.unsubscribe$))
.subscribe((event: LangChangeEvent) => {
var colDefClone = [];
for(var i=0;i<this.columnDefs.length;i++){
colDefClone[i] = Object.assign({}, this.columnDefs[i]);
}
this.readonlyGrid.loadColums(colDefClone);
});
}
onGridSizeChanged(){
var colDefClone = [];
for(var i=0;i<this.columnDefs.length;i++){
colDefClone[i] = Object.assign({}, this.columnDefs[i]);
}
this.readonlyGrid.loadColums(colDefClone);
this.readonlyGrid.columnsInitialized.next();
this.readonlyGrid.columnsInitialized.complete();
}
setColumnHidden(columnId: string, hidden: boolean) {
Promise.all([this.readonlyGrid.gridLoadComplete.toPromise(), this.readonlyGrid.columnsInitialized.toPromise()])
.then(() => { this.readonlyGrid.gridColumnApi.setColumnVisible(columnId, !hidden); });
}
isColumnHidden(columnId) {
return !this.readonlyGrid.gridColumnApi.getColumn(columnId).isVisible();
}
ngOnInit(): void {
	this.readonlyGrid.setGridDataAPI(this.gridDataAPI.bind(this));
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML = customCss;
styleElement.id = 'FeesChargesGrid_customCss';
document.getElementsByTagName('head')[0].appendChild(styleElement);
}
ngOnDestroy(){
this.unsubscribe$.next();
this.unsubscribe$.complete();
var styleElement = document.getElementById('FeesChargesGrid_customCss');
styleElement.parentNode.removeChild(styleElement);
}
gridDataLoad(formInputs) {
    this.readonlyGrid.setFormInputs(formInputs);
}
refreshGrid() {
    this.readonlyGrid.refreshGrid();
}
setValue(rowData) {
this.readonlyGrid.setRowData(rowData);
}
setHidden(value: boolean){
this.hidden = value;
}
isHidden(){
return this.hidden;
}
loadSpinner=false;
showSpinner(){
this.loadSpinner=true;
}
hideSpinner(){
this.loadSpinner=false;
}
async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
    let inputMap = new Map();
    inputMap.clear();
    let ApplicationId: any = event.passFeeChargeGrid;
    let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
    if (ApplicationId) {
        criteriaJson.FilterCriteria.push({
            "columnName": "ApplicationId",
            "columnType": "String",
            "conditions": {
                "searchType": "equals",
                "searchText": ApplicationId
            }
        });
    }
    inputMap.set('QueryParam.criteriaDetails', criteriaJson);
    if (gridReqMap.get("FilterCriteria")) {
        var obj = gridReqMap.get("FilterCriteria");
        for (var i = 0; i < obj.length; i++) {
            switch (obj[i].columnName) {
                case "FC_Charge_Desc": obj[i].columnName = "ChargeDescription"; break;
                case "FC_Party_Name": obj[i].columnName = "PartyName"; break;
                case "FC_Charge_Type": obj[i].columnName = "ChargeType"; break;
                case "FC_Rate": obj[i].columnName = "ChargeRate"; break;
                case "FC_Amount": obj[i].columnName = "LocalAmount"; break;
                case "FC_Effective_Amt": obj[i].columnName = "EffectiveAmount"; break;
                case "FC_Frequency": obj[i].columnName = "Frequency"; break; 
                case "FC_Rate_Charge_On": obj[i].columnName = "RateOnCharge"; break;
                case "FC_Charge_Collection": obj[i].columnName = "ChargeCollection"; break; 
                default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
            }
        }
    }
    if (gridReqMap.get("OrderCriteria")) {
        var obj = gridReqMap.get("OrderCriteria");
        for (var i = 0; i < obj.length; i++) {
            switch (obj[i].columnName) {
                case "FC_Charge_Desc": obj[i].columnName = "ChargeDescription"; break;
                case "FC_Party_Name": obj[i].columnName = "PartyName"; break;
                case "FC_Charge_Type": obj[i].columnName = "ChargeType"; break;
                case "FC_Rate": obj[i].columnName = "ChargeRate"; break;
                case "FC_Amount": obj[i].columnName = "LocalAmount"; break;
                case "FC_Effective_Amt": obj[i].columnName = "EffectiveAmount"; break;
                case "FC_Frequency": obj[i].columnName = "Frequency"; break; 
                case "FC_Rate_Charge_On": obj[i].columnName = "RateOnCharge"; break;
                case "FC_Charge_Collection": obj[i].columnName = "ChargeCollection"; break; 
                default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
            }
        }
    }

    this.readonlyGrid.combineMaps(gridReqMap, inputMap);
    this.services.http.fetchApi('/ChargeDetails', 'GET', inputMap, '/rlo-de').subscribe(
        async (httpResponse: HttpResponse<any>) => {
            var res = httpResponse.body;
           
            this.feeChargeDetails = [];     

                if (res !== null) {
                    this.feeChargeRecord = true
                    var loopVar9 = res['ChargeDetails'];
                } else {
                    this.feeChargeRecord = false;
                   
                }

                if (loopVar9) {
                    for (var i = 0; i < loopVar9.length; i++) {
                        var tempObj = {};
                        tempObj['FC_ID'] = loopVar9[i].ChargeDtlSeq;
                        tempObj['FC_Charge_Desc'] = loopVar9[i].ChargeDescription;
                        tempObj['FC_Party_Name'] = loopVar9[i].PartyName;
                        tempObj['FC_Charge_Type'] = loopVar9[i].ChargeType;
                        tempObj['FC_Rate'] = loopVar9[i].ChargeRate;
                        tempObj['FC_Amount'] = loopVar9[i].LocalAmount;
                        tempObj['FC_Effective_Amt'] = loopVar9[i].EffectiveAmount;
                        tempObj['FC_Frequency'] = loopVar9[i].Frequency;
                        tempObj['FC_Rate_Charge_On'] = loopVar9[i].RateOnCharge;
                        tempObj['FC_Charge_Collection'] = loopVar9[i].ChargeCollection;
                       
                        this.feeChargeDetails.push(tempObj);
                    }
                }
                this.readonlyGrid.apiSuccessCallback(params, this.feeChargeDetails);
        },
        async (httpError) => {
            var err = httpError['error']
            if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
            }
            this.services.alert.showAlert(2, '', -1, 'Failed to load grid!');
        }
    );
}
async FC_EDIT_click(event) {
    let inputMap = new Map();
    const selectedData0 = this.readonlyGrid.getSelectedData();
    this.EditFeeChargesDetails.emit({
        'SeqKey': event['FC_ID'],
    });

}
async FC_DELETE_click(event) {
    let inputMap = new Map();
    inputMap.clear();
    inputMap.set('PathParam.ChargeDtlSeq', event.FC_ID);
    if (confirm("Are you sure you want to Delete?")) {
        this.services.http.fetchApi('/ChargeDetails/{ChargeDtlSeq}', 'DELETE', inputMap, '/rlo-de').subscribe(
            async (httpResponse: HttpResponse<any>) => {
                var res = httpResponse.body;
                this.services.alert.showAlert(1, 'rlo.success.delete.referrer', 5000);
                this.readonlyGrid.refreshGrid();
            },
            async (httpError) => {
                var err = httpError['error']
                if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
                }
                this.services.alert.showAlert(2, 'rlo.error.delete.referrer', -1);
            }
        );
    }
}

}