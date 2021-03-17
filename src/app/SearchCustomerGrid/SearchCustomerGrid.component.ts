import { Component, ViewChild, ChangeDetectorRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { LangChangeEvent } from '@ngx-translate/core';
import { ServiceStock } from '../service-stock.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReadonlyGridComponent } from '../readonly-grid/readonly-grid.component';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomSearchObject } from '../Interface/masterInterface';
import { CustomerSearchGridBtnComponent } from '../customer-search-grid-btn/customer-search-grid-btn.component';
import { cos } from '@amcharts/amcharts4/.internal/core/utils/Math';
import { Router } from '@angular/router';
import { ProvidehttpService } from '../providehttp.service';
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
  },
  {
    field: "LmsDetails",
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

  cmsDetails = [
    {
      AvailableLimit: "12490.27",
      CardEmbossingDate: "200505",
      CardStatus: "ACTIVE",
      CashLimit: "50000",
      CreditLimit: "50000",
      MaskedCardNo: "494611******6005",
      ProductClass: "Classic",
      ProductFranchise: "VISA",
      ProductName: "Visa Global",
      ProductType: "24200"
    }
  ];

  constructor(private services: ServiceStock, private cdRef: ChangeDetectorRef, public activeModal: NgbActiveModal, public router: Router, public http: ProvidehttpService) { }

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
                tempObj['Product'] = loopVar7[i].Product;
                tempObj['ProductCategory'] = loopVar7[i].ProductCategory;
                tempObj['SubProduct'] = loopVar7[i].SubProduct;
                tempObj['Scheme'] = loopVar7[i].Scheme;
                tempObj['TypeOfLoan'] = loopVar7[i].TypeOfLoan;
                tempObj['TypeOfLoanName'] = loopVar7[i].TypeOfLoanName;
                tempObj['ApplicationPurpose'] = loopVar7[i].ApplicationPurpose;
                tempObj['SourcingChannel'] = loopVar7[i].SourcingChannel;
                tempObj['DSACode'] = loopVar7[i].DSACode;
                tempObj['CreatedOn'] = loopVar7[i].CreatedOn;
                tempObj['ApplicationBranch'] = loopVar7[i].ApplicationBranch;
                tempObj['ExistingCardType'] = loopVar7[i].ExistingCardType;
                tempObj['CBSProductCode'] = loopVar7[i].CBSProductCode;
                tempObj['CmsDetails'] = loopVar7[i].CMS;


                loopDataVar7.push(tempObj);
              }
            }
            this.documentCount = loopDataVar7.length;
            this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
          } else {
            this.recordsFound = false;
            this.hideGridData();
          }

        });
    }
    else {
      inputMap.set('Body.interfaceId', 'CUSTOMER_SEARCH');
      inputMap.set('Body.inputdata.CifID', this.customSearchObj.customerId);
      inputMap.set('Body.inputdata.customerSubType', '001');

      this.services.rloCommonData.getSearchedCustomerData(this.customSearchObj.searchType, inputMap)
        .then((response: any) => {
          let errorResponse = { msg: "Error occured while processing the request", interfaceId: "CUSTOMER_SEARCH", errorcode: "0000", status: "F" }
          console.log("Deep | Response", response);
          if (response != null) {
            if (response.status == "S") {
              this.recordsFound = true;
              var loopVar7 = response.outputdata.CustomerList;
              loopVar7.map((element, index) => {
                element['CMS'] = 'N';
                element['LMS'] = 'N';
                element['CMSDetailsList'] = [];
                element['showCardDetailsModal'] = false;
                if (index < 5) {
                  element['CMSDetailsList'] = this.cmsDetails;
                  element['CMS'] = 'Y';

                  if (this.services.rloCommonData.getActiveRouteName() == "AddOn" || this.services.rloCommonData.getActiveRouteName() == "LimitEnhancement") {
                    element['showCardDetailsModal'] = true;
                  }
                }
              });
              // this.getMultipleCifId(loopVar7, params); // Addon and limit enhance
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
                  tempObj['Product'] = loopVar7[i].Product;
                  tempObj['ProductCategory'] = loopVar7[i].ProductCategory;
                  tempObj['SubProduct'] = loopVar7[i].SubProduct;
                  tempObj['Scheme'] = loopVar7[i].Scheme;
                  tempObj['TypeOfLoan'] = loopVar7[i].TypeOfLoan;
                  tempObj['TypeOfLoanName'] = loopVar7[i].TypeOfLoanName;
                  tempObj['ApplicationPurpose'] = loopVar7[i].ApplicationPurpose;
                  tempObj['SourcingChannel'] = loopVar7[i].SourcingChannel;
                  tempObj['DSACode'] = loopVar7[i].DSACode;
                  tempObj['CreatedOn'] = loopVar7[i].CreatedOn;
                  tempObj['ApplicationBranch'] = loopVar7[i].ApplicationBranch;
                  tempObj['ExistingCardType'] = loopVar7[i].ExistingCardType;
                  tempObj['LmsDetails'] = loopVar7[i].LMS;
                  tempObj['CMSDetailsList'] = loopVar7[i].CMSDetailsList;
                  tempObj['showCardDetailsModal'] = loopVar7[i].showCardDetailsModal;
                  loopDataVar7.push(tempObj);
                }
              }
              //hide spinner
              this.hideSpinner();

              this.documentCount = loopDataVar7.length;
              this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);
            }
            else {
              this.recordsFound = false;
              this.hideSpinner();
              this.hideGridData();
            }
          } else {
            this.recordsFound = false;
            this.hideGridData();
            this.hideSpinner();
          }
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
      tempVar['registeredName'] = selectedData0['RegisteredName'];
      tempVar['dateOfIncorporation'] = selectedData0['DateOfIncorporation'];
      tempVar['typeOfIncorporation'] = selectedData0['TypeOfIncorporation'];

      tempVar['staffId'] = selectedData0['staffId'];//StaffID: "9870"
      tempVar['Product'] = selectedData0['Product'];
      tempVar['ProductCategory'] = selectedData0['ProductCategory'];
      tempVar['SubProduct'] = selectedData0['SubProduct'];
      tempVar['Scheme'] = selectedData0['Scheme'];
      tempVar['TypeOfLoan'] = selectedData0['TypeOfLoan'];
      tempVar['TypeOfLoanName'] = selectedData0['TypeOfLoanName'];
      tempVar['ApplicationPurpose'] = selectedData0['ApplicationPurpose'];
      tempVar['SourcingChannel'] = selectedData0['SourcingChannel'];
      tempVar['DSACode'] = selectedData0['DSACode'];
      tempVar['CreatedOn'] = selectedData0['CreatedOn'];
      tempVar['ApplicationBranch'] = selectedData0['ApplicationBranch'];
      tempVar['ExistingCardType'] = selectedData0['ExistingCardType'];
      tempVar['CmsDetails'] = selectedData0['CmsDetails'];
      tempVar['CmsDetailsList'] = selectedData0['CMSDetailsList'];
      tempVar['showCardDetailsModal'] = selectedData0['showCardDetailsModal'];

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

          let cardDetails = tempVar.CmsDetailsList;
          console.error(cardDetails);

          this.services.rloui.customerCardDetails(cardDetails).then((response: any) => {
            if (response != null) {
              console.log(response);
            }
            else {
              console.warn("DEEP | No customer selected");
            }
          });

          // this.services.rloCommonData.getMemberCardDetail(selectedData0['ICIF']).then((response: any) => {
          //   console.log(response);
          //   if (response != null) {
          //     let cardDetails = response.outputdata.AccountList;
          //     console.error(cardDetails);

          //     this.services.rloui.customerCardDetails(cardDetails).then((response: any) => {
          //       if (response != null) {
          //         console.log(response);
          //       }
          //       else {
          //         console.warn("DEEP | No customer selected");
          //       }
          //     });
          //   }
          // });
        }
      } else {
        this.services.dataStore.setData('selectedData', tempVar);
        for (var i = this.services.routing.currModal; i > 0; i--) {
          await this.services.dataStore.getModalReference(i).componentInstance.closeModal();
        }

        if (this.clickedShowCustomerDetails && selectedData0['CmsDetails'] == 'Y') {
          console.warn("DEEP | SHOW SEPERATE CUSTOMER CARD UI");
          if (this.services.rloCommonData.getActiveRouteName() == "Initiation" || this.services.rloCommonData.getActiveRouteName() == "QDE" || this.services.rloCommonData.getActiveRouteName() == "DDE") {
            this.clickedShowCustomerDetails = false;
            this.selectedCustomer.emit(tempVar);
            this.activeModal.close(tempVar);
            return;
          }

          this.clickedShowCustomerDetails = false;
          tempVar['showCustomerCard'] = true;
          this.selectedCustomer.emit(tempVar);
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

    var lastCustomerLength = 0;
    if (customerList.length > 7) {
      lastCustomerLength = 6;
    } else {
      lastCustomerLength = customerList.length;
    }

    var apiCalls = [];
    var responseStatus = [];

    for (let i = 0; i < lastCustomerLength; i++) {
      const element = customerList[i];
      let inputMap = new Map();
      inputMap.clear();
      inputMap.set('Body.inputdata.CifID', element.ExistingCIF);
      inputMap.set('Body.interfaceId', 'CUSTOMER_360');
      inputMap.set('Body.prposalid', '3322');

      apiCalls[i] = this.http.fetchApi(this.services.rloCommonData.userInvokeInterfacev2 ? '/api/invokeInterface/v2' : '/api/invokeInterface', 'POST', inputMap, '/los-integrator');
    }
    console.log(apiCalls);
    forkJoin(apiCalls).subscribe(response => {
      console.log("DEEP | forkjoin data", response);
      response.map((data: any) => {
        if (data.body.status == "S") {
          responseStatus.push("S");
        }
        else {
          responseStatus.push("F");
        }
      });

      customerList.map((element, index) => {
        if (responseStatus[index] == "S") {
          element.CMS = "Y";
        }
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
          tempObj['Product'] = loopVar7[i].Product;
          tempObj['ProductCategory'] = loopVar7[i].ProductCategory;
          tempObj['SubProduct'] = loopVar7[i].SubProduct;
          tempObj['Scheme'] = loopVar7[i].Scheme;
          tempObj['TypeOfLoan'] = loopVar7[i].TypeOfLoan;
          tempObj['TypeOfLoanName'] = loopVar7[i].TypeOfLoanName;
          tempObj['ApplicationPurpose'] = loopVar7[i].ApplicationPurpose;
          tempObj['SourcingChannel'] = loopVar7[i].SourcingChannel;
          tempObj['DSACode'] = loopVar7[i].DSACode;
          tempObj['CreatedOn'] = loopVar7[i].CreatedOn;
          tempObj['ApplicationBranch'] = loopVar7[i].ApplicationBranch;
          tempObj['ExistingCardType'] = loopVar7[i].ExistingCardType;

          tempObj['staffId'] = loopVar7[i].StaffID;//StaffID: "9870"
          tempObj['custName'] = loopVar7[i].FullName;
          loopDataVar7.push(tempObj);
        }
      }
      this.documentCount = loopDataVar7.length;
      this.readonlyGrid.apiSuccessCallback(params, loopDataVar7);

      // hide spinner
      this.hideSpinner();
    });


    return;
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
          tempObj['Product'] = loopVar7[i].Product;
          tempObj['ProductCategory'] = loopVar7[i].ProductCategory;
          tempObj['SubProduct'] = loopVar7[i].SubProduct;
          tempObj['Scheme'] = loopVar7[i].Scheme;
          tempObj['TypeOfLoan'] = loopVar7[i].TypeOfLoan;
          tempObj['TypeOfLoanName'] = loopVar7[i].TypeOfLoanName;
          tempObj['ApplicationPurpose'] = loopVar7[i].ApplicationPurpose;
          tempObj['SourcingChannel'] = loopVar7[i].SourcingChannel;
          tempObj['DSACode'] = loopVar7[i].DSACode;
          tempObj['CreatedOn'] = loopVar7[i].CreatedOn;
          tempObj['ApplicationBranch'] = loopVar7[i].ApplicationBranch;
          tempObj['ExistingCardType'] = loopVar7[i].ExistingCardType;

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
