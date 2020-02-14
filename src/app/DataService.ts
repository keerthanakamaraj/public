import { Injectable } from "@angular/core";

@Injectable()
export class Data{

 //   public storage : any;
    private mapData = new Map();

    setData(key , value){
        this.mapData.set(key , value);
    }
    getData(key){
        return this.mapData.get(key);
    }
    constructor(){
    }

    formGenericData : any;
	RefNo : any;
    draftNo : any;
    draftRemarks : any;

    private routeParams = new Map<number, Map<any, any>>();
    setRouteParams(currentLevel, routeParamsMap){
        this.routeParams.set(currentLevel, routeParamsMap);
    }

    getRouteParam(currentLevel, key){
        var routeParamMap = this.routeParams.get(currentLevel);
        if(routeParamMap){
            return routeParamMap.get(key);
        }
        return undefined;
    }

    modalRefs: Map<number, any> = new Map<number, any>();
    setModalReference(currentLevel: number, modalRef){
        this.modalRefs.set(currentLevel, modalRef);
    }

    getModalReference(level: number){
        return this.modalRefs.get(level);
    }
}