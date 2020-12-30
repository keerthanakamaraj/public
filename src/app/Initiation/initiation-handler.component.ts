import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { InitiationComponent } from './Initiation.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { RlouiService } from '../rlo-services/rloui.service';
import { RloCommonData } from '../rlo-services/rloCommonData.service';

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

  customersFormMandatory = ["CD_CUST_TYPE", "CD_TITLE", "CD_FIRST_NAME", "CD_LAST_NAME", "CD_DOB", "CD_GENDER", "CD_TAX_ID", "CD_MOBILE", "CD_LOAN_OWNERSHIP"];
  editTempId: any;
  tempId: any;
  fieldArray: any[];
  // allowLoanOwnership: boolean;


  constructor(rloui: RlouiService, rloCommonData: RloCommonData) {
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
    if ((this.MainComponent.BAD_PROD_CAT.getFieldValue() == undefined && this.MainComponent.BAD_PROD_CAT.getDefault() == 'CC') || (this.MainComponent.BAD_PROD_CAT.getFieldValue() == 'CC')) {
      this.MainComponent.isLoanCategory = false;
      //  this.MainComponent.CD_CUST_TYPE.setValue('B');
      //  this.MainComponent.CD_LOAN_OWNERSHIP.setValue(100);
      this.MainComponent.CD_CUST_TYPE.setReadOnly(true);
      //  this.MainComponent.CD_LOAN_OWNERSHIP.setValue(100);
      this.MainComponent.BAD_APP_PRPSE.mandatory = false;
      this.MainComponent.BAD_PRIME_USAGE.mandatory = true;
      this.MainComponent.CD_NAME_ON_CARD.mandatory = true;
      this.MainComponent.CD_CUST_TYPE.mandatory = false;
      this.MainComponent.CD_CARD_CUST_TYPE.mandatory = true;
      this.MainComponent.BAD_CARD_TYPE.mandatory = true;
      this.MainComponent.BAD_REQ_CARD_LIMIT.mandatory = true;
      // this.MainComponent.BAD_SRC_CHANNEL.setValue("BRANCH");
      // this.MainComponent.BAD_CUSTOMER_TYPE.setValue("I");
      // this.MainComponent.CD_DEBIT_SCORE.isHidden
    } else if (this.MainComponent.BAD_PROD_CAT.getDefault() == 'CC' && this.MainComponent.BAD_PROD_CAT.getFieldValue() !== 'CC') {
      this.MainComponent.isLoanCategory = true;
      this.MainComponent.CD_CUST_TYPE.setReadOnly(false);
      this.MainComponent.CD_CUST_TYPE.onReset();
      this.MainComponent.BAD_APP_PRPSE.mandatory = true;
      this.MainComponent.BAD_PRIME_USAGE.mandatory = false;
      this.MainComponent.CD_NAME_ON_CARD.mandatory = false;
      this.MainComponent.CD_LOAN_OWNERSHIP.setValue(undefined);
      this.MainComponent.CD_CUST_TYPE.mandatory = true;
      this.MainComponent.CD_CARD_CUST_TYPE.mandatory = false;
      this.MainComponent.BAD_CARD_TYPE.mandatory = false;
      this.MainComponent.BAD_REQ_CARD_LIMIT.mandatory = false;
      this.MainComponent.CD_LOAN_OWNERSHIP.setValue(100);
      this.MainComponent.CD_CUST_TYPE.setValue('B');
    }
  }

  //calcute Netincome 
  calculateNetIncome({ }) {
    let grossincome = this.MainComponent.LD_GROSS_INCOME.getFieldValue();
    let liability = this.MainComponent.LD_EXST_LBLT_AMT.getFieldValue();
    let otherDeduction = this.MainComponent.LD_OTH_DEDUCTIONS.getFieldValue();

    if (liability == undefined) {
      liability = 0;
    }
    if (otherDeduction == undefined) {
      otherDeduction = 0;
    }
    if (grossincome == undefined) {
      grossincome = 0;
    }

    grossincome = grossincome ? Number(grossincome) : grossincome;
    liability = liability ? Number(liability) : liability;
    otherDeduction = otherDeduction ? Number(otherDeduction) : otherDeduction;

    let liabityAndOtherDed = liability + otherDeduction;
    if (liability > grossincome || otherDeduction > grossincome || liabityAndOtherDed > grossincome) {
      this.MainComponent.LD_GROSS_INCOME.setError('rlo.error.grossIncome.invalid');
    } else {
      let netIncome = grossincome - liability - otherDeduction;
      // let DBR = (liability + otherDeduction) / grossincome;
      //this.MainComponent.LD_NET_INCOME.setValue(netIncome.toFixed(2));
      this.MainComponent.LD_NET_INCOME.setComponentSpecificValue(netIncome.toFixed(2), null);

      // this.MainComponent.LD_LTV_DBR.setValue(DBR.toFixed(2));
      this.MainComponent.LD_GROSS_INCOME.clearError();
    }
  }


  existingCustomer({ }) {
    // if (this.MainComponent.CD_EXISTING_CUST.getFieldValue() == null || this.MainComponent.CD_EXISTING_CUST.getFieldValue() == undefined
    //   || this.MainComponent.CD_EXISTING_CUST.getFieldValue() == '' || this.MainComponent.CD_EXISTING_CUST.getFieldValue() == 'N') {
    //   this.MainComponent.CD_CUSTOMER_ID.onReset();
    //   this.MainComponent.CD_CUSTOMER_ID.readOnly = true;
    // }
    // else {
    //   this.MainComponent.CD_CUSTOMER_ID.readOnly = false;
    // }

  }


  isStaff({ }) {
    // if (this.MainComponent.CD_STAFF.getFieldValue() == null || this.MainComponent.CD_STAFF.getFieldValue == undefined
    //   || this.MainComponent.CD_STAFF.getFieldValue() == '' || this.MainComponent.CD_STAFF.getFieldValue() == 'N') {
    //   this.MainComponent.CD_STAFF_ID.onReset();
    //   this.MainComponent.CD_STAFF_ID.readOnly = true;
    // }
    // else {
    //   this.MainComponent.CD_STAFF_ID.readOnly = false;
    // }
  }
  //onClickOfCheckElgibility
  onCheckEligibilityClick({ }) {
    this.MainComponent.LD_SYS_AMT_RCMD.onReset();
    //this.MainComponent.LD_SYS_AMT_RCMD.setValue(this.MainComponent.LD_LOAN_AMOUNT.getFieldValue());
    this.MainComponent.LD_SYS_AMT_RCMD.setComponentSpecificValue(this.MainComponent.LD_LOAN_AMOUNT.getFieldValue(), null);

    //this.MainComponent.revalidateBasicField('LD_SYS_AMT_RCMD');
    if (this.MainComponent.LD_GROSS_INCOME.getFieldValue() != undefined || this.MainComponent.LD_EXST_LBLT_AMT.getFieldValue() != undefined || this.MainComponent.LD_OTH_DEDUCTIONS.getFieldValue() != undefined) {
      let grossincome = this.MainComponent.LD_GROSS_INCOME.getFieldValue();
      let liability = this.MainComponent.LD_EXST_LBLT_AMT.getFieldValue();
      let otherDeduction = this.MainComponent.LD_OTH_DEDUCTIONS.getFieldValue();
      if (liability == undefined) {
        liability = 0;
      }
      if (otherDeduction == undefined) {
        otherDeduction = 0;
      }
      if (grossincome == undefined) {
        grossincome = 0;
      }

      grossincome = grossincome ? Number(grossincome) : grossincome;
      liability = liability ? Number(liability) : liability;
      otherDeduction = otherDeduction ? Number(otherDeduction) : otherDeduction;

      let DBR = (liability + otherDeduction) / grossincome;
      this.MainComponent.LD_LTV_DBR.setValue(DBR.toFixed(2));
    }
    let amount = this.MainComponent.LD_LOAN_AMOUNT.getFieldValue();
    let rate = this.MainComponent.LD_INTEREST_RATE.getFieldValue() / 1200;
    let months = this.MainComponent.LD_TENURE.getFieldValue();
    if (this.MainComponent.LD_TENURE_PERIOD.getFieldValue() == 'YRS') {
      let years = this.MainComponent.LD_TENURE.getFieldValue() * 12;
      months = years;
    } else if (this.MainComponent.LD_TENURE_PERIOD.getFieldValue() == 'WEEK') {
      let weeks = this.MainComponent.LD_TENURE.getFieldValue() / 4.345;
      months = weeks;
    }
    else if (this.MainComponent.LD_TENURE_PERIOD.getFieldValue() == 'DAY') {
      let weeks = this.MainComponent.LD_TENURE.getFieldValue() / 30.417;
      months = weeks;
    }
    let EMI = amount * rate / (1 - (Math.pow(1 / (1 + rate), months)));
    console.log("Loan EMI", EMI);
    //this.MainComponent.LD_EMI_AMT.setValue(EMI.toFixed(2));
    this.MainComponent.LD_EMI_AMT.setComponentSpecificValue(EMI.toFixed(2), null);
  }



  // Reset Customer Form
  onResetCustomer(arg: {}) {
    this.MainComponent.CD_CUST_TYPE.onReset();
    //  this.MainComponent.CD_EXISTING_CUST.onReset();
    //  this.MainComponent.CD_STAFF.onReset();
    this.MainComponent.CD_CIF.onReset();
    this.MainComponent.CD_TITLE.onReset();
    this.MainComponent.CD_FIRST_NAME.onReset();
    this.MainComponent.CD_MIDDLE_NAME.onReset();
    this.MainComponent.CD_LAST_NAME.onReset();
    this.MainComponent.CD_FULL_NAME.onReset();
    this.MainComponent.CD_GENDER.onReset();
    // this.MainComponent.CD_MOBILE.onReset();
    this.MainComponent.CD_TAX_ID.onReset();
    this.MainComponent.CD_DOB.onReset();
    this.MainComponent.CD_CUST_SGMT.onReset();
    this.MainComponent.CD_CUST_SUB_SGMT.onReset();
    this.MainComponent.CD_DEBIT_SCORE.onReset();
    this.MainComponent.CD_LOAN_OWNERSHIP.onReset();
    this.MainComponent.CD_EMAIL_ID.onReset();
    // this.MainComponent.CD_COUNTRY_CODE.onReset();
    this.MainComponent.CD_NAME_ON_CARD.onReset();
    this.MainComponent.CD_MOBILE.onResetMobileNo();

    //reset fields customerId and staffId  
    this.MainComponent.CD_CUSTOMER_ID.onReset();
    this.MainComponent.CD_STAFF_ID.onReset();
this.MainComponent.CD_TYPE_OF_INCORPORATION.onReset();
this.MainComponent.CD_DATE_OF_INCORPORATION.onReset();
this.MainComponent.CD_REGISTERED_NAME.onReset();

   // this.onProdCategoryChange({});

    //this.MainComponent.CD_EXISTING_CUST.setValue(this.MainComponent.CD_EXISTING_CUST.getDefault());
    this.existingCustomer({});

    //this.MainComponent.CD_STAFF.setValue(this.MainComponent.CD_STAFF.getDefault());
    this.isStaff({});
    this.DisableLoanOwnerShip();
  }

  // Add Full Name based on First Name, Middle Name, Third Name and Last Name
  updateFullName(arg0: {}) {
    // let fullName = "";
    // if (this.MainComponent.CD_FIRST_NAME.getFieldValue()) {
    //   fullName = fullName + this.MainComponent.CD_FIRST_NAME.getFieldValue().trim() + " ";
    // }
    // if (this.MainComponent.CD_MIDDLE_NAME.getFieldValue()) {
    //   fullName = fullName + this.MainComponent.CD_MIDDLE_NAME.getFieldValue().trim() + " ";
    // }
    // if (this.MainComponent.CD_THIRD_NAME.getFieldValue()) {
    //   fullName = fullName + this.MainComponent.CD_THIRD_NAME.getFieldValue().trim() + " ";
    // }
    // if (this.MainComponent.CD_LAST_NAME.getFieldValue()) {
    //   fullName = fullName + this.MainComponent.CD_LAST_NAME.getFieldValue().trim() + " ";
    // }
    // fullName.trim();
    // this.MainComponent.CD_FULL_NAME.setValue(fullName);
    let fullNameArr = [];
    fullNameArr.push(this.MainComponent.CD_FIRST_NAME.getFieldValue());
    fullNameArr.push(this.MainComponent.CD_MIDDLE_NAME.getFieldValue());
    fullNameArr.push(this.MainComponent.CD_THIRD_NAME.getFieldValue());
    fullNameArr.push(this.MainComponent.CD_LAST_NAME.getFieldValue());

    let fullName = this.MainComponent.services.rloutil.concatenate(fullNameArr, " ");

    console.log("Full Name  ", fullNameArr, fullName);

    this.MainComponent.CD_FULL_NAME.setValue(fullName);
  }

  // customerTypeStatus: boolean;
  enableFieldBasedOnCustomerType() {
    // console.log('BAD_CUSTOMER_TYPE :- ', this.MainComponent.BAD_CUSTOMER_TYPE.getFieldValue());
    // this.MainComponent.CD_CBS_CUST_ID.setHidden(true);
    if (this.MainComponent.BAD_CUSTOMER_TYPE.getFieldValue() === 'I') {
      console.log('Individual :- ', this.MainComponent.BAD_CUSTOMER_TYPE.getFieldValue());
      this.MainComponent.CD_REGISTERED_NAME.mandatory = false;
      this.MainComponent.CD_REGISTERED_NAME.setHidden(true);
      this.MainComponent.CD_TYPE_OF_INCORPORATION.setHidden(true);
      this.MainComponent.CD_DATE_OF_INCORPORATION.mandatory = false;
      this.MainComponent.CD_DATE_OF_INCORPORATION.setHidden(true);
      // this.MainComponent.CD_PAN_NUMBER.mandatory = false;
      // this.MainComponent.CD_PAN_NUMBER.setHidden(true);

      this.MainComponent.CD_FIRST_NAME.mandatory = true;
      this.MainComponent.CD_FIRST_NAME.setHidden(false);
      this.MainComponent.CD_MIDDLE_NAME.setHidden(false);
      this.MainComponent.CD_LAST_NAME.mandatory = true;
      this.MainComponent.CD_LAST_NAME.setHidden(false);
      this.MainComponent.CD_FULL_NAME.setHidden(false);
      // this.MainComponent.CD_TAX_ID.mandatory = true;
      // this.MainComponent.CD_TAX_ID.setHidden(false);
      this.MainComponent.CD_DOB.mandatory = true;
      this.MainComponent.CD_DOB.setHidden(false);
      this.MainComponent.CD_GENDER.mandatory = true;
      this.MainComponent.CD_GENDER.setHidden(false);
      this.MainComponent.CD_DEBIT_SCORE.setHidden(false);
    } else if (this.MainComponent.BAD_CUSTOMER_TYPE.getFieldValue() === 'C') {
      console.log('Corporate :- ', this.MainComponent.BAD_CUSTOMER_TYPE.getFieldValue());
      this.MainComponent.CD_REGISTERED_NAME.mandatory = true;
      this.MainComponent.CD_REGISTERED_NAME.setHidden(false);
      this.MainComponent.CD_TYPE_OF_INCORPORATION.setHidden(false);
      this.MainComponent.CD_DATE_OF_INCORPORATION.mandatory = true;
      this.MainComponent.CD_DATE_OF_INCORPORATION.setHidden(false);
      // this.MainComponent.CD_PAN_NUMBER.mandatory = true;
      // this.MainComponent.CD_PAN_NUMBER.setHidden(false);
     
      this.MainComponent.CD_FIRST_NAME.mandatory = false;
      this.MainComponent.CD_FIRST_NAME.setHidden(true);
      this.MainComponent.CD_MIDDLE_NAME.setHidden(true);
      this.MainComponent.CD_LAST_NAME.mandatory = false;
      this.MainComponent.CD_LAST_NAME.setHidden(true);
      this.MainComponent.CD_FULL_NAME.setHidden(true);
      // this.MainComponent.CD_TAX_ID.mandatory = false;
      // this.MainComponent.CD_TAX_ID.setHidden(true);
      this.MainComponent.CD_DOB.mandatory = false;
      this.MainComponent.CD_DOB.setHidden(true);
      this.MainComponent.CD_GENDER.mandatory = false;
      this.MainComponent.CD_GENDER.setHidden(true);
      this.MainComponent.CD_DEBIT_SCORE.setHidden(true);
      
    } else {
      // TODO....
    }
  }
  // Edit Customer
  onEditCustomer(arg0: { 'id': any; }) {
    // this.editId = undefined;
    this.editId = arg0.id;
    let customer = this.customers.find(cust => cust.tempId === arg0.id);

    // TODO: add logic to handle in loop

    this.MainComponent.CD_CUST_TYPE.setValue(customer.customerType.value, customer.customerType.label);
    //this.MainComponent.CD_EXISTING_CUST.setValue(customer.existingCustomer.value, customer.existingCustomer.label);
    this.existingCustomer({});
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
    this.MainComponent.CD_MOBILE.setComponentSpecificValue(customer.mobileNumber, customer.countryCode);
    this.MainComponent.CD_DEBIT_SCORE.setValue(customer.debitScore);
    this.MainComponent.CD_CUST_SGMT.setValue(customer.customerSegment.value, customer.customerSegment.label);

    this.MainComponent.CD_CUST_SUB_SGMT.setValue(customer.customerSubSegment.value, customer.customerSubSegment.label);
    // this.MainComponent.CD_STAFF.setValue(customer.staff.value, customer.staff.label);

    this.isStaff({});
    this.MainComponent.CD_STAFF_ID.setValue(customer.staffId);
    this.MainComponent.CD_LOAN_OWNERSHIP.setValue(customer.loanOwnership);
    this.MainComponent.CD_EMAIL_ID.setValue(customer.email);
    // this.MainComponent.CD_COUNTRY_CODE.setValue(customer.countryCode);
    this.MainComponent.CD_NAME_ON_CARD.setValue(customer.nameOnCard);

    this.tempId = customer.tempId
    if (this.MainComponent.allowCoBorrower.getFieldValue() == 'Y') {
      if ((this.MainComponent.CD_LOAN_OWNERSHIP.getFieldValue() == undefined && this.MainComponent.disableLoanOwnership == false)
        || (this.MainComponent.CD_LOAN_OWNERSHIP.getFieldValue() !== undefined)) {
        this.MainComponent.CD_LOAN_OWNERSHIP.setReadOnly(false);
      }
      else {
        this.MainComponent.CD_LOAN_OWNERSHIP.setReadOnly(true);
      }

    }

  }

  // Delete Customer
  onDeleteCustomer(arg0: { 'id': any; }) {

    let index = this.customers.findIndex(cust => cust.tempId === arg0.id);
    this.customers.splice(index, 1);

    this.MainComponent.CUST_DTLS_GRID.setValue(Object.assign([], this.customers));
    this.updateCustomerTags();
    this.DisableLoanOwnerShip();
    this.MainComponent.services.alert.showAlert(1, 'rlo.success.delete.customer', 1000);
  }

  // Add Customer
  async onAddCustomer(arg0: {}) {
    var noofErrors: number = await this.MainComponent.revalidateCustomers();
    if (noofErrors > 0) {
      this.MainComponent.services.alert.showAlert(2, 'rlo.error.formdetails.invalid', 5000);
      //  console.log( "NativeElement",this.MainComponent.ACC_CUSTOMER.nativeElement.value);
      //  this.MainComponent.ACC_CUSTOMER.nativeElement.focus();

    } else {
      if (this.MainComponent.BAD_PROD_CAT.getFieldValue() == undefined) {
        this.MainComponent.services.alert.showAlert(2, 'rlo.error.ProductCategory.invalid', 5000);
        return;
      } else if (this.MainComponent.BAD_SCHEME.getFieldValue() == undefined && this.MainComponent.BAD_PROD_CAT.getFieldValue() != 'CC') {
        this.MainComponent.services.alert.showAlert(2, 'rlo.error.Scheme.invalid', 5000);
        return;
      }
      let customer = this.getFormCustomerDetails();
      customer.tempId = "ID-" + (this.counter++);
      console.log("this.customers before adding", this.customers);

      for (let i = 0; i < this.customers.length; i++) {

        if (this.customers[i].tempId !== this.editId) {
          if (customer.customerType.value == 'B') {
            if (this.customers[i].customerType.value == 'B' && this.customers[i].tempId !== this.editId) {
              this.MainComponent.services.alert.showAlert(2, 'rlo.error.Borrower.exist', -1);
              return;
            }
          }
          if (this.customers[i].FULL_NAME == this.MainComponent.CD_FULL_NAME.getFieldValue() && this.customers[i].DOB == this.MainComponent.CD_DOB.getFieldValue()) {
            this.MainComponent.services.alert.showAlert(2, 'rlo.error.customer.exist', -1);
            return;
          }
        }
      }

      if (this.editId) {
        let index = this.customers.findIndex(cust => cust.tempId === this.editId);
        this.customers[index] = customer;
        console.log("updating customers", this.customers);

      } else {

        this.customers.push(customer);
        this.tempId = undefined;
        console.log("this.customers", this.customers);
      }

      this.MainComponent.CUST_DTLS_GRID.setValue(Object.assign([], this.customers));
      this.updateCustomerTags();
      if (this.editId) {
        this.MainComponent.services.alert.showAlert(1, 'rlo.success.update.customer', 1000);
      } else {
        this.MainComponent.services.alert.showAlert(1, 'rlo.success.save.customer', 1000);

      }
      this.resetCustomerDetails();
      this.DisableLoanOwnerShip();
    }
  }

  updateCustomerTags() {
    let tags = [];
    this.customers.forEach(c => {
   //   tags.push({ label: c.customerType.value, text: c.firstName });
   if(c.customerType.value=='B' && this.MainComponent.BAD_PROD_CAT.getFieldValue()=='CC'){
    tags.push({ label: 'P', text: c.firstName });
  }else{
  tags.push({ label: c.customerType.value, text: c.firstName });
  }
    });
    this.MainComponent.INIT_ACCORD.setTags("ACC_CUSTOMER", tags);
  }
  updateAmountTags() {
    let displayTag = [];
    let val = this.MainComponent.LD_LOAN_AMOUNT.getFieldValue()
    console.log(val);
    if (this.MainComponent.LD_LOAN_AMOUNT.getFieldValue() !== undefined) {
      if (this.MainComponent.LD_LOAN_AMOUNT.getFieldValue().length)
        displayTag.push(this.formatAmount(this.MainComponent.LD_LOAN_AMOUNT.getFieldValue()))
    }

    if (this.MainComponent.LD_INTEREST_RATE.getFieldValue() !== undefined && this.MainComponent.LD_MARGIN_RATE.getFieldValue() !== undefined) {
      displayTag.push(this.MainComponent.LD_NET_INTEREST_RATE.getFieldValue() + "" + "%" + " " + "pa")
    }
    if (this.MainComponent.LD_TENURE.getFieldValue() !== undefined && this.MainComponent.LD_TENURE_PERIOD.getFieldValue() !== undefined) {
      displayTag.push(this.MainComponent.LD_TENURE.getFieldValue() + " " + this.MainComponent.LD_TENURE_PERIOD.getFieldInfo());
    }

    let tags = [];
    displayTag.forEach(tag => {
      tags.push({ text: tag });
    })

    this.MainComponent.INIT_ACCORD.setTags("ACC_LOAN_DTLS", tags);
  }

  updateLoanTag() {
    let loantag = []
    let tags = [];

    if (this.MainComponent.BAD_PROD_CAT.getFieldValue() !== undefined) {
      tags.push({ label: this.MainComponent.BAD_PROD_CAT.getFieldValue(), text: this.MainComponent.BAD_PROD_CAT.getFieldInfo() })
    }

    this.MainComponent.INIT_ACCORD.setTags("ACC_APPLICATION", tags);
  }

  // updateInterestTags(){
  //   let tags = [];
  //   tags.push({ text:this.MainComponent.LD_INTEREST_RATE.getFieldValue()});
  //   this.MainComponent.INIT_ACCORD.setTags("ACC_LOAN_DTLS",tags);
  // }
  // updateTenureTags(){
  //   let tags = [];
  //   if(this.MainComponent.LD_TENURE !== undefined && this.MainComponent.LD_TENURE_PERIOD !== undefined){
  //     tags.push({ text:this.MainComponent.LD_TENURE.getFieldValue() + " " + this.MainComponent.LD_TENURE_PERIOD.getFieldInfo()});
  //     this.MainComponent.INIT_ACCORD.setTags("ACC_LOAN_DTLS",tags);
  //   }

  // }



  private getFormCustomerDetails(): Customer {
    let customer = new Customer();

    if (this.MainComponent.BAD_PROD_CAT.getFieldValue() !== 'CC') {
      customer.customerType = this.getValueLabelFromDropdown(this.MainComponent.CD_CUST_TYPE);
      customer.CUST_TYPE_LBL = this.MainComponent.CD_CUST_TYPE.getFieldInfo();
    } else { // Credit Card Customer
      customer.customerType = this.getValueLabelFromDropdown(this.MainComponent.CD_CARD_CUST_TYPE);
      customer.CUST_TYPE_LBL = this.MainComponent.CD_CARD_CUST_TYPE.getFieldInfo();
    }

    //customer.existingCustomer = this.getValueLabelFromDropdown(this.MainComponent.CD_EXISTING_CUST);
    //customer.staff = this.getValueLabelFromDropdown(this.MainComponent.CD_STAFF);
    //customer.CIF = this.MainComponent.CD_CIF.getFieldValue();
    //customer.customerId = this.MainComponent.CD_CUSTOMER_ID.getFieldValue();

    //custom
    customer.existingCustomer = new ValueLabel("Y", "Yes");//default to Y for canara bank demo
    customer.CIF = this.MainComponent.CD_CIF.getFieldValue();
    customer.customerId = this.MainComponent.CD_CUSTOMER_ID.getFieldValue();
    customer.staff = new ValueLabel("Y", "Yes");//default to Y for canara bank demo
    customer.staffId = this.MainComponent.CD_STAFF_ID.getFieldValue();

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

    customer.customerSubSegment = this.getValueLabelFromDropdown(this.MainComponent.CD_CUST_SUB_SGMT);
    // customer.staff = this.getValueLabelFromDropdown(this.MainComponent.CD_STAFF);
    // customer.staffId = this.MainComponent.CD_STAFF_ID.getFieldValue();

    customer.loanOwnership = this.MainComponent.CD_LOAN_OWNERSHIP.getFieldValue();
    customer.email = this.MainComponent.CD_EMAIL_ID.getFieldValue();
    customer.countryCode = this.MainComponent.CD_MOBILE.countryCode;
    customer.nameOnCard = this.MainComponent.CD_NAME_ON_CARD.getFieldValue();
    customer.registeredName = this.MainComponent.CD_REGISTERED_NAME.getFieldValue();
    customer.typeofIncorporation = this.MainComponent.CD_TYPE_OF_INCORPORATION.getFieldValue();
    customer.dateOfIncorporation = this.MainComponent.CD_DATE_OF_INCORPORATION.getFieldValue();
    
    customer.tempId = this.tempId;
    return customer;
  }

  private resetCustomerDetails() {
    this.editId = undefined;

    // this.customerFormFields.forEach(field => {
    //   this.MainComponent[field].setValue(undefined);
    //   // this.MainComponent[field].onReset(); // Not working - Dropdown does not show values any further
    // });

    this.onResetCustomer({});
  }

  // async validateCustomerForm() {
  //   var totalErrors = 0;

  //   this.customersFormMandatory.forEach(element => {
  //     let val = this.MainComponent[element].getFieldValue();
  //     if (val == '' || val == undefined) {
  //       totalErrors += 1;
  //       this.MainComponent[element].setError("Value cannot be empty");
  //     }
  //   });


  //   // OF Validation Breaks with error - Shifting to Local Validations
  //   // await Promise.all([
  //   //   this.MainComponent.revalidateBasicField('CD_CUST_TYPE'),
  //   //   this.MainComponent.revalidateBasicField('CD_TITLE'),
  //   //   this.MainComponent.revalidateBasicField('CD_FIRST_NAME'),
  //   //   this.MainComponent.revalidateBasicField('CD_LAST_NAME'),
  //   //   this.MainComponent.revalidateBasicField('CD_GENDER'),
  //   //   this.MainComponent.revalidateBasicField('CD_DOB')
  //   // ]).then((errorCounts) => {
  //   // 	errorCounts.forEach((errorCount) => {
  //   // 		totalErrors += errorCount;
  //   // 	});
  //   // });
  //   return totalErrors;
  // }

  private getValueLabelFromDropdown(element: FieldComponent): ValueLabel {
    return new ValueLabel(element.getFieldValue(), element.getFieldInfo());
  }

  public getBorrowerPostData() {
    var CustData = [];
    if (this.customers) {
      for (var i = 0; i < this.customers.length; i++) {
        var tempObj = {};
        console.log("CustData", this.customers[i]);
        tempObj['CustomerType'] = this.customers[i].customerType.value;
        tempObj['ExistingCustomer'] = this.customers[i].existingCustomer.value;
        tempObj['CIF'] = this.customers[i].CIF;
        tempObj['Title'] = this.customers[i].title.value;
        tempObj['FirstName'] = this.customers[i].firstName;
        tempObj['MiddleName'] = this.customers[i].middleName;
        tempObj['LastName'] = this.customers[i].lastName;
        tempObj['FullName'] = this.customers[i].FULL_NAME;
        tempObj['Gender'] = this.customers[i].gender.value;
        tempObj['DOB'] = this.customers[i].DOB;
        tempObj['TaxID'] = this.customers[i].taxId;
        tempObj['MobileNo'] = this.customers[i].mobileNumber;
        tempObj['DebitScore'] = this.customers[i].debitScore;
        tempObj['CustomerSegment'] = this.customers[i].customerSegment.value;
        tempObj['CustSubSegment'] = this.customers[i].customerSubSegment.value;
        tempObj['IsStaff'] = this.customers[i].staff.value;
        tempObj['StaffID'] = this.customers[i].staffId;
        tempObj['ICIFNumber'] = this.customers[i].customerId;
        // tempObj['LoanOwnership'] = this.customers[i].loanOwnership;
        tempObj['Email'] = this.customers[i].email;
        tempObj['ISDCountryCode'] = this.customers[i].countryCode;
        tempObj['PrimaryEmbosserName1'] = this.customers[i].nameOnCard;

        // Corporate fields data
        tempObj['TypeOfIncorporation'] = this.customers[i].typeofIncorporation;
        tempObj['DateOfIncorporation'] = this.customers[i].dateOfIncorporation;
        tempObj['taxId'] = this.customers[i].panNumber;
        tempObj['RegisteredName'] = this.customers[i].registeredName;
        


        if (this.customers[i].customerType.value == 'B' && this.MainComponent.BAD_PROD_CAT.getFieldValue() == 'CC') {
          tempObj['LoanOwnership'] = 100;
        } else {
          tempObj['LoanOwnership'] = this.customers[i].loanOwnership;
        }

        CustData.push(tempObj);

      }

    }
    if (this.MainComponent.RD_REFERRER_NAME.getFieldValue() !== undefined) {
      CustData.push({
        CustomerType: 'R',
        FullName: this.MainComponent.RD_REFERRER_NAME.getFieldValue(),
        MobileNo: this.MainComponent.RD_REFERRER_NO.getFieldValue(),
        CIF: this.MainComponent.REF_CIF.getFieldValue(),
        ISDCountryCode: this.MainComponent.RD_REFERRER_NO.countryCode
      });
    }


    return CustData;
  }

  resetLoanInformation() {
    this.MainComponent.LD_LOAN_AMOUNT.onReset();
    this.MainComponent.LD_INTEREST_RATE.onReset();
    this.MainComponent.LD_TENURE.onReset();
    this.MainComponent.LD_TENURE_PERIOD.onReset();
    this.MainComponent.BAD_APP_PRPSE.onReset();
    this.MainComponent.BAD_PRIME_USAGE.onReset()
    this.MainComponent.LD_GROSS_INCOME.onReset();
    this.MainComponent.LD_EXST_LBLT_AMT.onReset();
    this.MainComponent.LD_OTH_DEDUCTIONS.onReset();
    this.MainComponent.LD_NET_INCOME.onReset();
    this.MainComponent.LD_SYS_AMT_RCMD.onReset();
    this.MainComponent.LD_USR_RCMD_AMT.onReset();
    this.MainComponent.LD_LTV_DBR.onReset();
    this.MainComponent.LD_EMI_AMT.onReset();
    this.updateAmountTags();

  }

  resetReferalInformation() {
    this.MainComponent.RD_REFERRER_NAME.onReset();
    this.MainComponent.RD_REFERRER_NO.onReset();
  }

  resetSearchBox() {
    this.MainComponent.SRC_MOBILE_NO.onReset();
    this.MainComponent.SRC_TAX_ID.onReset();
    this.MainComponent.SRC_CIF_NO.onReset();

  }
  aggregateLoanOwnerShip() {
    var total = 0
    for (let i = 0; i < this.customers.length; i++) {
      if (this.customers[i].loanOwnership !== undefined && this.customers[i].loanOwnership !== "" && this.customers[i].tempId !== this.editId) {
        total += Number(this.customers[i].loanOwnership);
      }
    }
    return total;
  }

  CustomerTypeOnChange() {
    if (this.MainComponent.CD_CUST_TYPE.getFieldValue() == 'B' && this.MainComponent.BAD_PROD_CAT.getFieldValue() !== 'CC') {
      this.MainComponent.CD_LOAN_OWNERSHIP.mandatory = true;
    } else {
      this.MainComponent.CD_LOAN_OWNERSHIP.mandatory = false;
    }
  }
  AllowLoanOwnership() {
    if (this.MainComponent.allowCoBorrower.getFieldValue() == 'Y') {
      this.MainComponent.CD_LOAN_OWNERSHIP.setReadOnly(false);
      this.MainComponent.disableLoanOwnership = false;

    } else {
      this.MainComponent.disableLoanOwnership = true;
      this.MainComponent.CD_LOAN_OWNERSHIP.setReadOnly(true);
    }
  }

  DisableLoanOwnerShip() {
    for (let i = 0; i < this.customers.length; i++) {

      if (this.customers[i].customerType.value == 'CB' && this.customers[i].loanOwnership !== undefined) {
        this.MainComponent.disableLoanOwnership = true;

        if (this.MainComponent.disableLoanOwnership == true) {
          this.MainComponent.CD_LOAN_OWNERSHIP.setReadOnly(true);
        } else {
          this.MainComponent.CD_LOAN_OWNERSHIP.setReadOnly(false);
        }
        return;
      } else {
        this.MainComponent.disableLoanOwnership = false;
      }
    }
  }

  CalculateNetInterestRate() {
    let CalculateNetInterest;
    if (this.MainComponent.LD_INTEREST_RATE.getFieldValue() !== undefined && this.MainComponent.LD_MARGIN_RATE.getFieldValue() !== undefined) {
      //  let store : string ;
      if (this.MainComponent.LD_MARGIN_RATE.getFieldValue().startsWith('+')) {
        const storePositive = this.MainComponent.LD_MARGIN_RATE.getFieldValue().split("+").join(0);
        CalculateNetInterest = Number(this.MainComponent.LD_INTEREST_RATE.getFieldValue()) + Number(storePositive)
      }

      else if (this.MainComponent.LD_MARGIN_RATE.getFieldValue().startsWith('-')) {
        const storeNegative = this.MainComponent.LD_MARGIN_RATE.getFieldValue().split("-").join(0);
        CalculateNetInterest = Number(this.MainComponent.LD_INTEREST_RATE.getFieldValue()) - Number(storeNegative)
      } else {
        CalculateNetInterest = Number(this.MainComponent.LD_INTEREST_RATE.getFieldValue()) + Number(this.MainComponent.LD_MARGIN_RATE.getFieldValue())
      }

      this.MainComponent.LD_NET_INTEREST_RATE.setValue(CalculateNetInterest.toFixed(2));

    }

  }


  // fieldArrayFunction(){
  //   this.fieldArray = []
  //   this.fieldArray.push(this.MainComponent.LD_LOAN_AMOUNT,this.MainComponent.LD_INTEREST_RATE,
  //   this.MainComponent.LD_MARGIN_RATE,this.MainComponent.LD_NET_INTEREST_RATE,this.MainComponent.LD_TENURE,
  //   this.MainComponent.LD_TENURE_PERIOD,this.MainComponent.LD_GROSS_INCOME,this.MainComponent.LD_EXST_LBLT_AMT,
  //   this.MainComponent.LD_OTH_DEDUCTIONS,this.MainComponent.LD_NET_INCOME,this.MainComponent.LD_SYS_AMT_RCMD,
  //   this.MainComponent.LD_USR_RCMD_AMT,this.MainComponent.LD_LTV_DBR,this.MainComponent.LD_EMI_AMT,
  //   this.MainComponent.BAD_PHYSICAL_FRM_NO,this.MainComponent.BAD_DATE_OF_RCPT,this.MainComponent.BAD_DSA_ID,
  //   this.MainComponent.BAD_BRANCH,this.MainComponent.BAD_SRC_CHANNEL)

  // }
  formatAmount(number) {
    if (number) {
      return this.MainComponent.services.formatAmount(number, null, null, false);
    } else {
      return '-';
    }
  }
  CardNumberEnable() {
    if (this.MainComponent.BAD_CARD_TYPE.getFieldValue() == 'ICNP') {
      this.MainComponent.BAD_CARD_NUMBER.setHidden(false);
      this.MainComponent.BAD_CARD_NUMBER.mandatory = true;

      this.MainComponent.BAD_PRODUCT.onReset();
      this.MainComponent.BAD_SUB_PROD.onReset();
      this.MainComponent.BAD_SCHEME.onReset();
      this.MainComponent.BAD_PRODUCT.setReadOnly(true);
      this.MainComponent.BAD_SUB_PROD.setReadOnly(true);
      this.MainComponent.BAD_SCHEME.setReadOnly(true);
    }
    else {
      this.MainComponent.BAD_CARD_NUMBER.setHidden(true);
      this.MainComponent.BAD_CARD_NUMBER.mandatory = false;

      this.MainComponent.BAD_PRODUCT.onReset();
      this.MainComponent.BAD_SUB_PROD.onReset();
      this.MainComponent.BAD_SCHEME.onReset();
      this.MainComponent.BAD_PRODUCT.setReadOnly(false);
      this.MainComponent.BAD_SUB_PROD.setReadOnly(false);
      this.MainComponent.BAD_SCHEME.setReadOnly(false);
    }
  }
  HideFieldBasedOnCorporate(){
  if(this.MainComponent.BAD_CUSTOMER_TYPE.getFieldValue() == 'C' && this.MainComponent.CD_CARD_CUST_TYPE.getFieldValue() == 'B'){
    this.MainComponent.CD_REGISTERED_NAME.setHidden(false);
    this.MainComponent.CD_TYPE_OF_INCORPORATION.setHidden(false);
    this.MainComponent.CD_DATE_OF_INCORPORATION.setHidden(false);
    this.MainComponent.CD_FIRST_NAME.setHidden(true);
    this.MainComponent.CD_MIDDLE_NAME.setHidden(true);
    this.MainComponent.CD_LAST_NAME.setHidden(true);
    this.MainComponent.CD_DOB.setHidden(true);
    this.MainComponent.CD_FULL_NAME.setHidden(true);
    this.MainComponent.CD_GENDER.setHidden(true);
    this.MainComponent.CD_FIRST_NAME.setValue(undefined);
    this.MainComponent.CD_MIDDLE_NAME.setValue(undefined);
    this.MainComponent.CD_LAST_NAME.setValue(undefined);
    this.MainComponent.CD_DOB.setValue(undefined);
    this.MainComponent.CD_FULL_NAME.setValue(undefined);
    this.MainComponent.CD_GENDER.setValue(undefined);
    this.MainComponent.CD_FIRST_NAME.mandatory = false;
    this.MainComponent.CD_LAST_NAME.mandatory = false;
    this.MainComponent.CD_GENDER.mandatory = false;
    this.MainComponent.CD_REGISTERED_NAME.mandatory = true;
    this.MainComponent.CD_DATE_OF_INCORPORATION.mandatory = true;
    this.MainComponent.CD_STAFF_ID.setHidden(true);
    
  }
  else{
    this.MainComponent.CD_REGISTERED_NAME.setHidden(true);
    this.MainComponent.CD_TYPE_OF_INCORPORATION.setHidden(true);
    this.MainComponent.CD_DATE_OF_INCORPORATION.setHidden(true);
    this.MainComponent.CD_FIRST_NAME.setHidden(false);
    this.MainComponent.CD_MIDDLE_NAME.setHidden(false);
    this.MainComponent.CD_LAST_NAME.setHidden(false);
    this.MainComponent.CD_DOB.setHidden(false);
    this.MainComponent.CD_FULL_NAME.setHidden(false);
    this.MainComponent.CD_GENDER.setHidden(false);
    this.MainComponent.CD_REGISTERED_NAME.setValue(undefined);
    this.MainComponent.CD_TYPE_OF_INCORPORATION.setValue(undefined);
    this.MainComponent.CD_DATE_OF_INCORPORATION.setValue(undefined);
    this.MainComponent.CD_FIRST_NAME.mandatory = true;
    this.MainComponent.CD_LAST_NAME.mandatory = true;
    this.MainComponent.CD_GENDER.mandatory = true;
    this.MainComponent.CD_REGISTERED_NAME.mandatory = false;
    this.MainComponent.CD_DATE_OF_INCORPORATION.mandatory = false;
    

    
    
  }

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
  customerSubSegment: ValueLabel;
  staff: ValueLabel;
  staffId: string;
  loanOwnership: string;
  email: any;
  countryCode: any;
  nameOnCard: any;
  cbsCustId: string;
  registeredName: string;
  typeofIncorporation: string;
  dateOfIncorporation: string;
  panNumber: string;

  constructor() { }
}

class ValueLabel {
  value: string;
  label: string;


  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }


  CustomerType

}

