export class CreditCardDetailsModel {
CCD_Branch: string;
CCD_CategoryOnPage: string;
CCD_Approved_Limit_: string;
CCD_Name_on_Card_: string;
CCD_Settlement_Account_Type: string;
CCD_Settle_Account_No_: string;
CCD_Payment_Option: string;
CCD_Statement_Dispatch_Mode: string;
CCD_Existing_Credit_Card: string;
CCD_Add_On_Required: string;
CCD_Name_: string;
CCD_Date_Of_Birth: string;
CCD_CID_No: string;
CCD_Relationship: string;
setValue(res){
if(res){
if(res['CCD_Branch']){this.CCD_Branch = res['CCD_Branch'];}
if(res['CCD_CategoryOnPage']){this.CCD_CategoryOnPage = res['CCD_CategoryOnPage'];}
if(res['CCD_Approved_Limit_']){this.CCD_Approved_Limit_ = res['CCD_Approved_Limit_'];}
if(res['CCD_Name_on_Card_']){this.CCD_Name_on_Card_ = res['CCD_Name_on_Card_'];}
if(res['CCD_Settlement_Account_Type']){this.CCD_Settlement_Account_Type = res['CCD_Settlement_Account_Type'];}
if(res['CCD_Settle_Account_No_']){this.CCD_Settle_Account_No_ = res['CCD_Settle_Account_No_'];}
if(res['CCD_Payment_Option']){this.CCD_Payment_Option = res['CCD_Payment_Option'];}
if(res['CCD_Statement_Dispatch_Mode']){this.CCD_Statement_Dispatch_Mode = res['CCD_Statement_Dispatch_Mode'];}
if(res['CCD_Existing_Credit_Card']){this.CCD_Existing_Credit_Card = res['CCD_Existing_Credit_Card'];}
if(res['CCD_Add_On_Required']){this.CCD_Add_On_Required = res['CCD_Add_On_Required'];}
if(res['CCD_Name_']){this.CCD_Name_ = res['CCD_Name_'];}
if(res['CCD_Date_Of_Birth']){this.CCD_Date_Of_Birth = res['CCD_Date_Of_Birth'];}
if(res['CCD_CID_No']){this.CCD_CID_No = res['CCD_CID_No'];}
if(res['CCD_Relationship']){this.CCD_Relationship = res['CCD_Relationship'];}
}
}
}