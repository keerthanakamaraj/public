export class ServiceTypeMasterModel {
Code: string;
desc: string;
FieldId_30 : any;
setValue(res){
if(res){
if(res['Code']){this.Code = res['Code'];}
if(res['desc']){this.desc = res['desc'];}
if(res['FieldId_30']){this.FieldId_30 = res['FieldId_30'];}
}
}
}
