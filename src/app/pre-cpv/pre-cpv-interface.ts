import { any } from "@amcharts/amcharts4/.internal/core/utils/Array";

export interface DefaultDataInterface {
  city?:any;
  type?:any;
  customerSeq?:any;
  customerName?:any;
  customerType?:any;
  //AddressType?:any;
 // mobileNumber?:any;
 // VerificationType?:any
  verificationList?:verificationInterface[];
  mobileNumberflag?:boolean;
}

export interface verificationInterface{
verificationCode?:any;
details?:any;
ProposalVerificationID?:any
AgencyCode?:any;
VerificationStatus?:any;
SpecificInstructions?:any;
VerificationTxnId?:any;
VerificationType?:any;
VerificationWaived?:any;
City?:any;
}


export interface customerInterface{
  customerSeq?:any;
  customerType?:any;
  customerName?:any;
  verificationList?:verificationInterface[];
}
