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
 // TenurePeriod?:any

}

export interface IRepaymentScheduleResp{
  installmentDate:string,
  closingPrincipalBalance:string,
  installmentAmount:string,
  openPrincipalBalance:string,
  interestAmount:string,
  installmentNo:string,
  principalAmount:string,
  others:string
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
