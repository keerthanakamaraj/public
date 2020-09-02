import { any } from "@amcharts/amcharts4/.internal/core/utils/Array";

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
    canShowModal?: boolean;
}

export interface ICardListData {
    title: string;
    subTitle: any; //completed|pending|deviation-> in case of type != basic AND text if type == basic
    type: "basic" | "icon" | "iconStatus" | "statusCount";
    modalSectionName?: string;//name of the section to be opened IN MODAL.
    formatToCurrency?: boolean;//add currency type (symbol)
}

export interface IUwCustomerTab {
    BorrowerSeq: number,
    CD_CUSTOMER_NAME: string;
    CD_CUSTOMER_TYPE: string;
}
export interface IAmortizationForm {
    LoanAmountRequested?: any,
    NetInterestRate?: any,
    Tenure?: any,
    BLoanOwnership?: any,
    CBLoanOwnership?: any,
    BLoanAmtShare?: any,
    CBLoanAmountShare?: any,
    DisbursalDate?: any,
    ScheduleType?: any,
    RepaymentStartDate?: any,
    NoOfInstallments?: any,
    RequiredEMIAmt?: any,
    ApplicationId?: any,
    InterestRate?: any,
    InstallmentFrequency?: any,
    InstallmentFreqIndicator?: any,
    InstallmentFreqIndicatorCd?: any,
    TenurePeriod?: any,
    TenurePeriodCd?: any

}

export interface IRepaymentSchedule {
    loanAmount?: string,
    noOfInstallments?: string,
    installmentFrequency?: string,
    interestRate?: string,
    disbursalDate?: string,
    firstInstallmentDate?: string,
    interestNumerator?: string,
    interestDenominator?: string,
    productCode?: string,
    subProductCode?: string,
    maturityDate?: string,
    loanCalculationDate?: string,
    installmentFreqIndicator?: string
    tenure?: string,
    tenureIndecator?: string,
    requiredEMIAmt?: string
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

//used in multi date
export interface ISelectedDateRange {
    startDate?: Date;
    endDate?: Date;
}

export interface IheaderScoreCard {
    id: 'DBR' | 'Policy' | 'ScoreCard';
    type: string;
    score: number;
}

//used in every sections which are there in DDE(rloCommonDataService -> masterDataMap)
export interface IGlobalComponentLvlDataHandler {
    name: string;
    data: any;
    BorrowerSeq: number;
}
