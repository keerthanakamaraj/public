export interface DefaultDataInterface {
  city?:any,
  type?:any,
  customerSeq?:any,
  customerName?:any,
  customerType?:any,
  //AddressType?:any,
 // mobileNumber?:any,
 // VerificationType?:any
  verificationList?:verificationInterface[],
  mobileNumberflag?:boolean;
}

export interface verificationInterface{
verificationCode?:any,
details?:any,
}
