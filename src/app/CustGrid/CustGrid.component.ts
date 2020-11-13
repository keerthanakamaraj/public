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
  selector: 'app-CustGrid',
  templateUrl: './CustGrid.component.html',
  animations: [
  trigger('slideInOut', [
  state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
  state('true', style({ height: '*', 'padding-top': '1rem' })),
  transition('true => false', animate('300ms ease-out')),
  transition('false => true', animate('300ms ease-in'))
  ])
  ],
})
export class CustGridComponent implements AfterViewInit {
  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) {}
  @ViewChild('readonlyGrid', {static: true}) readonlyGrid: ReadonlyGridComponent;
  
  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;
  @Input() ApplicationId: string = undefined;

  componentCode: string = 'CustGrid';
  openedFilterForm:string = '';
  hidden:boolean = false;
  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "CustGrid",
    paginationReq:false
  };
  columnDefs:any[] = [{
    field:"Cust_Type",
    width:25,
    sortable: false,
    resizable: true,
    cellStyle: {'text-align': 'left'},
  },
  {
    field:"Cust_Name",
    width:25,
    sortable: false,
    resizable: true,
    cellStyle: {'text-align': 'left'},
  },
  {
    field:"Cust_ID",
    width:25,
    sortable: true,
    resizable: true,
    cellStyle: {'text-align': 'left'},
  },
  {
    field:"Cust_DOB",
    width:25,
    sortable: true,
    resizable: true,
    cellStyle: {'text-align': 'left'},
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
    styleElement.id = 'CustGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('CustGrid_customCss');
    styleElement.parentNode.removeChild(styleElement);
  }
  gridDataLoad(formInputs) {
    this.readonlyGrid.setFormInputs(formInputs);
  }
  refreshGrid(){
    this.readonlyGrid.refreshGrid();
  }
  setHidden(value: boolean){
    this.hidden = value;
  }
  isHidden(){
    return this.hidden;
  }
  async gridDataAPI(params, gridReqMap: Map<string, any>, event){
    let inputMap = new Map();
		inputMap.clear();
		let custId:any = event.passCustGrid;
		let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
		if (custId) {
			criteriaJson.FilterCriteria.push({
				"columnName": "ApplicationId",
				"columnType": "String",
				"conditions": {
					"searchType": "equals",
					"searchText": custId
				}
      });
		}
		inputMap.set('QueryParam.criteriaDetails', criteriaJson);
    this.services.http.fetchApi('/BorrowerDetails', 'GET', inputMap, '/rlo-de').subscribe(
    async (httpResponse: HttpResponse<any>) => {
      var res = httpResponse.body;
      var loopDataVar4 = [];
      let BorrowerDetail = res['BorrowerDetails'];
      var loopVar4 = res['BorrowerDetails'];
      var loopVar4 = BorrowerDetail.filter(function (BorrowerDetail) {
        return BorrowerDetail.CustomerType !== 'R' && BorrowerDetail.CustomerType !== 'F';
      });
      console.log("BorrowerDetails", loopVar4);
      if (loopVar4) {
        for (var i = 0; i < loopVar4.length; i++) {
          var tempObj = {};
          tempObj['Cust_Name'] = loopVar4[i].FullName;
          tempObj['Cust_DOB'] = loopVar4[i].DOB;
          tempObj['Cust_ID'] = loopVar4[i].ICIFNumber; 
          tempObj['Cust_Type'] = loopVar4[i].CustomerType.label;
        loopDataVar4.push(tempObj);}
      }
      this.readonlyGrid.apiSuccessCallback(params, loopDataVar4);
    },
    async (httpError)=>{
      var err = httpError['error']
      if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
      }
      this.services.alert.showAlert(2, 'failed', -1);
    }
    );
    
  }
  loadSpinner=false;
  showSpinner(){
    this.loadSpinner=true;
  }
  hideSpinner(){
    this.loadSpinner=false;
  }
}
