export class VisitReportFormModel {
VRF_ReportType: string;
VRF_DateOfVisit: string;
VRF_AddressofVisit: string;
VRF_OfficialName: string;
VRF_NameofPersonMet: string;
VRF_Designation: string;
VRF_OfficialId: string;
VRF_OfficialBusinessGroup: string;
VRF_PlaceOfVisit: string;
VRF_Photograph: string;
VRF_AdverseObservation: string;
VRF_Observations: string;
setValue(res){
if(res){
if(res['VRF_ReportType']){this.VRF_ReportType = res['VRF_ReportType'];}
if(res['VRF_DateOfVisit']){this.VRF_DateOfVisit = res['VRF_DateOfVisit'];}
if(res['VRF_AddressofVisit']){this.VRF_AddressofVisit = res['VRF_AddressofVisit'];}
if(res['VRF_OfficialName']){this.VRF_OfficialName = res['VRF_OfficialName'];}
if(res['VRF_NameofPersonMet']){this.VRF_NameofPersonMet = res['VRF_NameofPersonMet'];}
if(res['VRF_Designation']){this.VRF_Designation = res['VRF_Designation'];}
if(res['VRF_OfficialId']){this.VRF_OfficialId = res['VRF_OfficialId'];}
if(res['VRF_OfficialBusinessGroup']){this.VRF_OfficialBusinessGroup = res['VRF_OfficialBusinessGroup'];}
if(res['VRF_PlaceOfVisit']){this.VRF_PlaceOfVisit = res['VRF_PlaceOfVisit'];}
if(res['VRF_Photograph']){this.VRF_Photograph = res['VRF_Photograph'];}
if(res['VRF_AdverseObservation']){this.VRF_AdverseObservation = res['VRF_AdverseObservation'];}
if(res['VRF_Observations']){this.VRF_Observations = res['VRF_Observations'];}
}
}
}