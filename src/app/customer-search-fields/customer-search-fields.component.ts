import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { FormCommonComponent, IGCBMinMaxDateModel } from '../form-common/form-common.component';
import { ServiceStock } from '../service-stock.service';
import { TenantFieldMap } from '../form-common/tenant-field-map.model';
import { SearchCustomerGridComponent } from '../SearchCustomerGrid/SearchCustomerGrid.component';
import { ICustomSearchObject } from '../Interface/masterInterface';
import { isEmpty } from "lodash"
import * as _ from 'lodash';
import { RLOUIRadioComponent } from '../rlo-ui-radio/rlo-ui-radio.component';

@Component({
  selector: 'app-customer-search-fields',
  templateUrl: './customer-search-fields.component.html',
  styleUrls: ['./customer-search-fields.component.css']
})
export class CustomerSearchFieldsComponent extends FormCommonComponent implements OnInit {
  @ViewChild('SearchFormGrid', { static: false }) SearchFormGrid: SearchCustomerGridComponent;
  @ViewChild('search_Type', { static: false }) search_Type: RLOUIRadioComponent;

  @Input() customerSubType: string = "001";
  @Output() customerData: EventEmitter<Object> = new EventEmitter();
  //@ViewChild(CustSearchResultsGridComponent, { read: CustSearchResultsGridComponent, static: false })
  //custResultsGrid: CustSearchResultsGridComponent;
  searchParameters?: ICustomSearchObject;
  fieldData = [];
  taskName: any;
  showCustomerData = false;
  searchType: any = "001";
  //navbarModel: NavBarModelTablet;
  custType: any;
  backTo: any;
  rowData = [];
  groupedFields = {};

  parentData?: ICustomSearchObject;//sent while opening modal

  showRecordCount: boolean = false;

  // searchOptionsList: any = [
  //   { id: "Internal", text: "Internal" },
  //   { id: "External", text: "External" }];

  searchOptionsList: any = [
    { id: "External", text: "External" }
  ];

  customerSearchType: 'Internal' | 'External' = 'External';

  constructor(public utility: UtilityService, services: ServiceStock) {
    // super(utility);
    super(utility, services);
  }

  ngOnInit() {
    //this.getFormMetadata('getCustomerSearchResults');//needed
    this.utility.getActivatedRoute().queryParams.subscribe(
      params => {
        this.utility.getAppService().appRefNumber = params['appRefNum'],
          this.taskName = params['taskName'];
        this.custType = params['custType'];
        this.backTo = params['backTo'];
      }
    );
    this.clearFields();
    // this.navbarModel = new NavBarModelTablet(
    //   this.getLabel('CUSTOMER_SEARCH'), ''
    // );

    //testing

    // customerId: "1"
    // dateOfBirth: "1"
    // firstName: "1"
    // lastName: "1"
    // mobileNumber: "1"
    // nationalId: "1"
    // taxId: "1" 
    //mobileNo: undefined, taxId: undefined, sifNo: undefined, customerId: undefined, staffId: undefined

    setTimeout(() => {
      this.searchType = "001";
      this.customerSubType = "001";
      console.log(this.searchParameters, this.parentData);

      if (this.parentData.searchType != undefined) {
        this.customerSearchType = this.parentData.searchType;
      } else {
        this.customerSearchType = 'Internal';
      }
      this.search_Type.setValue(this.customerSearchType);

      // if (this.parentData.mobileNumber != undefined)
      //   this.searchParameters.mobileNumber = this.parentData.mobileNumber;

      // if (this.parentData.taxId != undefined)
      //   this.searchParameters.taxId = this.parentData.taxId;

      // if (this.parentData.customerId != undefined)
      //   this.searchParameters.customerId = this.parentData.customerId;

      // if (this.parentData.cifId != undefined) {
      //   this.searchParameters.cifId = this.parentData.cifId;
      // }

      // if (this.parentData.staffId != undefined)
      //   this.searchParameters.staffId = this.parentData.staffId;

      this.SearchFormGrid.hideSpinner();
      this.onCustSubTypeChange('');
    }, 500);

  }

  getPlaceholder(field) {
    // to get the placeholders of the search fields
    const maxLabel = this.getLabel('MAX_PLACEHOLDER_LABEL');
    if (field.maxLength) {
      return this.utility.format(maxLabel, field.maxLength);
    }
    return '';
  }

  // getCustomerSearchFields() {
  //   // gets the Customer Search Parameters based on the customer Sub Type
  //   console.log("getCustomerSearchFields()")
  //   // this.searchParameters = {};
  //   this.showCustomerData = false;
  //   const formData = new Map<string, string>();
  //   formData.set('customerSubType', this.customerSubType);

