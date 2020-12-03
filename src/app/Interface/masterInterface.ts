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
  accountDetails?: IAccountDetails[];//used for 'Customer 360' -> Relationship Details
  customerList?: any;
  interfaceDataList?: any;
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
  requiredEMIAmt?: string,
  FreqIndctrDesc?: string
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

export interface ICustomSearchObject {
  mobileNumber?: any;
  firstName?: string;
  lastName?: string;
  taxId?: any;
  customerId?: any;
  cifId?: any;//both can have values bt either customerId or CIFNumber values to be used depending upon the customerSearchType
  dob?: any;
  staffId?: any;
  searchType?: 'Internal' | 'External';
}

export interface IAccountDetails {
  AccountNo?: any;
  AccountStatus?: any;
  AccountType?: any;
  AvailableBalance?: any;
  OpeningDate?: any;
}

export interface IInterfaceListData {
  type: string;
  class: string;
  data?: any;
}

export interface IInterfaceDataIndicator {
  type: string;
  title: string;
  subTitle: string;
  modalSectionName: string;
}

export interface IPopUpModalResponse {
  action?: "btn-submit" | "btn-close" | "icon-close";
  response?: any;
}

export interface IUnderwriterActionObject {
  action?: "sentBack" | "approve" | "withdraw";
  componentCode? : any;
}