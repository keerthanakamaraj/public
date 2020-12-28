import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { flush } from '@angular/core/testing';
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
	visitRecord: boolean = false;
	VisitRecordsList = [];
	componentCode: string = 'VisitReportGrid';
	openedFilterForm: string = '';
	hidden: boolean = false;
	gridConsts: any = {
		paginationPageSize: 10,
		gridCode: "VisitReportGrid",
		paginationReq: false
	};
	columnDefs: any[] = [{
		field: "VR_Type",
		width: 14,
		sortable: false,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		// filter: "agTextColumnFilter",
		// filterParams: {
		// 	suppressAndOrCondition: true,
		// 	applyButton: true,
		// 	clearButton: true,
		// 	filterOptions: ["contains"],
		// 	caseSensitive: true,
		// },
	},
	{
		field: "VR_DateofVisit",
		width: 14,
		sortable: false,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		// filter: "agDateColumnFilter",
		// filterParams: {
		// 	suppressAndOrCondition: true,
		// 	applyButton: true,
		// 	clearButton: true,
		// 	caseSensitive: true,
		// 	filterOptions: ["inRange"],
		// },
	},
	{
		field: "VR_AddressOfVisit",
		width: 14,
		sortable: false,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		// filter: "agTextColumnFilter",
		// filterParams: {
		// 	suppressAndOrCondition: true,
		// 	applyButton: true,
		// 	clearButton: true,
		// 	filterOptions: ["contains"],
		// 	caseSensitive: true,
		// },
	},
	{
		field: "VR_NameOfPersonMet",
		width: 18,
		sortable: false,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		// filter: "agTextColumnFilter",
		// filterParams: {
		// 	suppressAndOrCondition: true,
		// 	applyButton: true,
		// 	clearButton: true,
		// 	filterOptions: ["contains"],
		// 	caseSensitive: true,
		// },
	},
	{
		field: "VR_Designation",
		width: 14,
		sortable: false,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		// filter: "agTextColumnFilter",
		// filterParams: {
		// 	suppressAndOrCondition: true,
		// 	applyButton: true,
		// 	clearButton: true,
		// 	filterOptions: ["contains"],
		// 	caseSensitive: true,
		// },
	},
	{
		field: "VR_PlaceOfVisit",
		width: 14,
		sortable: false,
		resizable: true,
		cellStyle: { 'text-align': 'left' },
		// filter: "agTextColumnFilter",
		// filterParams: {
		// 	suppressAndOrCondition: true,
		// 	applyButton: true,
		// 	clearButton: true,
		// 	filterOptions: ["contains"],
		// 	caseSensitive: true,
		// },
	},
	{
		width: 6,
		field: "VR_EDIT_BTN",
		sortable: false,
		filter: false,
		resizable: true,
		cellRenderer: 'buttonRenderer',
		cellStyle: { 'text-align': 'left' },
		cellRendererParams: {
			gridCode: 'VisitReportGrid',
			columnId: 'VR_Modify',
			Type: '1',
			CustomClass: 'btn-edit',
			IconClass: 'fa fa-edit fa-lg',
			onClick: this.VR_Modify_click.bind(this)
		},
	},
	{
		width: 6,
		field: "VR_DELETE_BTN",
		sortable: false,
		filter: false,
		resizable: true,
		cellRenderer: 'buttonRenderer',
		cellStyle: { 'text-align': 'left' },
		cellRendererParams: {
			gridCode: 'VisitReportGrid',
			columnId: 'VR_Delete',
			Type: '1',
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
	async gridDataAPI(params, gridReqMap: Map<string, any>, event) {
		let inputMap = new Map();
		inputMap.clear();
		//let VisitReportId: any =event.BorrowerSeq;
		let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
		if (event.BorrowerSeq != undefined) {
			criteriaJson.FilterCriteria.push({
				"columnName": "TrnDemographicId",
				"columnType": "String",
				"conditions": {
					"searchType": "equals",
					"searchText": event.BorrowerSeq
				}
			});
			inputMap.set('QueryParam.criteriaDetails.FilterCriteria', criteriaJson.FilterCriteria);

			this.services.http.fetchApi('/RMRADetails', 'GET', inputMap, '/rlo-de').subscribe(
				async (httpResponse: HttpResponse<any>) => {
					var res = httpResponse.body;
					this.VisitRecordsList = [];
					if (res !== null) {
						this.visitRecord = true
						var loopVar10 = res['RMRADetails'];
					} else {
						this.visitRecord = false;
					}
					let VisitDtlsList = [];
					if (loopVar10) {
						console.log("hjgjhf",loopVar10)
						this.VisitRecordsList = loopVar10;
						for (var i = 0; i < loopVar10.length; i++) {
							var tempObj = {};

							tempObj['VR_Type'] = loopVar10[i].ReportType.text;
							tempObj['VR_DateofVisit'] = loopVar10[i].DateOfVisit;
							tempObj['VR_NameOfPersonMet'] = loopVar10[i].NameOfPerson;
							tempObj['VR_Designation'] = loopVar10[i].DesignationOfPerson;
							tempObj['VR_PlaceOfVisit'] = loopVar10[i].PlaceofVisit.text;
							tempObj['PlaceOfVisit_ID'] = loopVar10[i].PlaceofVisit.id;
							tempObj['VR_AddressOfVisit'] = loopVar10[i].AddressOfVisit;
							tempObj['HidVisitReportId'] = loopVar10[i].Id;
							// tempObj['VR_NameBankRep'] = loopVar10[i].NameBankRep;
							// tempObj['VR_BankRepVertical'] = loopVar10[i].BankRepVertical;
							// tempObj['VR_isPhotoAvailable'] = loopVar10[i].AttVRPhoto;
							// tempObj['VR_isAdvObservation'] = loopVar10[i].AdverseObservation;
							// tempObj['VR_GistofDiscussion'] = loopVar10[i].GistofDiscussion;
							VisitDtlsList.push(tempObj);
						}
					}

					let obj = {
						"name": "RmVisitDetails",
						"data": this.VisitRecordsList,
						"BorrowerSeq": event.BorrowerSeq
					}
					this.services.rloCommonData.globalComponentLvlDataHandler(obj);
					
					this.readonlyGrid.apiSuccessCallback(params, VisitDtlsList);
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
	async VR_Modify_click(event) {
		let inputMap = new Map();
		if (event['HidVisitReportId']) {
			this.modifyVisitReport.emit({
				'VisitReportId': event['HidVisitReportId']

			});
		}
	}

	async VR_Delete_click(event) {
		if (confirm("Are you sure you want to delete this record")) {
		let inputMap = new Map();
		inputMap.clear();
		inputMap.set('PathParam.Id', event.HidVisitReportId);
		this.services.http.fetchApi('/RMRADetails/{Id}', 'DELETE', inputMap, '/rlo-de').subscribe(
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
	}
	loadSpinner = false;
	showSpinner() {
		this.loadSpinner = true;
	}
	hideSpinner() {
		this.loadSpinner = false;
	}
}