  //   let resData = { "Status_Cd": "S", "fieldData": [{ "regex": "[a-zA-Z][a-zA-Z'\\s]+[a-zA-Z']{1,50}$", "fieldName": "First Name", "customerSegment": "1", "groupId": "1", "attributeName": "firstName", "id": "6", "fieldType": "T", "mandatory": "1", "maxLength": "50" }, { "regex": "[a-zA-Z][a-zA-Z'\\s]+[a-zA-Z']{1,50}$", "fieldName": "Last Name", "customerSegment": "1", "groupId": "1", "attributeName": "lastName", "id": "8", "fieldType": "T", "mandatory": "1", "maxLength": "50" }, { "regex": "[a-zA-Z][a-zA-Z'\\s]+[a-zA-Z']{1,50}$", "fieldName": "Middle Name", "customerSegment": "1", "groupId": "2", "attributeName": "middleName", "id": "7", "fieldType": "T", "mandatory": "0", "maxLength": "50" }, { "regex": "^(\\d{0,13})?$", "fieldName": "Mobile Number", "customerSegment": "1", "groupId": "3", "attributeName": "mobileNumber", "id": "9", "fieldType": "T", "mandatory": "1" }, { "regex": "^[0-9]*$", "fieldName": "Customer ID", "customerSegment": "1", "groupId": "4", "attributeName": "customerId", "id": "11", "fieldType": "T", "mandatory": "0", "maxLength": "100" }, { "fieldName": "National ID", "customerSegment": "1", "groupId": "5", "attributeName": "nationalId", "id": "10", "fieldType": "T", "mandatory": "1", "maxLength": "100" }, { "fieldName": "Tax ID", "customerSegment": "1", "groupId": "5", "attributeName": "taxId", "id": "12", "fieldType": "T", "mandatory": "0", "maxLength": "100" }, { "fieldName": "Date Of Birth", "customerSegment": "1", "groupId": "6", "attributeName": "dateOfBirth", "id": "13", "fieldType": "D", "mandatory": "0", "maxLength": "100" }] };
  //   // console.log(resData);

  //   let data = resData['fieldData'].filter((data) => {
  //     return data.fieldName != "Middle Name";
  //   });
  //   resData['fieldData'] = data;

  //   if (resData['fieldData']) {
  //     this.groupFields(resData['fieldData']);
  //     this.fieldData = resData['fieldData'];
  //     this.addValidations();
  //   }

  //   console.warn(this.searchParameters);

  //   if (!_.isEmpty(this.searchParameters)) {
  //     this.searchCustomers();
  //   }
  // }

  //OG

  getCustomerSearchFields() {
    // gets the Customer Search Parameters based on the customer Sub Type
    //this.searchParameters = {};
    this.showCustomerData = false;
    const formData = new Map<string, string>();
    formData.set('customerSubType', this.customerSubType);
    this.utility.getCommonService().getCustomerSearchFields(formData).subscribe(
      data => {
        if (data['fieldData']) {
          // data['fieldData'].filter((data) => {
          //   return data.fieldName != "Middle Name";
          // });

          // if (data['fieldData']) {
          //   this.groupFields(data['fieldData']);
          //   this.fieldData = data['fieldData'];
          //   this.addValidations();
          // }


          let modifiedData = {
            "Status_Cd": "S",
            "fieldData": []
          }

          data['fieldData'].forEach(element => {
            if (element.attributeName != "middleName") {
              if (element.attributeName == "customerId") {
                if (this.customerSearchType == "Internal") {
                  element.fieldName = "Customer Id"
                }
                else {
                  element.fieldName = "CIF Id"
                }
              }
              element.regex = "";
              element.mandatory = 0;
              modifiedData.fieldData.push(element);
            }
          });

          console.warn(modifiedData);
          this.fieldData = modifiedData['fieldData'];
          this.groupFields(modifiedData['fieldData']);
          this.addValidations();

          if (this.parentData.mobileNumber != undefined)
            this.searchParameters.mobileNumber = this.parentData.mobileNumber;

          if (this.parentData.taxId != undefined)
            this.searchParameters.taxId = this.parentData.taxId;

          if (this.parentData.customerId != undefined)
            this.searchParameters.customerId = this.parentData.customerId;

          if (this.parentData.cifId != undefined) {
            this.searchParameters.customerId = this.parentData.cifId;
          }

          if (this.parentData.staffId != undefined)
            this.searchParameters.staffId = this.parentData.staffId;

          this.searchCustomers();
        } else {
          //this.appService.error(this.getLabel('NO_SEARCH_PARAMS_ERROR'));
        }
      }, error => {
        //this.appService.error(this.getLabel('error.default'));
      }
    );
  }

