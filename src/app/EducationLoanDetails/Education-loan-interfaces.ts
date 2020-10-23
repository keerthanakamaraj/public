export interface CostOrFundsInterface {
  SrNo?: any,
  ApplicationId?: any,
  TransactionType?: any,
  TransactionDescription?: any,
  CreatedBy?: any,
  LoanSummSeq?: any,
  Amount?: any,
  EdTransactionSeq?: any,
  UpdatedBy?: any,
  Version?: any,
  Currency?: any,
  UpdatedOn?: any,
  CreatedOn?: any,
  CurrencyEquivalentAmt?: any,
  mstId?: string,
  mstText?: string
}
export interface MstDescriptionInterface {
  id?: string,
  text?: string,
}

export interface PastEducationInterface {
  ApplicationId?: any
  PastEdSeq?: any,
  Scholarships?: any,
  ClassObtained?: any,
  LoanSummSeq?: any,
  ExamPassed?: any,
  PassingYear?: any,
  Institution?: any,
  MarksPercent?: any,
  Version?: any,
  CreatedBy?: any,
  CreatedOn?: any,
  UpdatedBy?: any,
  UpdatedOn?: any,
}

export interface PursuingCourseInterface{
  SecInstituteName:any;
  PrContactPerson:any;
  PrPincode:any;
  PrAdmissionThrough:any;
  PrCity:any;
  PrAddress:any;
  PrCourseRank:any;
  PrState:any;
  PrAdmissionStatus:any;
  PrCourseFor:any;
  UpdatedBy:any;
  PrCourseType:any;
  Version:any;
  UpdatedOn:any;
  CreatedOn:any;
  SecCourseName:any;
  CreatedBy:any;
  PursuingCourseSeq:any;
  LoanSummSeq:any;
  PrRegion:any;
  PrCourseName:any;
  PrCountry:any;
  PrCourseStartDt:any;
  PrRecognizedAuthority:any;
  PrCourseCategory:any;
  SecAddress:any;
  SecCourseEndDate:any;
  ApplicationId:any;
  PrInstituteName:any;
  PrCourseEndDt:any;
  SecCourseFlag:any;
}

export interface EducationLoanSummary{
  EducationLoanSummSeq?:any;
  ApplicationId?:any;
  Currency?:any;
  MoratoriumAfterCourse?:any;
  MoratoriumDuringCourse?:any;
  TotalCost?:any;
  TotalCostEq?:any;
  TotalFund?:any;
  TotalFundEq?:any;
  InterestCapitalizedFlag?:any;
  UpdatedOn?:any;
  CreatedOn?:any;
  CreatedBy?:any;
  UpdatedBy?:any;
}
