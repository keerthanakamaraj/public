export interface verificationInterface {
  verificationCode?: any;
  details?: any;
  ProposalVerificationID?: any
  AgencyCode?: any;
  VerificationStatus?: any;
  SpecificInstructions?: any;
  VerificationTxnId?: any;
  VerificationType?: any;
  VerificationWaived?: any;
  City?: any;
  EcpvDecision?: any;
  VerificationRemark?: any;
  OverallAssessment?: any;
  CPVSummarization?: any;
  rowNumber?: number;
  RedoVersion?: any;
  RedoAddressLine1?: any;
  RedoAddressLine2?: any;
  RedoAddressLine3?: any;
  RedoAddressLine4?: any;
  RedoPhoneNumber?: any;
  RedoDate?: any;
  RedoCity?: any;
  RedoPinCode?: any;
  RedoSpecificInstructions?: any;
  DecisionType?: any;
  RLODecision?: any;
  DecisionRemarks?: any;
  AddressSequence?:number;
}


export interface customerInterface {
  customerSeq?: any;
  customerType?: any;
  customerName?: any;
  verificationList?: verificationInterface[];
}
