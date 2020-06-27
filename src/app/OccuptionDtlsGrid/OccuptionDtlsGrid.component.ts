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
	selector: 'app-OccuptionDtlsGrid',
	templateUrl: './OccuptionDtlsGrid.component.html',
	animations: [
		trigger('slideInOut', [
			state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
			state('true', style({ height: '*', 'padding-top': '1rem' })),
			transition('true => false', animate('300ms ease-out')),
			transition('false => true', animate('300ms ease-in'))
		])
	],
})
export class OccuptionDtlsGridComponent implements AfterViewInit {
	occupationRecord: boolean = false;
	occupation: any[];
	constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef) { }
	@ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

	@Output() occDtlsEdit: EventEmitter<any> = new EventEmitter<any>();
	@Input('formCode') formCode: string;
	@Input('displayTitle') displayTitle: boolean = true;
	@Input('displayToolbar') displayToolbar: boolean = true;
	@Input('fieldID') fieldID: string;
	@Output() occupationLoaded: EventEmitter<any> = new EventEmitter<any>();

	componentCode: string = 'OccuptionDtlsGrid';
	openedFilterForm: string = '';
	hidden: boolean = false;
	gridConsts: any = {
		paginationPageSize: 10,
		gridCode: "OccuptionDtlsGrid",
		paginationReq: false
	};
	columnDefs: any[] = [{
		field: "OD_OCCUPATION",
		width: 22,
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
	// {
	// field:"OD_INDUSTRY",
	// width:17,
	// sortable: true,
	// resizable: true,
	// cellStyle: {'text-align': 'left'},
	// filter: "agTextColumnFilter",
	// filterParams:{
	// suppressAndOrCondition : true,
	// applyButton: true,
	// clearButton: true,
	// filterOptions:["contains"] ,
	// caseSensitive:true,
	// },
	// },
	{
		field: "NET_INCOME",
		width: 22,
		sortable: false,
		resizable: true,
		cellStyle: { 'text-align': 'right' },
		valueFormatter: this.formatAmount.bind(this),
		// filter: "agTextColumnFilter",
		// filterParams: {
		// 	suppressAndOrCondition: true,
		// 	applyButton: true,
		// 	clearButton: true,
		// 	filterOptions: ["contains"],
		// 	caseSensitive: true,
		// },
		// cellRenderer: (params) => {
		// 	let result = params.node.data ? this.NET_INCOME_getCellContent(params.node.data) : "";
		// 	if (typeof result === 'string') {
		// 		let eDiv = document.createElement('div');
		// 		eDiv.style.display = 'contents';
		// 		eDiv.innerHTML = result;
		// 		return eDiv;
		// 	}
		// 	return result;

		// },
	},
	{
		field: "INCOME_FREQ",
		width: 22,
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
		// cellRenderer: (params) => {
		// 	let result = params.node.data ? this.INCOME_FREQ_getCellContent(params.node.data) : "";
		// 	if (typeof result === 'string') {
		// 		let eDiv = document.createElement('div');
		// 		eDiv.style.display = 'contents';
		// 		eDiv.innerHTML = result;
		// 		return eDiv;
		// 	}
		// 	return result;

		// },
	},
	{
		field: "OD_COMPANY_NAME",
		width: 22,
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
		field: "OD_EDIT_BTN",
		sortable: false,
		filter: false,
		resizable: false,
		cellRenderer: 'buttonRenderer',
		cellStyle: { 'text-align': 'left' },
		cellRendererParams: {
			gridCode: 'OccuptionDtlsGrid',
			columnId: 'OD_EDIT_BTN',
			Type: '1',
			CustomClass: 'btn-edit',
			onClick: this.OD_EDIT_BTN_click.bind(this),
		},
	},
	{
		width: 6,
		field: "OD_DELETE",
		sortable: false,
		filter: false,
		resizable: false,
		cellRenderer: 'buttonRenderer',
		cellStyle: { 'text-align': 'left' },
		cellRendererParams: {
			gridCode: 'OccuptionDtlsGrid',
			columnId: 'OD_DELETE',
			Type: '1',
			CustomClass: 'btn-delete',
			onClick: this.OD_DELETE_click.bind(this),
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
		console.log("deep ===", "onInit");
		this.readonlyGrid.setGridDataAPI(this.gridDataAPI.bind(this));
		var styleElement = document.createElement('style');
		styleElement.type = 'text/css';
		styleElement.innerHTML = customCss;
		styleElement.id = 'OccuptionDtlsGrid_customCss';
		document.getElementsByTagName('head')[0].appendChild(styleElement);
	}
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		var styleElement = document.getElementById('OccuptionDtlsGrid_customCss');
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
		console.log("deep ===", "2", params, gridReqMap, event)
		this.recordShow()
		let inputMap = new Map();
		inputMap.clear();
		let inputKey: any = event.refNumToGrid;
		let criteriaJson: any = { "Offset": 1, "Count": 10, FilterCriteria: [] };
		if (inputKey) {
			criteriaJson.FilterCriteria.push({
				"columnName": "BorrowerSeq",
				"columnType": "String",
				"conditions": {
					"searchType": "equals",
					"searchText": inputKey
				}
			});
		}
		inputMap.set('QueryParam.criteriaDetails', criteriaJson);
		if (gridReqMap.get("FilterCriteria")) {
			var obj = gridReqMap.get("FilterCriteria");
			for (var i = 0; i < obj.length; i++) {
				switch (obj[i].columnName) {
					case "OCCUPATION_ID": obj[i].columnName = "OccupationSeq"; break;
					case "OD_OCCUPATION": obj[i].columnName = "Occupation"; break;
					// case "OD_INDUSTRY":obj[i].columnName =  "Industry";break;
					case "OD_COMPANY_NAME": obj[i].columnName = "CompanyName"; break;
					case "INCOME_FREQ": obj[i].columnName = "IncomeFrequecy"; break;
					case "NET_INCOME": obj[i].columnName = "NetIncome"; break;
					default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
				}
			}
		}
		if (gridReqMap.get("OrderCriteria")) {
			var obj = gridReqMap.get("OrderCriteria");
			for (var i = 0; i < obj.length; i++) {
				switch (obj[i].columnName) {
					case "OCCUPATION_ID": obj[i].columnName = "OccupationSeq"; break;
					case "OD_OCCUPATION": obj[i].columnName = "Occupation"; break;
					// case "OD_INDUSTRY":obj[i].columnName =  "Industry";break;
					case "OD_COMPANY_NAME": obj[i].columnName = "CompanyName"; break;
					case "INCOME_FREQ": obj[i].columnName = "IncomeFrequecy"; break;
					case "NET_INCOME": obj[i].columnName = "NetIncome"; break;
					default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
				}
			}
		}
		this.readonlyGrid.combineMaps(gridReqMap, inputMap);
		this.services.http.fetchApi('/OccupationDetails', 'GET', inputMap, '/rlo-de').subscribe(
			async (httpResponse: HttpResponse<any>) => {
				var res = httpResponse.body;
				this.occupation = [];
				var occupationDetails = [];
				if (res !== null) {
					this.occupationRecord = true;
					occupationDetails = res['OccupationDetails'];
				}
				else {
					this.occupationRecord = false;
				}

				console.log("loopVar10 ", occupationDetails, this.occupation);

				if (occupationDetails) {
					// this.occupationLoaded.emit({
					// 	"name": "occupationLoad",
					// 	"data": occupationDetails
					// });

					for (var i = 0; i < occupationDetails.length; i++) {
						var tempObj = {};
						tempObj['OCCUPATION_ID'] = occupationDetails[i].OccupationSeq;
						tempObj['OD_OCCUPATION'] = occupationDetails[i].Occupation;
						console.log("Occupation ", occupationDetails[i].Occupation);


						tempObj['OD_INCOME_TYPE'] = occupationDetails[i].IncomeType;
						// tempObj['OD_INDUSTRY'] = occupationDetails[i].Industry;
						tempObj['OD_COMPANY_NAME'] = occupationDetails[i].CompanyName;
						tempObj['INCOME_FREQ'] = occupationDetails[i].IncomeFrequecy;
						tempObj['NET_INCOME'] = occupationDetails[i].NetIncome;
						this.occupation.push(tempObj);

						// if (!i)
						// 	this.services.rloCommonData.updateValuesFundLineGraph("add");
					}
				} else {
					// this.occupation = [];
					// this.occupationLoaded.emit({
					// 	"name": "occupationLoad",
					// 	"borrowerSeq": inputKey,
					// 	"data": this.occupation
					// });
				}

				let obj = {
					"name": "OccupationDetails",
					"data": occupationDetails,
					"BorrowerSeq": inputKey,
				}
				this.services.rloCommonData.globalComponentLvlDataHandler(obj);

				console.log("params ", params, " data ", this.occupation);

				this.readonlyGrid.apiSuccessCallback(params, this.occupation);

				this.recordHide();
			},
			async (httpError) => {
				var err = httpError['error']
				if (err != null && err['ErrorElementPath'] != undefined && err['ErrorDescription'] != undefined) {
					this.recordHide();
				}
			}
		);

	}
	NET_INCOME_getCellContent(event) {
		return event.NET_INCOME
	}
	INCOME_FREQ_getCellContent(event) {
		return event.INCOME_FREQ
	}
	async OD_EDIT_BTN_click(event) {
		let inputMap = new Map();
		// const selectedData0 = this.readonlyGrid.getSelectedData();
		this.occDtlsEdit.emit({
			'OccupationSeq': event['OCCUPATION_ID'],
		});
		// if (selectedData0) {

		// }
	}
	async OD_DELETE_click(event) {

		if (confirm("Are you sure you want do delete this record")) {
			let inputMap = new Map();
			inputMap.clear();
			inputMap.set('PathParam.OccupationSeq', event.OCCUPATION_ID);
			this.services.http.fetchApi('/OccupationDetails/{OccupationSeq}', 'DELETE', inputMap, '/rlo-de').subscribe(
				async (httpResponse: HttpResponse<any>) => {
					var res = httpResponse.body;
					this.services.alert.showAlert(1, 'rlo.success.delete.occupation', 5000);

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
	}
	recordDisplay = false;
	recordShow() {
		this.recordDisplay = true;
	}
	recordHide() {
		this.recordDisplay = false;
	}

	getOccupationGridData() {
		return this.occupation;
	}

	formatAmount(number) {
		if (number.value) {
			// Dirty Fix
			return this.services.formatAmount(number.value, null, null).substr(1);
		} else {
			return '-';
		}
	}

}
