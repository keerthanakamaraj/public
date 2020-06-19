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
	selector: 'app-VisitReportGrid',
	templateUrl: './VisitReportGrid.component.html',
	animations: [
		trigger('slideInOut', [
			state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
			state('true', style({ height: '*', 'padding-top': '1rem' })),
			transition('true => false', animate('300ms ease-out')),
			transition('false => true', animate('300ms ease-in'))
		])
	],
})
export class VisitReportGridComponent implements AfterViewInit {
	constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
	@ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

	@Output() modifyVisitReport: EventEmitter<any> = new EventEmitter<any>();
	@Input('formCode') formCode: string;
	@Input('displayTitle') displayTitle: boolean = true;
	@Input('displayToolbar') displayToolbar: boolean = true;
	@Input('fieldID') fieldID: string;

	VisitDtlsList=[];
	componentCode: string = 'VisitReportGrid';
	openedFilterForm: string = '';
	hidden: boolean = false;
	gridConsts: any = {
		paginationPageSize: 10,
		gridCode: "VisitReportGrid",
		paginationReq: true
	};
	columnDefs: any[] = [{
		field: "VR_Type",
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
		field: "VR_DateofVisit",
		width: 10,
		sortable: true,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		filter: "agDateColumnFilter",
		filterParams: {
			suppressAndOrCondition: true,
			applyButton: true,
			clearButton: true,
			caseSensitive: true,
			filterOptions: ["inRange"],
		},
	},
	{
		field: "VR_AddressOfVisit",
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
		field: "VR_NameOfPersonMet",
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
		field: "VR_Designation",
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
		field: "VR_PlaceOfVisit",
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
		width: 10,
		field: "Edit",
		sortable: false,
		filter: false,
		resizable: true,
		cellRenderer: 'buttonRenderer',
		cellStyle: { 'text-align': 'left' },
		cellRendererParams: {
			gridCode: 'VisitReportGrid',
			columnId: 'VR_Modify',
			Type: '2',
			CustomClass: 'btn-edit',
			IconClass: 'fa fa-edit fa-lg',
			onClick: this.VR_Modify_click.bind(this)
		},
	},
	{
		width: 10,
		field: "Delete",
		sortable: false,
		filter: false,
		resizable: true,
		cellRenderer: 'buttonRenderer',
		cellStyle: { 'text-align': 'left' },
		cellRendererParams: {
			gridCode: 'VisitReportGrid',
			columnId: 'VR_Delete',
			Type: '2',
			CustomClass: 'btn-delete',
			IconClass: 'fa fa-trash fa-lg',
			onClick: this.VR_Delete_click.bind(this)
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
		styleElement.id = 'VisitReportGrid_customCss';
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		var styleElement = document.getElementById('VisitReportGrid_customCss');
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
	// async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
	// 	let inputMap = new Map();
	// 	inputMap.clear();
	// 	let VisitReportId: any = event.VisitReportSeqToGrid;
	// 	let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
	// 	if (VisitReportId) {
	// 		criteriaJson.FilterCriteria.push({
	// 			"columnName": "ApplicationId",
	// 			"columnType": "String",
	// 			"conditions": {
	// 				"searchType": "equals",
	// 				"searchText": VisitReportId
	// 			}
	// 		});
	// 		inputMap.set('QueryParam.criteriaDetails.FilterCriteria', criteriaJson.FilterCriteria);

	// 	}

	// 	if (gridReqMap.get("FilterCriteria")) {
	// 		var obj = gridReqMap.get("FilterCriteria");
	// 		for (var i = 0; i < obj.length; i++) {
	// 			switch (obj[i].columnName) {
	// 				case "VR_Type": obj[i].columnName = "ReportType"; break;
	// 				case "VR_DateofVisit": obj[i].columnName = "DateOfVisit"; break;
	// 				case "VR_AddressOfVisit": obj[i].columnName = "AddressOfVisit"; break;
	// 				case "VR_OfficialName": obj[i].columnName = "OfficialName"; break;
	// 				case "VR_NameOfPersonMet": obj[i].columnName = "PersonMet"; break;
	// 				case "VR_Designation": obj[i].columnName = "PersonMetDesgn"; break;
	// 				case "VR_OficialBusiGroup": obj[i].columnName = "OfficialBusiGroup"; break;
	// 				case "VR_PlaceOfVisit": obj[i].columnName = "PlaceOfVisit"; break;
	// 				case "VR_Photograph": obj[i].columnName = "PhotoTaken"; break;
	// 				case "VR_Observation": obj[i].columnName = "AdverseObservations"; break;
	// 				case "HidVisitReportId": obj[i].columnName = "VisitReportSeq"; break;
	// 				default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
	// 			}
	// 		}
	// 	}
	// 	if (gridReqMap.get("OrderCriteria")) {
	// 		var obj = gridReqMap.get("OrderCriteria");
	// 		for (var i = 0; i < obj.length; i++) {
	// 			switch (obj[i].columnName) {
	// 				case "VR_Type": obj[i].columnName = "ReportType"; break;
	// 				case "VR_DateofVisit": obj[i].columnName = "DateOfVisit"; break;
	// 				case "VR_AddressOfVisit": obj[i].columnName = "AddressOfVisit"; break;
	// 				case "VR_OfficialName": obj[i].columnName = "OfficialName"; break;
	// 				case "VR_NameOfPersonMet": obj[i].columnName = "PersonMet"; break;
	// 				case "VR_Designation": obj[i].columnName = "PersonMetDesgn"; break;
	// 				case "VR_OficialBusiGroup": obj[i].columnName = "OfficialBusiGroup"; break;
	// 				case "VR_PlaceOfVisit": obj[i].columnName = "PlaceOfVisit"; break;
	// 				case "VR_Photograph": obj[i].columnName = "PhotoTaken"; break;
	// 				case "VR_Observation": obj[i].columnName = "AdverseObservations"; break;
	// 				case "HidVisitReportId": obj[i].columnName = "VisitReportSeq"; break;
	// 				default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
	// 			}
	// 		}
	// 	}
	// 	this.readonlyGrid.combineMaps(gridReqMap, inputMap);
	// 	//this.services.http.fetchApi('/VisitReportDetails', 'GET', inputMap).subscribe(
	// 		this.services.http.fetchApi('/VisitReportDetails', 'GET', inputMap).subscribe(
	// 		async (httpResponse: HttpResponse<any>) => {
	// 			var res = httpResponse.body;
	// 			var loopDataVar10 = [];
	// 			var loopVar10 = res['VisitReportDetails'];
	// 			if (loopVar10) {
	// 				for (var i = 0; i < loopVar10.length; i++) {
	// 					var tempObj = {};
	// 					tempObj['VR_Type'] = loopVar10[i].ReportType;
	// 					tempObj['VR_DateofVisit'] = loopVar10[i].DateOfVisit;
	// 					tempObj['VR_AddressOfVisit'] = loopVar10[i].AddressOfVisit;
	// 					tempObj['VR_OfficialName'] = loopVar10[i].OfficialName;
	// 					tempObj['VR_NameOfPersonMet'] = loopVar10[i].PersonMet;
	// 					tempObj['VR_Designation'] = loopVar10[i].PersonMetDesgn;
	// 					tempObj['VR_OficialBusiGroup'] = loopVar10[i].OfficialBusiGroup;
	// 					tempObj['VR_PlaceOfVisit'] = loopVar10[i].PlaceOfVisit;
	// 					tempObj['VR_Photograph'] = loopVar10[i].PhotoTaken;
	// 					tempObj['VR_Observation'] = loopVar10[i].AdverseObservations;
	// 					tempObj['HidVisitReportId'] = loopVar10[i].VisitReportSeq;
	// 					loopDataVar10.push(tempObj);
	// 				}
	// 			}
	// 			this.readonlyGrid.apiSuccessCallback(params, loopDataVar10);
	// 		},
	// 		async (httpError) => {
	// 			var err = httpError['error']
	// 			if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
	// 			}
	// 			this.services.alert.showAlert(2, 'rlo.error.load.grid', -1);
	// 		}
	// 	);
	// 	//}

	// }
	async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
		let inputMap = new Map();
		inputMap.clear();
		let VisitReportId: any = event.VisitReportSeqToGrid;
		if(event.BorrowerSeq!=undefined){

		inputMap.set('QueryParam.ProposalId', event.ApplicationId);
		inputMap.set('QueryParam.TrnDemographicId', event.BorrowerSeq);
		//this.services.http.fetchApi('/VisitReportDetails', 'GET', inputMap).subscribe(
			this.services.http.fetchApi('/v1/proposals/visit-details', 'GET', inputMap).subscribe(
			async (httpResponse: HttpResponse<any>) => {
				var res = httpResponse.body;
				//this.VisitDtlsMap.clear();
				this.VisitDtlsList = [];
				var loopVar10 = res['RMRADetails'];
				if (loopVar10) {
					for (var i = 0; i < loopVar10.length; i++) {
						//this.VisitDtlsMap
						var tempObj = {};

						tempObj['VR_Type'] = loopVar10[i].ReportType;
						tempObj['VR_DateofVisit'] = loopVar10[i].DateOfVisit;
						tempObj['VR_NameOfPersonMet'] = loopVar10[i].NameOfPerson;
						tempObj['VR_Designation'] = loopVar10[i].DesignationOfPerson;
						tempObj['VR_PlaceOfVisit'] = loopVar10[i].PlaceofVisit;
						tempObj['VR_AddressOfVisit'] = loopVar10[i].AddressOfVisit;
						tempObj['HidVisitReportId'] = loopVar10[i].Id;
						tempObj['VR_NameBankRep'] = loopVar10[i].NameBankRep;
						tempObj['VR_BankRepVertical'] = loopVar10[i].BankRepVertical;
						tempObj['VR_isPhotoAvailable'] = loopVar10[i].AttVRPhoto;
						tempObj['VR_isAdvObservation'] = loopVar10[i].AdverseObservation;
						tempObj['VR_GistofDiscussion'] = loopVar10[i].GistofDiscussion;
						this.VisitDtlsList.push(tempObj);
					}
				}
				this.readonlyGrid.apiSuccessCallback(params, this.VisitDtlsList);
			},
			async (httpError) => {
				var err = httpError['error']
				if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
				}
				this.services.alert.showAlert(2, 'rlo.error.load.grid', -1);
			}
		);
	}

	}
	// async VR_Modify_click(event) {
	// 	let inputMap = new Map();
	// 	const selectedData0 = this.readonlyGrid.getSelectedData();
	// 	if (selectedData0) {
	// 		this.modifyVisitReport.emit({
	// 			//'VisitReortKey': selectedData0['HidVisitReportId'],
	// 			'VisitReortKey': event['HidVisitReportId']

	// 		});
	// 	}
	// }
	async VR_Modify_click(event) {
		let inputMap = new Map();
		//const selectedData0 = this.readonlyGrid.getSelectedData();
		if (event['HidVisitReportId']) {
			
			this.modifyVisitReport.emit({
				'VisitReort': event
			});
		}
	}

	async VR_Delete_click(event) {
		let inputMap = new Map();
		inputMap.clear();
		inputMap.set('PathParam.VisitReportSeq', event.HidVisitReportId);
		this.services.http.fetchApi('/VisitReportDetails/{VisitReportSeq}', 'DELETE', inputMap).subscribe(
			async (httpResponse: HttpResponse<any>) => {
				var res = httpResponse.body;
				this.services.alert.showAlert(1, 'rlo.success.delete.visitreport', 5000);
				this.readonlyGrid.refreshGrid();
			},
			async (httpError) => {
				var err = httpError['error']
				if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
				}
				this.services.alert.showAlert(2, 'rlo.error.delete.visitreport', -1);
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

}