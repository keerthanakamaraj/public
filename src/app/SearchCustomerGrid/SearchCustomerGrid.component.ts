import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomSearchObject } from '../Interface/masterInterface';
const customCss: string = '';
@Component({
  selector: 'app-SearchCustomerGrid',
  templateUrl: './SearchCustomerGrid.component.html',
  animations: [
    trigger('slideInOut', [
      state('false', style({ opacity: '0', overflow: 'hidden', height: '0px' })),
      state('true', style({ height: '*', 'padding-top': '1rem' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in'))
    ])
  ],
})
export class SearchCustomerGridComponent implements AfterViewInit {
  @ViewChild('readonlyGrid', { static: true }) readonlyGrid: ReadonlyGridComponent;

  @Input('formCode') formCode: string;
  @Input('displayTitle') displayTitle: boolean = true;
  @Input('displayToolbar') displayToolbar: boolean = true;
  @Input('fieldID') fieldID: string;

  @Output('selectedCustomer') selectedCustomer: EventEmitter<Object> = new EventEmitter();

  showRecordCount: boolean = false;//show div which indicates the number of records found 

  componentCode: string = 'SearchCustomerGrid';
  openedFilterForm: string = '';
  hidden: boolean = false;
  gridConsts: any = {
    paginationPageSize: 10,
    gridCode: "SearchCustomerGrid",
    paginationReq: true
  };

  documentCount: number = 0;
  loadSpinner = false;

  customSearchObj: ICustomSearchObject = {};

  customerSearchType: 'Internal' | 'External';

  columnDefs: any[] = [{
    field: "TaxID",
    width: 11,
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
    field: "CustName",
    width: 11,
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
  // {
  //   field: "FirstName",
  //   width: 11,
  //   sortable: true,
  //   resizable: true,
  //   cellStyle: { 'text-align': 'left' },
  //   filter: "agTextColumnFilter",
  //   filterParams: {
  //     suppressAndOrCondition: true,
  //     applyButton: true,
  //     clearButton: true,
  //     filterOptions: ["contains"],
  //     caseSensitive: true,
  //   },
  // },
  // {
  //   field: "LastName",
  //   width: 11,
  //   sortable: true,
  //   resizable: true,
  //   cellStyle: { 'text-align': 'left' },
  //   filter: "agTextColumnFilter",
  //   filterParams: {
  //     suppressAndOrCondition: true,
  //     applyButton: true,
  //     clearButton: true,
  //     filterOptions: ["contains"],
  //     caseSensitive: true,
  //   },
  // },
  {
    field: "AccNo",
    width: 11,
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
  // {
  //   field: "AccVintage",
  //   width: 11,
  //   sortable: true,
  //   resizable: true,
  //   cellStyle: { 'text-align': 'left' },
  //   filter: "agTextColumnFilter",
  //   filterParams: {
  //     suppressAndOrCondition: true,
  //     applyButton: true,
  //     clearButton: true,
  //     filterOptions: ["contains"],
  //     caseSensitive: true,
  //   },
  // },
  {
    field: "AccType",
    width: 14,
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
  // {
  //   field: "Status",
  //   width: 11,
  //   sortable: true,
  //   resizable: true,
  //   cellStyle: { 'text-align': 'left' },
  //   filter: "agTextColumnFilter",
  //   filterParams: {
  //     suppressAndOrCondition: true,
  //     applyButton: true,
  //     clearButton: true,
  //     filterOptions: ["contains"],
  //     caseSensitive: true,
  //   },
  // },
  {
    field: "Mobile",
    width: 11,
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
    field: "Cif",
    width: 11,
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
    field: "Dob",
    width: 12,
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
    field: "Branch",
    width: 8,
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
    field: "CreditCard",
    width: 12,
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
    field: "CmsDetails",
    width: 12,
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
  }
  ];
  private unsubscribe$: Subject<any> = new Subject<any>();
  recordsFound: boolean = false;

  multipleCifJson: any = {
    "CustomerList": [
      {
        "ICIFNumber": "4566793",
        "FirstName": "Amit",
        "FullName": "Amit Rathod",
        "Title": "Mr",
        "LastName": "Rathod",
        "MiddleName": "Trived",
        "CustomerType": "Individual"
      },
      {
        "ICIFNumber": "90000196",
        "FirstName": "Suhas",
        "FullName": " Suhas Patil ",
        "Title": "Mr",
        "LastName": "Patil",
        "MiddleName": "Ketan",
        "CustomerType": "Individual"
      },
      {
        "ICIFNumber": "4566789",
        "FirstName": "Sayli",
        "FullName": " Sayli Singh ",
        "Title": "Ms",
        "LastName": "Singh",
        "MiddleName": "Prakash",
        "CustomerType": " Individual "
      }
    ],
    "Status": "Success",
    "ErrCode": "",
    "ErrMsg": ""
  }

  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef, public activeModal: NgbActiveModal) { }

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
    this.readonlyGrid.setRowClickHandler(this.rowClicked.bind(this));
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = customCss;
    styleElement.id = 'SearchCustomerGrid_customCss';
    document.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    var styleElement = document.getElementById('SearchCustomerGrid_customCss');
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
    // show spinner
    this.showSpinner();
    this.showRecordCount = true;

    let inputMap = new Map();
    inputMap.clear();

    if (gridReqMap.get("FilterCriteria")) {
      var obj = gridReqMap.get("FilterCriteria");
      for (var i = 0; i < obj.length; i++) {
        switch (obj[i].columnName) {
          case "TaxID": obj[i].columnName = "TaxId"; break;
          //case "CustName": obj[i].columnName = "FullName"; break;
          case "AccNo": obj[i].columnName = "AccountNumber"; break;
          // case "AccVintage": obj[i].columnName = "AccountVintage"; break;
          case "AccType": obj[i].columnName = "AccountType"; break;
          case "Status": obj[i].columnName = "ApplicationStatus"; break;
          case "Mobile": obj[i].columnName = "MobileNumber"; break;
          case "Cif": obj[i].columnName = "ExistingCIF"; break;
          case "Dob": obj[i].columnName = "DateOfBirth"; break;
          // case "AppRefNum": obj[i].columnName = "ARN"; break;
          default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
        }
      }
    }
    if (gridReqMap.get("OrderCriteria")) {
      var obj = gridReqMap.get("OrderCriteria");
      for (var i = 0; i < obj.length; i++) {
        switch (obj[i].columnName) {
          case "TaxID": obj[i].columnName = "TaxId"; break;
          //case "CustName": obj[i].columnName = "FullName"; break;
          case "AccNo": obj[i].columnName = "AccountNumber"; break;
          //case "AccVintage": obj[i].columnName = "AccountVintage"; break;
          case "AccType": obj[i].columnName = "AccountType"; break;
          case "Status": obj[i].columnName = "ApplicationStatus"; break;
          case "Mobile": obj[i].columnName = "MobileNumber"; break;
          case "Cif": obj[i].columnName = "ExistingCIF"; break;
          // case "AppRefNum": obj[i].columnName = "ARN"; break;
          default: console.error("Column ID '" + obj[i].columnName + "' not mapped with any key");
        }
      }
    }

    console.log("DEEP | customSearchObj", this.customSearchObj);
    if (this.customSearchObj.searchType == "Internal") {
      //ExistingCIF
      inputMap.set('QueryParam.TaxId', this.customSearchObj.taxId);
      inputMap.set('QueryParam.MobileNumber', this.customSearchObj.mobileNumber);
      inputMap.set('QueryParam.FirstName', this.customSearchObj.firstName);
      inputMap.set('QueryParam.LastName', this.customSearchObj.lastName);
      inputMap.set('QueryParam.TaxId', this.customSearchObj.taxId);
      inputMap.set('QueryParam.dob', this.customSearchObj.dob);
      inputMap.set('QueryParam.StaffId', this.customSearchObj.staffId);

      if (this.customerSearchType == "Internal") {
        inputMap.set('QueryParam.CustomerId', this.customSearchObj.customerId);
      } else {
        inputMap.set('QueryParam.ExistingCIF', this.customSearchObj.cifId);
      }

      console.log("Search Customer Grid", inputMap);

      this.readonlyGrid.combineMaps(gridReqMap, inputMap);

      this.services.rloCommonData.getSearchedCustomerData(this.customSearchObj.searchType, inputMap)
        .then((response: any) => {
          console.log("Deep | Response", response);
          if (response != null) {
            this.recordsFound = true;
            var loopVar7 = response['Dedupe'];
            loopVar7.forEach(element => {
              element['CMS'] = 'N'
            });
            this.getMultipleCifId(loopVar7, params); // Addon and limit enhance
            this.documentCount = 0;

            var loopDataVar7 = [];
            if (loopVar7) {
              for (var i = 0; i < loopVar7.length; i++) {
                var tempObj = {};
                tempObj['TaxID'] = loopVar7[i].TaxId;
                tempObj['CustName'] = loopVar7[i].FullName;
                tempObj['AccNo'] = loopVar7[i].AccountNumber;
                //tempObj['AccVintage'] = loopVar7[i].AccountVintage;
                tempObj['AccType'] = loopVar7[i].AccountType;
                tempObj['Status'] = loopVar7[i].ApplicationStatus;
                tempObj['Mobile'] = loopVar7[i].MobileNumber;
                tempObj['Cif'] = loopVar7[i].ExistingCIF;
                tempObj['Dob'] = loopVar7[i].DateOfBirth;
                tempObj['FirstName'] = loopVar7[i].FirstName;
                tempObj['MiddleName'] = loopVar7[i].MiddleName;
                tempObj['LastName'] = loopVar7[i].LastName;
                tempObj['Title'] = loopVar7[i].Title;
                tempObj['Gender'] = loopVar7[i].Gender;
                tempObj['EmailID'] = loopVar7[i].EmailID;
                tempObj['NameOnCard'] = loopVar7[i].NameOnCard;
                tempObj['ICIF'] = loopVar7[i].ICIF;
                tempObj['AppRefNum'] = loopVar7[i].AppRefNUm;
                tempObj['CustomerType'] = loopVar7[i].CustomerType;
                tempObj['Branch'] = loopVar7[i].Branch;
                tempObj['CreditCard'] = loopVar7[i].CreditCard;
                tempObj['CmsDetails'] = loopVar7[i].CMS;

                loopDataVar7.push(tempObj);
              }
            }
            this.documentCount = loopDataVar7.length;
            this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
          } else {
            this.hideGridData();
          }
          // hide spinner
          this.hideSpinner();
        });
    }
    else {
      inputMap.set('Body.interfaceId', 'CUSTOMER_SEARCH');
      inputMap.set('Body.inputdata.CifID', this.customSearchObj.customerId);
      inputMap.set('Body.inputdata.customerSubType', '001');

      this.services.rloCommonData.getSearchedCustomerData(this.customSearchObj.searchType, inputMap)
        .then((response: any) => {
          console.log("Deep | Response", response);
          if (response != null) {
            this.recordsFound = true;
            var loopVar7 = response.outputdata.CustomerList;
            loopVar7.forEach(element => {
              element['CMS'] = 'N'
            });
            this.getMultipleCifId(loopVar7, params); // Addon and limit enhance
            this.documentCount = 0;

            var loopDataVar7 = [];
            if (loopVar7) {
              for (var i = 0; i < loopVar7.length; i++) {
                var tempObj = {};
                tempObj['TaxID'] = loopVar7[i].TaxId;
                tempObj['CustName'] = loopVar7[i].FullName;
                tempObj['AccNo'] = loopVar7[i].AccountNumber;
                //tempObj['AccVintage'] = loopVar7[i].AccountVintage;
                tempObj['AccType'] = loopVar7[i].AccountType;
                tempObj['Status'] = loopVar7[i].ApplicationStatus;
                tempObj['Mobile'] = loopVar7[i].MobileNumber;
                tempObj['Cif'] = loopVar7[i].ExistingCIF;
                tempObj['Dob'] = loopVar7[i].DateOfBirth;
                tempObj['FirstName'] = loopVar7[i].FirstName;
                tempObj['MiddleName'] = loopVar7[i].MiddleName;
                tempObj['LastName'] = loopVar7[i].LastName;
                tempObj['Title'] = loopVar7[i].Title;
                tempObj['Gender'] = loopVar7[i].Gender;
                tempObj['EmailID'] = loopVar7[i].EmailID;
                tempObj['NameOnCard'] = loopVar7[i].NameOnCard;
                tempObj['ICIF'] = loopVar7[i].ICIF;
                tempObj['AppRefNum'] = loopVar7[i].AppRefNum;
                tempObj['CBSProductCode'] = loopVar7[i].CBSProductCode;
                tempObj['StaffID'] = loopVar7[i].StaffID;
                tempObj['CustomerType'] = loopVar7[i].CustomerType;
                tempObj['Branch'] = loopVar7[i].Branch;
                tempObj['CreditCard'] = loopVar7[i].CreditCard;
                tempObj['CmsDetails'] = loopVar7[i].CMS;
                tempObj['NoOfCard'] = loopVar7[i].NoOfCard;

                loopDataVar7.push(tempObj);
              }
            }
            this.documentCount = loopDataVar7.length;
            this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
          } else {
            this.hideGridData();
          }
          // hide spinner
          this.hideSpinner();
        });
    }
  }

  async rowClicked(event) {
    let inputMap = new Map();
    const selectedData0 = this.readonlyGrid.getSelectedData();
    if (selectedData0) {
      let tempVar: any = {};
      tempVar['firsName'] = selectedData0['FirstName'];
      tempVar['midName'] = selectedData0['MiddleName'];
      tempVar['lastName'] = selectedData0['LastName'];
      tempVar['title'] = selectedData0['Title'];
      tempVar['gender'] = selectedData0['Gender'];
      tempVar['mobileNum'] = selectedData0['Mobile'];
      tempVar['taxId'] = selectedData0['TaxID'];
      tempVar['custName'] = selectedData0['CustName'];
      tempVar['accNo'] = selectedData0['AccNo'];
      tempVar['accVintage'] = selectedData0['AccVintage'];
      tempVar['accType'] = selectedData0['AccType'];
      tempVar['status'] = selectedData0['Status'];
      tempVar['dob'] = selectedData0['Dob'];
      tempVar['cif'] = selectedData0['Cif'];
      tempVar['icif'] = selectedData0['ICIF'];
      tempVar['emailid'] = selectedData0['EmailID'];
      tempVar['nameoncard'] = selectedData0['NameOnCard'];
      tempVar['AppRefNum'] = selectedData0['AppRefNum'];
      tempVar['CBSProductCode'] = selectedData0['CBSProductCode'];
      tempVar['CustomerType'] = selectedData0['CustomerType'];
      tempVar['Branch'] = selectedData0['Branch'];
      tempVar['NoOfCard'] = selectedData0['NoOfCard'];

      tempVar['staffId'] = selectedData0['StaffID'];//StaffID: "9870"
      console.log("DEEP| Selcted customer,", tempVar);

      this.services.dataStore.setData('selectedData', tempVar);
      for (var i = this.services.routing.currModal; i > 0; i--) {
        await this.services.dataStore.getModalReference(i).componentInstance.closeModal();
      }

      this.activeModal.close(tempVar);
      this.selectedCustomer.emit(tempVar);

      if (selectedData0['CmsDetails'] == 'Y') {
        console.error("DEEP | Open 360 modal");
        this.services.rloCommonData.getMemberCardDetail().then((response: any) => {
          console.log(response);
          if (response != null) {
            let cardDetails = response.outputdata.AccountList;
            console.error(cardDetails);

            this.services.rloui.customerCardDetails(cardDetails).then((response: any) => {
              if (response != null) {
                console.log(response);
              }
              else {
                console.warn("DEEP | No customer selected");
              }
            });
          }
        })
      }
    }
  }

  showSpinner() {
    this.loadSpinner = true;
  }

  hideSpinner() {
    this.loadSpinner = false;
  }

  hideGridData() {
    this.documentCount = 0;
    this.recordsFound = false;
  }

  removeCountDisplayTxt() {
    this.showRecordCount = false;
  }

  hidgrid() {
    // this.loadSpinner = true;
    this.showRecordCount = false;
    this.recordsFound = false;
    console.log("new", this.loadSpinner, this.recordsFound);
  }

  getMultipleCifId(customerList: any, params) {
    let multipleIcif = [];
    console.log('DEEP | customerList', customerList);
    customerList.forEach(element => {
      if (element.ICIF != undefined && element.ICIF.length)
        multipleIcif.push(element.ICIF);
    });

    this.services.rloCommonData.getMultipleCustomerIcif(multipleIcif).then((response:any) => {
      console.log("DEEP | getMultipleCifId", response);
      let testJson = response.outputdata.CustomerList;
      testJson.forEach(responseEle => {
        customerList.forEach(element => {
          if (responseEle.ICIFNumber == element.ICIF) {
            element.CMS = "Y";
          }
        });
      });

      var loopVar7 = customerList;
      console.log("loopVar7", loopVar7);
      var loopDataVar7 = [];
      if (loopVar7) {
        for (var i = 0; i < loopVar7.length; i++) {
          var tempObj = {};
          tempObj['TaxID'] = loopVar7[i].TaxId;
          tempObj['CustName'] = loopVar7[i].FullName;
          tempObj['AccNo'] = loopVar7[i].AccountNumber;
          //tempObj['AccVintage'] = loopVar7[i].AccountVintage;
          tempObj['AccType'] = loopVar7[i].AccountType;
          tempObj['Status'] = loopVar7[i].ApplicationStatus;
          tempObj['Mobile'] = loopVar7[i].MobileNumber;
          tempObj['Cif'] = loopVar7[i].ExistingCIF;
          tempObj['Dob'] = loopVar7[i].DateOfBirth;
          tempObj['FirstName'] = loopVar7[i].FirstName;
          tempObj['MiddleName'] = loopVar7[i].MiddleName;
          tempObj['LastName'] = loopVar7[i].LastName;
          tempObj['Title'] = loopVar7[i].Title;
          tempObj['Gender'] = loopVar7[i].Gender;
          tempObj['EmailID'] = loopVar7[i].EmailID;
          tempObj['NameOnCard'] = loopVar7[i].NameOnCard;
          tempObj['ICIF'] = loopVar7[i].ICIF;
          tempObj['AppRefNum'] = loopVar7[i].AppRefNum;
          tempObj['CBSProductCode'] = loopVar7[i].CBSProductCode;
          tempObj['StaffID'] = loopVar7[i].StaffID;
          tempObj['CustomerType'] = loopVar7[i].CustomerType;
          tempObj['Branch'] = loopVar7[i].Branch;
          tempObj['CreditCard'] = loopVar7[i].CreditCard;
          tempObj['CmsDetails'] = loopVar7[i].CMS;
          tempObj['NoOfCard'] = loopVar7[i].NoOfCard;

          loopDataVar7.push(tempObj);
        }
      }
      this.documentCount = loopDataVar7.length;
      this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
    });
  }
}
