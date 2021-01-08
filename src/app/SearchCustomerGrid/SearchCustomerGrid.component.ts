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
import { CustomerSearchGridBtnComponent } from '../customer-search-grid-btn/customer-search-grid-btn.component';
import { cos } from '@amcharts/amcharts4/.internal/core/utils/Math';
import { Router } from '@angular/router';
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

  clickedShowCustomerDetails: boolean = false;//when user clicks on 'Y' in customer serach
  showCustomerCardDetails: boolean = false;//show card details section

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
    field: "Customer",
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
    field: "CmsDetails",
    width: 12,
    sortable: true,
    resizable: true,
    cellStyle: { 'text-align': 'left' },
    cellRendererFramework: CustomerSearchGridBtnComponent,
    cellRendererParams: {
      gridCode: 'OccuptionDtlsGrid',
      columnId: 'OD_EDIT_BTN',
      Type: '1',
      CustomClass: 'btn-edit',
      onClick: this.CmsDetails_click.bind(this),
    }
  }
    // {
    //   width: 12,
    //   field: "CmsDetails",
    //   sortable: false,
    //   filter: false,
    //   resizable: false,
    //   cellRenderer: 'buttonRenderer',
    //   cellStyle: { 'text-align': 'left' },
    //   cellRendererParams: {
    //     gridCode: 'CmsDetails',
    //     columnId: 'OD_EDIT_BTN',
    //     Type: '3',
    //     CustomClass: 'btn-edit',
    //     onClick: this.CmsDetails_click.bind(this)
    //   },
    // }
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

  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef, public activeModal: NgbActiveModal, public router: Router) { }

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
                tempObj['Customer'] = loopVar7[i].CustomerType == "I" ? loopVar7[i].FullName : loopVar7[i].RegisteredName;
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
                tempObj['RegisteredName'] = loopVar7[i].RegisteredName;
                tempObj['DateOfIncorporation'] = loopVar7[i].DateOfIncorporation;
                tempObj['TypeOfIncorporation'] = loopVar7[i].TypeOfIncorporation;
                tempObj['custName'] = loopVar7[i].FullName;
                // tempObj['CreditCard'] = loopVar7[i].CreditCard;
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
                tempObj['Customer'] = loopVar7[i].CustomerType == "I" ? loopVar7[i].FullName : loopVar7[i].RegisteredName;
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
                tempObj['RegisteredName'] = loopVar7[i].RegisteredName;
                tempObj['DateOfIncorporation'] = loopVar7[i].DateOfIncorporation;
                tempObj['TypeOfIncorporation'] = loopVar7[i].TypeOfIncorporation;
                // tempObj['CreditCard'] = loopVar7[i].CreditCard;
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

  async rowClicked(event, cmsBtnClick: boolean = false) {
    console.error(event);
    let inputMap = new Map();
    let selectedData0;
    selectedData0 = this.readonlyGrid.getSelectedData();
    // if (!cmsBtnClick) {
    //   selectedData0 = this.readonlyGrid.getSelectedData();
    // } else {
    //   selectedData0 = event;
    // }

    console.log(selectedData0);

    if (selectedData0) {
      let tempVar: any = {};
      tempVar['firsName'] = selectedData0['FirstName'];
      tempVar['midName'] = selectedData0['MiddleName'];
      tempVar['lastName'] = selectedData0['LastName'];
      tempVar['title'] = selectedData0['Title'];
      tempVar['gender'] = selectedData0['Gender'];
      tempVar['mobileNum'] = selectedData0['Mobile'];
      tempVar['taxId'] = selectedData0['TaxID'];
      tempVar['custName'] = selectedData0['custName'];
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

      tempVar['custType'] = selectedData0['custType'];
      tempVar['registeredName'] = selectedData0['registeredName'];
      tempVar['dateOfIncorporation'] = selectedData0['dateOfIncorporation'];
      tempVar['typeOfIncorporation'] = selectedData0['typeOfIncorporation'];

      tempVar['staffId'] = selectedData0['staffId'];//StaffID: "9870"
      console.log("DEEP| Selcted customer,", tempVar);

      let currentRoute = this.router.url.slice(this.router.url.lastIndexOf("/") + 1, this.router.url.length);

      if (currentRoute != 'Initiation' && currentRoute != 'DDE' && currentRoute != 'QDE') {
        this.selectedCustomer.emit(tempVar);
        let showCardModal = true;
        if (currentRoute == 'AddOn' && selectedData0['CustomerType'] == "I") {
          showCardModal = false;
        }

        if (selectedData0['CmsDetails'] == 'Y' && showCardModal) {
          console.error("DEEP | Open Seperate 360 modal");
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
          });
        }
      } else {
        this.services.dataStore.setData('selectedData', tempVar);
        for (var i = this.services.routing.currModal; i > 0; i--) {
          await this.services.dataStore.getModalReference(i).componentInstance.closeModal();
        }

        if (this.clickedShowCustomerDetails && selectedData0['CmsDetails'] == 'Y') {
          console.warn("DEEP | SHOW SEPERATE CUSTOMER CARD UI");
          this.clickedShowCustomerDetails = false;
          this.selectedCustomer.emit({ showCustomerCard: true });
        } else {
          this.clickedShowCustomerDetails = false;
          this.selectedCustomer.emit(tempVar);
          this.activeModal.close(tempVar);
        }
      }

      // this.services.dataStore.setData('selectedData', tempVar);
      // for (var i = this.services.routing.currModal; i > 0; i--) {
      //   await this.services.dataStore.getModalReference(i).componentInstance.closeModal();
      // }

      // this.activeModal.close(tempVar);
      // this.selectedCustomer.emit(tempVar);

      // if (selectedData0['CmsDetails'] == 'Y') {
      //   console.error("DEEP | Open 360 modal");
      //   this.services.rloCommonData.getMemberCardDetail().then((response: any) => {
      //     console.log(response);
      //     if (response != null) {
      //       let cardDetails = response.outputdata.AccountList;
      //       console.error(cardDetails);

      //       this.services.rloui.customerCardDetails(cardDetails).then((response: any) => {
      //         if (response != null) {
      //           console.log(response);
      //         }
      //         else {
      //           console.warn("DEEP | No customer selected");
      //         }
      //       });
      //     }
      //   });
      // }
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

    this.services.rloCommonData.getMultipleCustomerIcif(multipleIcif).then((response: any) => {
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
          tempObj['Customer'] = loopVar7[i].CustomerType == "I" ? loopVar7[i].FullName : loopVar7[i].RegisteredName;
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
          // tempObj['CreditCard'] = loopVar7[i].CreditCard;
          tempObj['CmsDetails'] = loopVar7[i].CMS;
          tempObj['NoOfCard'] = loopVar7[i].NoOfCard;

          tempObj['custType'] = loopVar7[i].CustType;
          tempObj['registeredName'] = loopVar7[i].RegisteredName;
          tempObj['dateOfIncorporation'] = loopVar7[i].DateOfIncorporation;
          tempObj['typeOfIncorporation'] = loopVar7[i].TypeOfIncorporation;

          tempObj['staffId'] = loopVar7[i].StaffID;//StaffID: "9870"
          tempObj['custName'] = loopVar7[i].FullName;
          loopDataVar7.push(tempObj);
        }
      }
      this.documentCount = loopDataVar7.length;
      this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
    });
  }

  CmsDetails_click(event) {
    console.error('CmsDetails_click', event);
    console.error("************");
    this.clickedShowCustomerDetails = true;
    // this.rowClicked(event, true);
  }


}
