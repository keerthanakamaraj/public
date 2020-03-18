export class MyTrayFormModel {
MT_SLIDER: string;
setValue(res){
if(res){
if(res['MT_SLIDER']){this.MT_SLIDER = res['MT_SLIDER'];}
}
}
}
