import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { FormCommonComponent, IGCBMinMaxDateModel } from '../form-common/form-common.component';
import { ServiceStock } from '../service-stock.service';
import { TenantFieldMap } from '../form-common/tenant-field-map.model';

@Component({
  selector: 'app-customer-search-fields',
  templateUrl: './customer-search-fields.component.html',
  styleUrls: ['./customer-search-fields.component.css']
})
export class CustomerSearchFieldsComponent extends FormCommonComponent implements OnInit {
  @Input() customerSubType: string;
  @Output() customerData: EventEmitter<Object> = new EventEmitter();
  //@ViewChild(CustSearchResultsGridComponent, { read: CustSearchResultsGridComponent, static: false })
  //custResultsGrid: CustSearchResultsGridComponent;

  searchParameters: any = {};
  fieldData = [];
  taskName: any;
  showCustomerData = false;
  searchType: any;
  //navbarModel: NavBarModelTablet;
  custType: any;
  backTo: any;
  rowData = [];
  groupedFields = {};

  constructor(public utility: UtilityService, services: ServiceStock) {
    // super(utility);
    super(utility, services);
  }

  ngOnInit() {
    this.getFormMetadata('getCustomerSearchResults');
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
  }

  getPlaceholder(field) {
    // to get the placeholders of the search fields
    const maxLabel = this.getLabel('MAX_PLACEHOLDER_LABEL');
    if (field.maxLength) {
      return this.utility.format(maxLabel, field.maxLength);
    }
    return '';
  }

  getCustomerSearchFields() {
    // gets the Customer Search Parameters based on the customer Sub Type
    this.searchParameters = {};
    this.showCustomerData = false;
    const formData = new Map<string, string>();
    formData.set('customerSubType', this.customerSubType);
    this.utility.getCommonService().getCustomerSearchFields(formData).subscribe(
      data => {
        if (data['fieldData']) {
          this.groupFields(data['fieldData']);
          this.fieldData = data['fieldData'];
          this.addValidations();
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
  searchCustomers() {
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
  }

  onBackPressed() {
    // logic for back navigation for tablet based on the current stage
    if (this.backTo === 'Borrower') {
      this.utility.getRouter().navigate(['/borrowerApplicationDtls'], {
        queryParams: {
          'taskName': this.appService.searchBorrower.get('taskName'), 'ProposalId': this.appService.searchBorrower.get('ProposalId'),
          'custName': this.appService.searchBorrower.get('custName'), 'appRefNum': this.appService.searchBorrower.get('appRefNum')
        }
      });
    } else {
      this.utility.getRouter().navigate(['/newApp']);
    }
  }

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

}

