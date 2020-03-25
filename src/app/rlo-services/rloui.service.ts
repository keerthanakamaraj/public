import { Injectable } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { HttpResponse } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RlouiService {

  private serviceContext: string = "/olive/publisher";

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

    // TODO: Make aysnc calls
    this.loadValidations();
    this.loadFormFields();
  }

  private loadValidations(){
    this.http.fetchApi(this.fieldvalidationAPI, 'GET', undefined, this.serviceContext).subscribe(
      async (httpResponse: HttpResponse<any>) => {
        var validations = httpResponse.body ? httpResponse.body.UiFieldValidation : [];
        // console.log("res ", validations);

        validations.forEach(element => {
          this.fieldValidations[element.V] = element;
        });
        console.log("validations ", this.fieldValidations);
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
        console.log("form fields ", this.formFields);
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
}
