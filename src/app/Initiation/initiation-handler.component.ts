import { Component, OnInit, Input } from '@angular/core';
import { InitiationComponent } from './Initiation.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { RlouiService } from '../rlo-services/rloui.service';

@Component({
  selector: 'app-initiation-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class InitiationHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: InitiationComponent;
  //isLoanCategory:boolean = true;
  customers = [];
  formName: string = "Initiation";
  private counter = 0;
  private editId: string;

  customerFormFields = ["CD_CUST_TYPE", "CD_EXISTING_CUST", "CD_CIF", "CD_CUSTOMER_ID", "CD_TITLE", "CD_FIRST_NAME",
    "CD_MIDDLE_NAME", "CD_THIRD_NAME", "CD_LAST_NAME", "CD_FULL_NAME", "CD_GENDER", "CD_DOB", "CD_TAX_ID",
    "CD_MOBILE", "CD_DEBIT_SCORE", "CD_CUST_SGMT", "CD_STAFF", "CD_STAFF_ID", "CD_LOAN_OWNERSHIP"];

  customersFormMandatory = ["CD_CUST_TYPE", "CD_TITLE", "CD_FIRST_NAME", "CD_LAST_NAME", "CD_DOB", "CD_GENDER", "CD_TAX_ID"];

  constructor(rloui: RlouiService) {
    super(rloui);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    super.onFormLoad({});

    this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }

  // onChangeOfProduct Category
  onProdCategoryChange({ }) {
    if (this.MainComponent.BAD_PROD_CAT.getFieldValue() == 'CC') {
      this.MainComponent.isLoanCategory = false;
    } else {
      this.MainComponent.isLoanCategory = true;
    }
  }

  //calcute Netincome
calculateNetIncome({ }) {
  let grossincome = this.MainComponent.LD_GROSS_INCOME.getFieldValue();
  let liability = this.MainComponent.LD_EXST_LBLT_AMT.getFieldValue();
  let otherDeduction = this.MainComponent.LD_OTH_DEDUCTIONS.getFieldValue();
  if (liability == undefined){
  liability = 0;
  }
  if (otherDeduction == undefined){
  otherDeduction = 0;
  }
  if (grossincome == undefined){
  grossincome = 0;
  }
  let liabityAndOtherDed =liability + otherDeduction ;
  if (liability > grossincome || otherDeduction > grossincome || liabityAndOtherDed> grossincome) {
  this.MainComponent.services.alert.showAlert(2, 'Gross Income should be greater', 5000);
  }else{
  let netIncome = grossincome - liability - otherDeduction;
  // let DBR = (liability + otherDeduction) / grossincome;
  this.MainComponent.LD_NET_INCOME.setValue(netIncome.toFixed(2));
  // this.MainComponent.LD_LTV_DBR.setValue(DBR.toFixed(2));
  }
  }


  existingCustomer({}){
    if(this.MainComponent.CD_EXISTING_CUST.getFieldValue() == 'N' && this.MainComponent.CD_EXISTING_CUST.getFieldValue() != 'Y'){
       this.MainComponent.CD_CUSTOMER_ID.readOnly = true;
    }
    else{
       this.MainComponent.CD_CUSTOMER_ID.readOnly = false;
    }
}


isStaff({}){
  if(this.MainComponent.CD_STAFF.getFieldValue() == 'N' && this.MainComponent.CD_STAFF.getFieldValue() != 'Y'){
     this.MainComponent.CD_STAFF_ID .readOnly = true;       
  }
  else{
     this.MainComponent.CD_STAFF_ID .readOnly = false;  
     console.log()     
  }
}
  //onClickOfCheckElgibility
  onCheckEligibilityClick({ }) {
    this.MainComponent.LD_SYS_AMT_RCMD.setValue(this.MainComponent.LD_LOAN_AMOUNT.getFieldValue());
    if (this.MainComponent.LD_GROSS_INCOME.getFieldValue() != undefined || this.MainComponent.LD_EXST_LBLT_AMT.getFieldValue() != undefined || this.MainComponent.LD_OTH_DEDUCTIONS.getFieldValue() != undefined){
      let grossincome = this.MainComponent.LD_GROSS_INCOME.getFieldValue();    
      let liability = this.MainComponent.LD_EXST_LBLT_AMT.getFieldValue();
      let otherDeduction = this.MainComponent.LD_OTH_DEDUCTIONS.getFieldValue();
      if (liability == undefined){
        liability = 0;
      }
      if (otherDeduction == undefined){
        otherDeduction = 0;
      }
      if (grossincome == undefined){
        grossincome = 0;
      }
      
      let DBR = (liability + otherDeduction) / grossincome;
      this.MainComponent.LD_LTV_DBR.setValue(DBR.toFixed(2));
    }
    let amount = this.MainComponent.LD_LOAN_AMOUNT.getFieldValue();
    let rate = this.MainComponent.LD_INTEREST_RATE.getFieldValue() / 1200;
    let months = this.MainComponent.LD_TENURE.getFieldValue();
    if (this.MainComponent.LD_TENURE_PERIOD.getFieldValue() == 'YRS') {
      let years = this.MainComponent.LD_TENURE.getFieldValue() * 12;
      months = years;
    }
    let EMI = amount * rate / (1 - (Math.pow(1 / (1 + rate), months)));
    console.log("Loan EMI", EMI);
    this.MainComponent.LD_EMI_AMT.setValue(EMI.toFixed(2));

  }

  

  // Reset Customer Form
  onResetCustomer(arg: {}) {
    this.MainComponent.CD_CUST_TYPE.onReset();
    this.MainComponent.CD_FIRST_NAME.onReset();
    this.MainComponent.CD_LAST_NAME.onReset();
    this.MainComponent.CD_GENDER.onReset();
    this.MainComponent.CD_TAX_ID.onReset();
    this.MainComponent.CD_DOB.onReset();
  }

  // Add Full Name based on First Name, Middle Name, Third Name and Last Name
  updateFullName(arg0: {}) {
    let fullName = "";
    if (this.MainComponent.CD_FIRST_NAME.getFieldValue()) {
      fullName = fullName + this.MainComponent.CD_FIRST_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_MIDDLE_NAME.getFieldValue()) {
      fullName = fullName + this.MainComponent.CD_MIDDLE_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_THIRD_NAME.getFieldValue()) {
      fullName = fullName + " " + this.MainComponent.CD_THIRD_NAME.getFieldValue() + " ";
    }
    if (this.MainComponent.CD_LAST_NAME.getFieldValue()) {
      fullName = fullName + " " + this.MainComponent.CD_LAST_NAME.getFieldValue() + " ";
    }
    fullName.trim();
    this.MainComponent.CD_FULL_NAME.setValue(fullName);
  }

  // Edit Customer
  onEditCustomer(arg0: { 'id': any; }) {

    this.editId = arg0.id;
    let customer = this.customers.find(cust => cust.tempId === arg0.id);

    // TODO: add logic to handle in loop

    this.MainComponent.CD_CUST_TYPE.setValue(customer.customerType.value, customer.customerType.label);
    this.MainComponent.CD_EXISTING_CUST.setValue(customer.existingCustomer.value, customer.existingCustomer.label);
    this.MainComponent.CD_CIF.setValue(customer.CIF);
    this.MainComponent.CD_CUSTOMER_ID.setValue(customer.customerId);
    this.MainComponent.CD_TITLE.setValue(customer.title.value, customer.title.label);
    this.MainComponent.CD_FIRST_NAME.setValue(customer.firstName);
    this.MainComponent.CD_MIDDLE_NAME.setValue(customer.middleName);
    this.MainComponent.CD_THIRD_NAME.setValue(customer.thirdName);
    this.MainComponent.CD_LAST_NAME.setValue(customer.lastName);
    this.MainComponent.CD_FULL_NAME.setValue(customer.FULL_NAME);
    this.MainComponent.CD_GENDER.setValue(customer.gender.value, customer.gender.label);
    this.MainComponent.CD_DOB.setValue(customer.DOB);
    this.MainComponent.CD_TAX_ID.setValue(customer.taxId);
    this.MainComponent.CD_MOBILE.setValue(customer.mobileNumber);
    this.MainComponent.CD_DEBIT_SCORE.setValue(customer.debitScore);
    this.MainComponent.CD_CUST_SGMT.setValue(customer.customerSegment.value, customer.customerSegment.label);
    this.MainComponent.CD_STAFF.setValue(customer.staff.value, customer.staff.label);
    this.MainComponent.CD_STAFF_ID.setValue(customer.staffId);
    this.MainComponent.CD_LOAN_OWNERSHIP.setValue(customer.loanOwnership);

  }

  // Delete Customer
  onDeleteCustomer(arg0: { 'id': any; }) {

    let index = this.customers.findIndex(cust => cust.tempId === arg0.id);
    this.customers.splice(index, 1);

    this.MainComponent.CUST_DTLS_GRID.setValue(Object.assign([], this.customers));
    this.updateCustomerTags();

    this.MainComponent.services.alert.showAlert(1, 'Customer deleted', 1000);
  }

  // Add Customer
  onAddCustomer(arg0: {}) {

    this.validateCustomerForm().then((errorCounts) => {
      if (errorCounts > 0) {
        this.MainComponent.services.alert.showAlert(2, 'Please correct form error(s)', 5000);
      } else {
        let customer = this.getFormCustomerDetails();

        if (this.editId) {
          let index = this.customers.findIndex(cust => cust.tempId === this.editId);
          this.customers[index] = customer;
        } else {
          customer.tempId = "ID-" + (this.counter++);
          this.customers.push(customer);
        }

        this.MainComponent.CUST_DTLS_GRID.setValue(Object.assign([], this.customers));
        this.updateCustomerTags();

        this.MainComponent.services.alert.showAlert(1, 'Customer added', 1000);
        this.resetCustomerDetails();
      }
    });

  }

  private updateCustomerTags() {
    let tags = [];
    this.customers.forEach(c => {
      tags.push({ label: c.customerType.value, text: c.firstName });
    });
    this.MainComponent.INIT_ACCORD.setTags("ACC_CUSTOMER", tags);
  }

  private getFormCustomerDetails(): Customer {
    let customer = new Customer();
    customer.customerType = this.getValueLabelFromDropdown(this.MainComponent.CD_CUST_TYPE);
    customer.CUST_TYPE_LBL = this.MainComponent.CD_CUST_TYPE.getFieldInfo();
    customer.existingCustomer = this.getValueLabelFromDropdown(this.MainComponent.CD_EXISTING_CUST);
    customer.CIF = this.MainComponent.CD_CIF.getFieldValue();
    customer.customerId = this.MainComponent.CD_CUSTOMER_ID.getFieldValue();
    customer.title = this.getValueLabelFromDropdown(this.MainComponent.CD_TITLE);
    customer.firstName = this.MainComponent.CD_FIRST_NAME.getFieldValue();
    customer.middleName = this.MainComponent.CD_MIDDLE_NAME.getFieldValue();
    customer.thirdName = this.MainComponent.CD_THIRD_NAME.getFieldValue();
    customer.lastName = this.MainComponent.CD_LAST_NAME.getFieldValue();
    customer.FULL_NAME = this.MainComponent.CD_FULL_NAME.getFieldValue();
    customer.gender = this.getValueLabelFromDropdown(this.MainComponent.CD_GENDER);
    customer.DOB = this.MainComponent.CD_DOB.getFieldValue();
    customer.taxId = this.MainComponent.CD_TAX_ID.getFieldValue();
    customer.mobileNumber = this.MainComponent.CD_MOBILE.getFieldValue();
    customer.debitScore = this.MainComponent.CD_DEBIT_SCORE.getFieldValue();
    customer.customerSegment = this.getValueLabelFromDropdown(this.MainComponent.CD_CUST_SGMT);
    customer.staff = this.getValueLabelFromDropdown(this.MainComponent.CD_STAFF);
    customer.staffId = this.MainComponent.CD_STAFF_ID.getFieldValue();
    customer.loanOwnership = this.MainComponent.CD_LOAN_OWNERSHIP.getFieldValue();

    return customer;
  }

  private resetCustomerDetails() {
    this.editId = undefined;

    this.customerFormFields.forEach(field => {
      this.MainComponent[field].setValue("");
      // this.MainComponent[field].onReset(); // Not working - Dropdown does not show values any further
    });
  }

  async validateCustomerForm() {
    var totalErrors = 0;

    this.customersFormMandatory.forEach(element => {
      let val = this.MainComponent[element].getFieldValue();
      if (val == '' || val == undefined) {
        totalErrors += 1;
        this.MainComponent[element].setError("Value cannot be empty");
      }
    });

    // OF Validation Breaks with error - Shifting to Local Validations
    // await Promise.all([
    //   this.MainComponent.revalidateBasicField('CD_CUST_TYPE'),
    //   this.MainComponent.revalidateBasicField('CD_TITLE'),
    //   this.MainComponent.revalidateBasicField('CD_FIRST_NAME'),
    //   this.MainComponent.revalidateBasicField('CD_LAST_NAME'),
    //   this.MainComponent.revalidateBasicField('CD_GENDER'),
    //   this.MainComponent.revalidateBasicField('CD_DOB')
    // ]).then((errorCounts) => {
    // 	errorCounts.forEach((errorCount) => {
    // 		totalErrors += errorCount;
    // 	});
    // });
    return totalErrors;
  }

  private getValueLabelFromDropdown(element: FieldComponent): ValueLabel {
    return new ValueLabel(element.getFieldValue(), element.getFieldInfo());
  }

  public getBorrowerPostData() {
    var CustData = [];
    if (this.customers) {
      for (var i = 0; i < this.customers.length; i++) {
        var tempObj = {};
        console.log("CustData   ", this.customers[i]);
        tempObj['CustomerType'] = this.customers[i].customerType.value;
        tempObj['ExistingCustomer'] = this.customers[i].existingCustomer.value;
        tempObj['CIF'] = this.customers[i].CIF;
        tempObj['Title'] = this.customers[i].title.value;
        tempObj['FirstName'] = this.customers[i].firstName;
        tempObj['middleName'] = this.customers[i].middleName;
        tempObj['LastName'] = this.customers[i].lastName;
        tempObj['FullName'] = this.customers[i].FULL_NAME;
        tempObj['Gender'] = this.customers[i].gender.value;
        tempObj['DOB'] = this.customers[i].dob;
        tempObj['TaxId'] = this.customers[i].taxId;
        tempObj['MobileNo'] = this.customers[i].mobileNumber;
        tempObj['DebitScore'] = this.customers[i].debitScore;
        tempObj['CustomerSegment'] = this.customers[i].customerSegment.value;
        tempObj['IsStaff'] = this.customers[i].staff.value;
        tempObj['StaffId'] = this.customers[i].staffId;
        CustData.push(tempObj);
      }
    }
    return CustData;
  }


}




class Customer {
  tempId: string;
  customerType: ValueLabel;
  CUST_TYPE_LBL: string; // label to support grid rendering
  existingCustomer: ValueLabel;
  CIF: string;
  customerId: string;
  title: ValueLabel;
  firstName: string;
  middleName: string;
  thirdName: string;
  lastName: string;
  FULL_NAME: string;
  gender: ValueLabel;
  DOB: string;
  taxId: string;
  mobileNumber: string;
  debitScore: string;
  customerSegment: ValueLabel;
  staff: ValueLabel;
  staffId: string;
  loanOwnership: string;

  constructor() { }
}

class ValueLabel {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

