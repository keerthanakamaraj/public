export interface ICardMetaData {
    type: string;
    id: string;
    displayName: string;
    data: any;
}

export interface IGeneralCardData {
    isEnabled?: boolean;
    name: string;
    modalSectionName: string;//name of the component to be loaded
    data?: ICardListData[] | any;
    borrowerSeq?: number;
    applicationId?: number;
    componentCode?: string;
}

export interface ICardListData {
    title: string;
    subTitle: any; //completed|pending|deviation-> in case of type != basic AND text if type == basic
    type: "basic" | "icon" | "iconStatus" | "statusCount";
    modalSectionName?: string;//name of the section to be opened IN MODAL.
}

export interface IUwCustomerTab {
    BorrowerSeq: number,
    CD_CUSTOMER_NAME: string;
    CD_CUSTOMER_TYPE: string;
}
export interface IAmortizationForm{
    LoanAmountRequested?:any,
    NetInterestRate?:any,
    Tenure?:any,
    BLoanOwnership?:any,
    CBLoanOwnership?:any,
    BLoanAmtShare?:any,
    CBLoanAmountShare?:any,
    DisbursalDate?:any,
    ScheduleType?:any,
    RepaymentStartDate?:any,
    NoOfInstallments?:any,
    RequiredEMIAmt?:any,
    ApplicationId?:any
    InterestRate?:any
   // TenurePeriod?:any
  
  }

  export interface IRepaymentSchedule{
    loanAmount?:string,
    noOfInstallments?:string,
    installmentFrequency?:string,
    interestRate?:string,
    disbursalDate?:string,
    firstInstallmentDate?:string,
    interestNumerator?:string,
    interestDenominator?:string,
    productCode?:string,
    subProductCode?:string,
    maturityDate?:string,
    loanCalculationDate?:string
    repaymentScheduleType?:string
}


export interface IDeserializable {
    deserialize(input: any): this;
}

//used in cards
export interface ICardInfo {
    cardName: string;
    applicationId: number;
    borrowerSeq: number;
    componentCode: string;
}