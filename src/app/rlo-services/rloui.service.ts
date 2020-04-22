import { Injectable } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { HttpResponse } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RlouiService {

  private serviceContext: string = "/ui";

  private tenantConfigAPI: string = "/TenantConfig";
  private tenantconfig: any = {};

  private fieldvalidationAPI: string = "/UiFieldValidation";
  private fieldValidations: any = {};

  private formFieldAPI: string = "/UiField";
  private formFields: any = {};

  constructor(public http: ProvidehttpService) {
    console.log("UI Service .. constructor --------------------------------");

    // TODO: initialize on startup and call after login
    this.loadUiConfigs();
  }

  loadUiConfigs(){

    this.loadTenantConfig();
    
  }

  private loadTenantConfig(){
    this.http.fetchApi(this.tenantConfigAPI, 'GET', undefined, this.serviceContext).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var tconfig = httpResponse.body ? httpResponse.body.TenantConfig : [];
        // console.log("res ", validations);

        tconfig.forEach(element => {
          this.tenantconfig[element["TCName"]] = element["TCValue"];
        });
        console.log("tenantconfig ", this.tenantconfig);

        this.loadValidations();
        this.loadFormFields();
      },
      async (httpError)=>{
        var err = httpError['error']
        if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
          // this.services.alert.showAlert(3, 'Unable to save form!', 5000);
        }
      }
    );
  }

  private loadValidations(){
    if(this.tenantconfig["ui.validation.version"] == localStorage.getItem("ui.validation.version")){
      try {
        this.fieldValidations = JSON.parse(localStorage.getItem("ui.validations"));
        console.log("Loading cached validations .. v", localStorage.getItem("ui.validation.version"));
        return;
      } catch (e) {
        console.log("Error Loading cached validations ", e);
      }
    }


    this.http.fetchApi(this.fieldvalidationAPI, 'GET', undefined, this.serviceContext).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var validations = httpResponse.body ? httpResponse.body.UiFieldValidation : [];
        // console.log("res ", validations);

        validations.forEach(element => {
          this.fieldValidations[element.V] = element;
        });
        //console.log("validations ", this.fieldValidations);
        localStorage.setItem("ui.validations", JSON.stringify(this.fieldValidations) );
        localStorage.setItem("ui.validation.version",this.tenantconfig["ui.validation.version"]);
      },
      async (httpError)=>{
        var err = httpError['error']
        if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
          // this.services.alert.showAlert(3, 'Unable to save form!', 5000);
        }
      }
    );
  }

  private loadFormFields(){
    if(this.tenantconfig["ui.fields.version"] == localStorage.getItem("ui.fields.version")){
      try {
        this.formFields = JSON.parse(localStorage.getItem("ui.formfields"));
        console.log("Loading cached Form Fields .. v", localStorage.getItem("ui.fields.version"));
        return;
      } catch (e) {
        console.log("Error Loading cached validations ", e);
      }
    }

    this.http.fetchApi(this.formFieldAPI, 'GET', undefined, this.serviceContext).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var fields = httpResponse.body ? httpResponse.body.UiField : [];
        // console.log("fields ", fields);

        fields.forEach(element => {
          if(!this.formFields[element["F"]]){ // check for form already added
            this.formFields[element["F"]] = [];
          }
          this.formFields[element["F"]].push(element);
        });
        //console.log("form fields ", this.formFields);

        localStorage.setItem("ui.formfields", JSON.stringify(this.formFields) );
        localStorage.setItem("ui.fields.version",this.tenantconfig["ui.fields.version"]);
      },
      async (httpError)=>{
        var err = httpError['error']
        if(err!=null && err['ErrorElementPath'] != undefined && err['ErrorDescription']!=undefined){
          // this.services.alert.showAlert(3, 'Unable to save form!', 5000);
        }
      }
    );
  }

  getFormFields(formName: string) : []{
    return this.formFields[formName];
  }

  getValidation(validation: string){
    return this.fieldValidations[validation];
  }

  getConfig(configName: string){
    return this.tenantconfig[configName];
  }
}
