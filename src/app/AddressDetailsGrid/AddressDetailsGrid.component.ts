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
	selector: 'app-AddressDetailsGrid',
	templateUrl: './AddressDetailsGrid.component.html',
	animations: [
		trigger('slideInOut', [
			state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
			state('true', style({ height: '*', 'padding-top': '1rem' })),
			transition('true => false', animate('300ms ease-out')),
			transition('false => true', animate('300ms ease-in'))
		])
	],
})
export class AddressDetailsGridComponent implements AfterViewInit {
	addressRecord: boolean = false;
	constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
	@ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;
	@Output() emitAddressDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() addonblur: EventEmitter<any> = new EventEmitter<any>();
  @Output() addressLoaded: EventEmitter<any> = new EventEmitter<any>();
	@Input('formCode') formCode: string;
	@Input('displayTitle') displayTitle: boolean = true;
	@Input('displayToolbar') displayToolbar: boolean = true;
	@Input('fieldID') fieldID: string;
	addressDetails = [];
	componentCode: string = 'AddressDetailsGrid';
	openedFilterForm: string = '';
	hidden: boolean = false;
	gridConsts: any = {
		paginationPageSize: 10,
		gridCode: "AddressDetailsGrid",
		paginationReq: true
	};
	columnDefs: any[] = [{
		field: "AD_Address_Type",
		width: 10,
		sortable: true,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		filter: "agTextColumnFilter",
		filterParams: {
			suppressAndOrCondition: true,
			applyButton: true,
			clearButton: true,
			filterOptions: ["contains"],
			caseSensitive: true,
		},
	},
	{
		field: "AD_Address",
		width: 33,
		sortable: true,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		filter: "agTextColumnFilter",
		filterParams: {
			suppressAndOrCondition: true,
			applyButton: true,
			clearButton: true,
			filterOptions: ["contains"],
			caseSensitive: true,
		},
	},
	{
		field: "AD_OCC_STATUS",
		width: 15,
		sortable: true,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		filter: "agTextColumnFilter",
		filterParams: {
			suppressAndOrCondition: true,
			applyButton: true,
			clearButton: true,
			filterOptions: ["contains"],
			caseSensitive: true,
		},
	},
	{
		field: "AD_CORR_ADD",
		width: 15,
		sortable: true,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		filter: "agTextColumnFilter",
		filterParams: {
			suppressAndOrCondition: true,
			applyButton: true,
			clearButton: true,
			filterOptions: ["contains"],
			caseSensitive: true,
		},
	},
	{
		field: "AD_Residence_Duration",
		width: 15,
		sortable: true,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		filter: "agTextColumnFilter",
		filterParams: {
			suppressAndOrCondition: true,
			applyButton: true,
			clearButton: true,
			filterOptions: ["contains"],
			caseSensitive: true,
		},
	},
	{
		width: 6,
		field: "AD_EDIT_BTN",
		sortable: false,
		filter: false,
		resizable: true,
		cellRenderer: 'buttonRenderer',
		cellStyle: { 'text-align': 'left' },
		cellRendererParams: {
			gridCode: 'AddressDetailsGrid',
			columnId: 'AD_EDIT_BTN',
			Type: '1',
			CustomClass: 'btn-edit',
			// IconClass: 'fas fa-edit fa-lg',
			onClick: this.AD_EDIT_BTN_click.bind(this)
		},
	},
	{
		width: 6,
		field: "AD_DELETE_BTN",
		sortable: false,
		filter: false,
		resizable: true,
		cellRenderer: 'buttonRenderer',
		cellStyle: { 'text-align': 'left' },
		cellRendererParams: {
			gridCode: 'AddressDetailsGrid',
			columnId: 'AD_DELETE_BTN',
			Type: '1',
			CustomClass: 'btn-delete',
			// IconClass: 'fa fa-trash fa-lg',
			onClick: this.AD_DELETE_BTN_click.bind(this)
		},
	},
	];
	private unsubscribe$: Subject<any> = new Subject<any>();
	ngAfterViewInit() {
		this.services.translate.onLangChange
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((event: LangChangeEvent) => {
				var colDefClone = [];
				for (var i = 0; i < this.columnDefs.length; i++) {
					colDefClone[i] = Object.assign({}, this.columnDefs[i]);
				}
				this.readonlyGrid.loadColums(colDefClone);
			});
	}
	onGridSizeChanged() {
		var colDefClone = [];
		for (var i = 0; i < this.columnDefs.length; i++) {
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
		styleElement.id = 'AddressDetailsGrid_customCss';
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		var styleElement = document.getElementById('AddressDetailsGrid_customCss');
		styleElement.parentNode.removeChild(styleElement);
	}
	gridDataLoad(formInputs) {
		this.readonlyGrid.setFormInputs(formInputs);
	}
	refreshGrid() {
		this.readonlyGrid.refreshGrid();
	}
	setHidden(value: boolean) {
		this.hidden = value;
	}
	isHidden() {
		return this.hidden;
	}
	async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
		this.showSpinner()
		let inputMap = new Map();
		inputMap.clear();
		let borrowerSeq: any = event.passBorrowerSeqToGrid;
		let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
		if (borrowerSeq) {
			criteriaJson.FilterCriteria.push({
				"columnName": "BorrowerSeq",
				"columnType": "String",
				"conditions": {
					"searchType": "equals",
					"searchText": borrowerSeq
				}
			});
		}
		inputMap.set('QueryParam.criteriaDetails', criteriaJson);
		if (gridReqMap.get("FilterCriteria")) {
			var obj = gridReqMap.get("FilterCriteria");
			for (var i = 0; i < obj.length; i++) {
				switch (obj[i].columnName) {
					case "AD_ADD_ID": obj[i].columnName = "AddressDetailsSeq"; break;
					case "AD_Address_Type": obj[i].columnName = "AddressType"; break;
					case "AD_Address": obj[i].columnName = "AddressLine1"; break;
					case "AD_Residence_Duration": obj[i].columnName = "PeriodCurrentResidenceYrs"; break;
					// case "MailingAddress":obj[i].columnName =  "MailingAddress";break;
					case "AD_OCC_STATUS": obj[i].columnName = "ResidenceType"; break;
					case "AD_CORR_ADD": obj[i].columnName = "MailingAddress"; break;
					case "AD_OCCUP_TYPE": obj[i].columnName = "OccupancyType"; break;
					default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
				}
			}
		}
		if (gridReqMap.get("OrderCriteria")) {
			var obj = gridReqMap.get("OrderCriteria");
			for (var i = 0; i < obj.length; i++) {
				switch (obj[i].columnName) {
					case "AD_ADD_ID": obj[i].columnName = "AddressDetailsSeq"; break;
					case "AD_Address_Type": obj[i].columnName = "AddressType"; break;
					case "AD_Address": obj[i].columnName = "AddressLine1"; break;
					case "AD_Residence_Duration": obj[i].columnName = "PeriodCurrentResidenceYrs"; break;
					// case "MailingAddress":obj[i].columnName =  "MailingAddress";break;
					case "AD_OCC_STATUS": obj[i].columnName = "ResidenceType"; break;
					case "AD_OCCUP_TYPE": obj[i].columnName = "OccupancyType"; break;
					default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
				}
			}
		}
		this.readonlyGrid.combineMaps(gridReqMap, inputMap);

		this.services.http.fetchApi('/AddressDetails', 'GET', inputMap, '/initiation').subscribe(
			async (httpResponse: HttpResponse<any>) => {
				var res = httpResponse.body;
				this.addressDetails = [];
				if (res !== null) {
					this.addressRecord = true
					var loopVar10 = res['AddressDetails'];
				}
				else {
					this.addressRecord = false;
        }
        

				if (loopVar10) {
          this.addressLoaded.emit({
            "name" : "addressLoad",
            "data": loopVar10
          });

					for (var i = 0; i < loopVar10.length; i++) {
						var tempObj = {};
						tempObj['AD_ADD_ID'] = loopVar10[i].AddressDetailsSeq;
						tempObj['AD_Address_Type'] = loopVar10[i].AddressType;
						if (loopVar10[i].AddressLine2 == undefined && loopVar10[i].AddressLine3 == undefined && loopVar10[i].AddressLine4 == undefined) {
							tempObj['AD_Address'] = loopVar10[i].AddressLine1 + "," + " " + " " + loopVar10[i].Region + "," + " " + " " + loopVar10[i].City + "," + " " + " " + loopVar10[i].State + "," + " " + " " + loopVar10[i].PinCode;
						}
						else if (loopVar10[i].AddressLine3 == undefined && loopVar10[i].AddressLine4 == undefined) {
							tempObj['AD_Address'] = loopVar10[i].AddressLine1 + "," + " " + " " + loopVar10[i].AddressLine2 + "," + " " + " " + loopVar10[i].Region + "," + " " + " " + loopVar10[i].City + "," + " " + " " + loopVar10[i].State + "," + " " + " " + loopVar10[i].PinCode;
						}
						else if (loopVar10[i].AddressLine4 == undefined) {
							tempObj['AD_Address'] = loopVar10[i].AddressLine1 + "," + " " + " " + loopVar10[i].AddressLine2 + "," + " " + " " + loopVar10[i].AddressLine3 + "," + " " + " " + loopVar10[i].Region + "," + " " + " " + loopVar10[i].City + "," + " " + " " + loopVar10[i].State + "," + " " + " " + loopVar10[i].PinCode;
						}
						else {
							tempObj['AD_Address'] = loopVar10[i].AddressLine1 + "," + " " + " " + loopVar10[i].AddressLine2 + "," + " " + " " + loopVar10[i].AddressLine3 + "," + " " + " " + loopVar10[i].AddressLine4 + "," + " " + " " + loopVar10[i].Region + "," + " " + " " + loopVar10[i].City + "," + " " + " " + loopVar10[i].State + "," + " " + " " + loopVar10[i].PinCode;
						}
						if (loopVar10[i].ResidenceDuration == undefined && loopVar10[i].Period == undefined) {
							tempObj['AD_Residence_Duration'] = " ";
						}// tempObj['AD_MAILING_ADDRESS'] = loopVar10[i].MailingAddress;
						else {
							tempObj['AD_Residence_Duration'] = loopVar10[i].ResidenceDuration + " " + " " + " " + loopVar10[i].Period;
						}
						if (loopVar10[i].ResidenceType == undefined) {
							tempObj['AD_OCC_STATUS'] = " "
						}
						else {
							tempObj['AD_OCC_STATUS'] = loopVar10[i].ResidenceType;
						}
						tempObj['AD_CORR_ADD'] = loopVar10[i].MailingAddress;
						tempObj['AD_OCCUP_TYPE'] = loopVar10[i].OccupancyType;
						this.addressDetails.push(tempObj);
					}
				}
				this.readonlyGrid.apiSuccessCallback(params, this.addressDetails);
				this.hideSpinner();
			},
			async (httpError) => {
				var err = httpError['error']
				if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
					this.hideSpinner();
				}
			}
		);

	}
	async AD_EDIT_BTN_click(event) {
		let inputMap = new Map();
		const selectedData0 = this.readonlyGrid.getSelectedData();
		if (selectedData0) {
			this.emitAddressDetails.emit({
				'addSeq': selectedData0['AD_ADD_ID'],
			});
		}
	}
	async AD_DELETE_BTN_click(event) {
		let inputMap = new Map();
		inputMap.clear();
		inputMap.set('PathParam.AddressDetailsSeq', event.AD_ADD_ID);
		this.services.http.fetchApi('/AddressDetails/{AddressDetailsSeq}', 'DELETE', inputMap, '/initiation').subscribe(
			async (httpResponse: HttpResponse<any>) => {
				var res = httpResponse.body;
				this.services.alert.showAlert(1, 'rlo.success.delete.address', 5000);
				this.readonlyGrid.refreshGrid();

			},
			async (httpError) => {
				var err = httpError['error']
				if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
				}
				this.services.alert.showAlert(2, 'rlo.error.wrong.form', -1);
			}
		);

	}
	loadSpinner = false;
	showSpinner() {
		this.loadSpinner = true;
	}
	hideSpinner() {
		this.loadSpinner = false;
	}
	getAddressGridData() {
		//  this.addressDetails.push();
		return this.addressDetails;
	}

}