  groupFields(fields) {
    // to show the fields in groups in the UI for internal search
    this.groupedFields = {};
    let fieldData = new Array<Object>();
    let group = new Array<Object>();
    fieldData = fields;
    fieldData.forEach(field => {
      if (this.groupedFields[field['groupId']]) {
        group = this.groupedFields[field['groupId']];
      } else {
        group = new Array<Object>();
      }
      group.push(field);
      this.groupedFields[field['groupId']] = group;
    });

  }

  async searchCustomers() {
    console.warn("DEEP |searchCustomers()")
    console.log(this.searchParameters);
    console.log(this.fieldData);

    if (!_.isEmpty(this.searchParameters)) {
      this.SearchFormGrid.customSearchObj.mobileNumber = this.searchParameters.mobileNumber;
      this.SearchFormGrid.customSearchObj.taxId = this.searchParameters.taxId;
      this.SearchFormGrid.customSearchObj.firstName = this.searchParameters.firstName;
      this.SearchFormGrid.customSearchObj.lastName = this.searchParameters.lastName;
      this.SearchFormGrid.customSearchObj.dob = this.searchParameters.dob;
      this.SearchFormGrid.customSearchObj.staffId = this.searchParameters.staffId;
      this.SearchFormGrid.customSearchObj.searchType = this.customerSearchType;

      if (this.customerSearchType == "Internal") {//customerId
        this.SearchFormGrid.customSearchObj.customerId = this.searchParameters.customerId;
      } else {//CIF Id
        //this.SearchFormGrid.customSearchObj.customerId = this.searchParameters.cifId;
        this.SearchFormGrid.customSearchObj.customerId = this.searchParameters.customerId;
      }

      console.log(this.SearchFormGrid.customSearchObj);

      await this.SearchFormGrid.gridDataLoad({
      });
    }


    return;
    // to get the customer search results based on the parameters filled
    this.validateFields();
    if (!this.searchType) {
      //this.appService.error(this.getLabel('SEARCH_TYPE_NOT_FILLED_ERROR'));
      return;
    } else if (!this.customerSubType) {
      //this.appService.error(this.getLabel('SELECT_CUST_SUBTYPE'));
      return;
    }
    if (this.flag === 0) {
      this.showCustomerData = true;
      const formData = new Map<string, string>();
      Object.keys(this.searchParameters).forEach(key => {
        if (this.searchParameters[key] instanceof Date) {
          formData.set(key, this.utility.formatDate(this.searchParameters[key], 'DD-MMM-YYYY'));
        } else {
          formData.set(key, this.searchParameters[key]);
        }
      });
      formData.set('customerSubType', this.customerSubType);
      if (this.isTabletEnv()) {
        this.searchParameters['customerSubType'] = this.customerSubType;
        this.searchParameters['searchType'] = this.searchType;
        this.searchParameters['custType'] = this.custType;
        this.searchParameters['backTo'] = this.backTo;
        this.utility.getRouter().navigate(['/customer-search-res'], { queryParams: this.searchParameters });
        this.appService.customerSearchAttr = this.fieldData;
      }
      if (this.searchType === '002') {
        const reqObj = {};
        this.rowData = [];
        reqObj['interfaceId'] = 'INT002';
        reqObj['inputdata'] = this.searchParameters;
        reqObj['inputdata']['customerSubType'] = this.customerSubType;
        // this.utility.getCommonService().getExternalCustSearchResults(reqObj).subscribe(data => {
        //   if (data['ouputdata']) {
        //     this.assignRowData(this.customerSubType, data['ouputdata']);
        //   } else if (data['status'] === 'F') {
        //     this.showCustomerData = true;
        //     this.rowData = [];
        //   }
        // });
      } else if (this.searchType === '001') {
        this.utility.getCommonService().getCustomerSearchDetails(formData).subscribe(data => {
          this.rowData = [];
          if (data) {
            this.assignRowData(this.customerSubType, data);
          }
        },
          error => {

          }
        );
      }
    }
  }

  clearFields() {
    // clears the fields and hides the ag-grid
    this.searchParameters = {};
    this.customerSubType = '';
    this.searchType = '';
    this.showCustomerData = false;
  }

