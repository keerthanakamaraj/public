export interface CustomerDtlsIntrface{
  SrNo?:any;
  BorrowerSeq?:any;
  CustomerType?:any;
  FullName?:any;
  CardNumber?:any;
  CardStatus?:any;
  LatestLimitDate?:any;
  ExistingCardLimit?:any;
  ExistingCashLimit?:any;
  RequestedCardLimit?:any;  //populated from customer section but noneditable
  RequestedCreditLimit?:any; //populated from customer section but editable
  ProposedCashLimit?:any;
}
