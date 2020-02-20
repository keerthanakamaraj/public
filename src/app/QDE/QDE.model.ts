export class QDEModel {
FieldId_1 : any;
FieldId_2 : any;
FieldId_4 : any;
FieldId_5 : any;
FieldId_7 : any;
setValue(res){
if(res){
if(res['FieldId_1']){this.FieldId_1 = res['FieldId_1'];}
if(res['FieldId_2']){this.FieldId_2 = res['FieldId_2'];}
if(res['FieldId_4']){this.FieldId_4 = res['FieldId_4'];}
if(res['FieldId_5']){this.FieldId_5 = res['FieldId_5'];}
if(res['FieldId_7']){this.FieldId_7 = res['FieldId_7'];}
}
}
}