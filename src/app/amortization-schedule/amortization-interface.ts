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
  RequiredEMIAmt?:any

}

export interface IRepaymentSchedule{
  installmentDate:string,
  closingPrincipalBalance:string,
  installmentAmount:string,
  openPrincipalBalance:string,
  interestAmount:string,
  installmentNo:string,
  principalAmount:string,
  others:string
}
