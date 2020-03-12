export class AssetDetailsFormModel {
AT_ASSET_TYPE: string;
AT_ASSET_SUBTYPE: string;
AT_ASSET_LOCATION: string;
AT_ASSET_STATUS: string;
AT_ASSET_VALUE: string;
AT_FAIR_MRKT_VALUE: string;
AT_CURRENCY: string;
AT_EQUIVALENT_AMOUNT: string;
AT_OWNED_BY: string;
AT_NAME: string;
AT_INCLUDE_IN_DBR: string;
setValue(res){
if(res){
if(res['AT_ASSET_TYPE']){this.AT_ASSET_TYPE = res['AT_ASSET_TYPE'];}
if(res['AT_ASSET_SUBTYPE']){this.AT_ASSET_SUBTYPE = res['AT_ASSET_SUBTYPE'];}
if(res['AT_ASSET_LOCATION']){this.AT_ASSET_LOCATION = res['AT_ASSET_LOCATION'];}
if(res['AT_ASSET_STATUS']){this.AT_ASSET_STATUS = res['AT_ASSET_STATUS'];}
if(res['AT_ASSET_VALUE']){this.AT_ASSET_VALUE = res['AT_ASSET_VALUE'];}
if(res['AT_FAIR_MRKT_VALUE']){this.AT_FAIR_MRKT_VALUE = res['AT_FAIR_MRKT_VALUE'];}
if(res['AT_CURRENCY']){this.AT_CURRENCY = res['AT_CURRENCY'];}
if(res['AT_EQUIVALENT_AMOUNT']){this.AT_EQUIVALENT_AMOUNT = res['AT_EQUIVALENT_AMOUNT'];}
if(res['AT_OWNED_BY']){this.AT_OWNED_BY = res['AT_OWNED_BY'];}
if(res['AT_NAME']){this.AT_NAME = res['AT_NAME'];}
if(res['AT_INCLUDE_IN_DBR']){this.AT_INCLUDE_IN_DBR = res['AT_INCLUDE_IN_DBR'];}
}
}
}