  addValidations() {
    // to add the validations to the fields based on the regex maintained for the search parameters
    this.fieldData.forEach((field) => {
      let findField = this.raSimpleValidationConfig.find(el => {
        return el.fieldName === field['attributeName'];
      });
      if (!findField) {
        findField = new TenantFieldMap();
        findField.fieldName = field['attributeName'];
        findField.regex = field['regex'];
        findField.isMandatory = field['mandatory'] === '1' ? true : false;
        findField.formName = this.serviceName;
        this.raSimpleValidationConfig.push(findField);
      } else {
        findField.fieldName = field['attributeName'];
        findField.regex = field['regex'];
        findField.isMandatory = field['mandatory'] === '1' ? true : false;
      }
    });
  }

  validateFields() {
    // validation of fields before calling search
    this.flag = 0;
    this.fieldData.forEach((field) => {
      if (field['fieldType'] === 'T') {
        this.validateField(this.searchParameters[field['attributeName']], field['attributeName']);
      } else if (field['fieldType'] === 'D') {
        this.validateDateField(this.searchParameters[field['attributeName']], field, null, null, true);
      }
    });
  }

  validateDateField(fieldValue, field, minDate?: IGCBMinMaxDateModel, maxDate?: IGCBMinMaxDateModel, isDate?: boolean) {
    //console.error(this.searchParameters);
    // this.tooltipError.tooltiperrorhide(field['attributeName']);
    // if (!this.tooltipError.isFieldVisible(field['attributeName'])) {
    //   return;
    // }
    // if (field['mandatory'] === '1' && !fieldValue) {
    //   this.flag = 1;
    //   this.tooltipError.tooltiperrorshow(field['attributeName'], this.getLabel('error.' +
    //     this.serviceName + '.' + field['attributeName'] + '.required', this.getLabel('error.default.required')));
    //   return;
    // }
    // if (fieldValue && isDate) {
    //   const valid = this.validateDate(fieldValue, minDate, maxDate);
    //   if (!valid) {
    //     this.flag = 1;
    //     this.tooltipError.tooltiperrorshow(field['attributeName'], this.getLabel('error.' +
    //       this.serviceName + '.' + field['attributeName'] + '.invalid', this.getLabel('error.default.invalid')));
    //     return;
    //   }
    // }
  }

  onCustSubTypeChange(value) {
    // called on change of customer sub type
    this.getCustomerSearchFields();
  }

  assignRowData(customerSubType, data) {
    // changes the grid column defs to individual/corporate based on the sub-type and sets them in grid component
    // this.showCustomerData = true;
    // if (customerSubType === '001' && data['individualList']) {
    //   this.custResultsGrid.columnDefs = this.custResultsGrid.individualColumnDefs;
    //   this.rowData = data['individualList'];
    // } else if (customerSubType === '002' && data['corporateList']) {
    //   this.custResultsGrid.columnDefs = this.custResultsGrid.corporateColumnDefs;
    //   this.rowData = data['corporateList'];
    // } else {
    //   this.rowData = [];
    // }
  }

  clearData() {
    // removes the tooltip and hides the grid
    this.searchParameters = {};
    //this.tooltipError.tooltipdestroy();
    this.showCustomerData = false;
    this.SearchFormGrid.hideGridData();
    this.SearchFormGrid.removeCountDisplayTxt();
  }

  // onBackPressed() {
  //   // logic for back navigation for tablet based on the current stage
  //   if (this.backTo === 'Borrower') {
  //     this.utility.getRouter().navigate(['/borrowerApplicationDtls'], {
  //       queryParams: {
  //         'taskName': this.appService.searchBorrower.get('taskName'), 'ProposalId': this.appService.searchBorrower.get('ProposalId'),
  //         'custName': this.appService.searchBorrower.get('custName'), 'appRefNum': this.appService.searchBorrower.get('appRefNum')
  //       }
  //     });
  //   } else {
  //     this.utility.getRouter().navigate(['/newApp']);
  //   }
  // }

  callFunction(params) {
    // to return data to customer-search component
    params['customerSubType'] = this.customerSubType;
    params['searchType'] = this.searchType;
    this.customerData.emit(params);
  }

  objectKey(obj) {
    // returns the keys in an object
    return Object.keys(obj);
  }

  onDecisionChange(data: 'Internal' | 'External') {
    console.log('onDecisionChange');
    this.searchParameters = {};
    this.customerSearchType = data;
    this.fieldData.forEach(element => {
      if (element.attributeName == "customerId") {
        if (this.customerSearchType == "Internal") {
          element.fieldName = "Customer Id"
          //this.searchParameters.customerId = this.parentData.customerId;
        }
        else {
          element.fieldName = "CIF Id"
          //this.searchParameters.customerId = this.parentData.cifId;
        }
      }
    });
  }

  selectedCustomer(data: any) {
    console.log(data);
    this.customerData.emit(data);
    this.SearchFormGrid.hidgrid();
     
  }

}

