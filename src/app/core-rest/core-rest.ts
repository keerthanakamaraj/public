import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { IamService } from "../iam-service/iam.service";
import { environment } from "src/environments/environment";
// import { Server, ServerUtil, DeploymentTarget } from "../enums/servers";
import { AppComponent } from '../app.component';
// import { ArxService } from "../arx-service/arx.service";



export class CoreREST {

  public url: string = '';
  public driveType: string = 'GLOBALDRIVE';
  //public apiKey: string = 'gRrXwGv5lsGXkYFwNzaCS1CLQx5SlUe3';
  public apiKey: string = 'sNZPc5zp9kmOvjL93XWeNUR8nXQsSS6k';
  //public context: string = '/clo-commons/publisher/v1';
  public context: string = '/common-de/publisher/v1';
  public breContext: string = '/clo-bre-services';
  //public doContext: string = '/clo-commons/publisher';
  public doContext: string = '/common-de/publisher';

  public defaultOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient,
    // public auth: IamService
  ) {
    // if (environment.deploymentTarget && environment.deploymentTarget === DeploymentTarget.ANDROID){
    //   this.url=environment.url;
    // }
    this.url = environment.baseURL;
    console.log(this.url);
  }

  public getLookupData(domainObjectName: string, pageNumber: number = 0, term?: boolean
    , parameters?: Map<string, string>) {
    //let url = this.doContext + '/' + domainObjectName + '?lookup=1';
    let url = environment.baseURL + this.doContext + '/' + domainObjectName + '?lookup=1';

    if (parameters) {
      url = this.encodeURIParamData(url, parameters);
    }
    return this.http.get(url, this.getDefaultOptions());
  }

  filterLookupData(lookupName: string, filterById?: string, callback?: Function) {
    let lookupData;
    this.getLookupData(lookupName).subscribe(
      data => {
        if ((data) && (data['Data'])) {
          if (filterById) {
            lookupData = this.filterLookupById(filterById, data);
            if (lookupData) {
              if (callback) {
                callback(lookupData);
              }
            }
          } else {
            if (callback) {
              callback(data);
            }
          }
        }
      }
    );

  }

  filterLookupById(Id: string, data: any) {
    if ((data) && (data['Data'])) {
      for (let i = 0; i < data['Data'].length; i++) {
        if (data['Data'][i].id === Id) {
          return data['Data'][i].text;
        }
      }
    }
  }

  public getUrl(path: string, contextPath?: string, url?: string): string {
    let fullPath = '';
    if (this.url) {
      fullPath += this.url;
    }
    if (url) {
      fullPath = url;
    }
    if (contextPath) {
      fullPath += contextPath;
    } else {
      fullPath += this.context;
    }
    fullPath += path;
    if (fullPath.indexOf("?") < 0) {
      fullPath += "?";
    } else {
      fullPath += "&";
    }
    fullPath += "_date=" + new Date().getTime();
    return fullPath;
  }

  public getContextUrl(path: string): string {
    let fullPath = '';
    if (this.url) {
      fullPath += this.url;
    }
    fullPath += path;
    if (fullPath.indexOf("?") < 0) {
      fullPath += "?";
    } else {
      fullPath += "&";
    }
    if (fullPath.indexOf("date") < 0) {
      fullPath += "_date=" + new Date().getTime();
    }
    return fullPath;
  }

  public encodeURIPostData(formData: any): any {
    if (formData instanceof Array) {
      return this.encodePostDataArray(formData);
    } else if (formData instanceof Object) {
      const pFormData = {};
      for (const key in formData) {
        if (!key) {
          continue;
        }
        const elem = formData[key];
        // if (elem instanceof Date) {
        //pFormData[key] = window['moment'](elem).format(AppComponent.component.utility.getTenant().dateFormat.toUpperCase());
        // } else {
        const isDateChk = window['moment'](elem, ['YYYY-MM-DDTHH:mm:ss.sssZ', 'YYYY-MM-DDTHH:mm:ssZ', 'YYYY-MM-DD HH:mm:SS.s'], true);
        if (isDateChk.isValid()) {
          pFormData[key] = isDateChk.format('DD-MMM-YYYY');
        } else if (elem instanceof Array) {
          pFormData[key] = this.encodePostDataArray(elem);
        } else if (elem instanceof Object) {
          pFormData[key] = this.encodeURIPostData(elem);
        } else {
          pFormData[key] = elem;
        }
        // }
      }
      return pFormData;
    } else {
      return formData;
    }
  }
  public encodePostDataArray(dataArray) {
    const result = new Array();
    dataArray.forEach(elem => {
      // if (elem instanceof Date) {
      //   result.push(window['moment'](elem).format(AppComponent.component.utility.getTenant().dateFormat.toUpperCase()));
      // } else {
      const isDateChk = window['moment'](elem, ['YYYY-MM-DDTHH:mm:ss.sssZ', 'YYYY-MM-DD HH:mm:SS.s'], true);
      if (isDateChk.isValid()) {
        result.push(isDateChk.format('DD-MMM-YYYY'));
      } else if (elem instanceof Array) {
        result.push(this.encodePostDataArray(elem));
      } else if (elem instanceof Object) {
        result.push(this.encodeURIPostData(elem));
      } else {
        result.push(elem);
      }
      // }
    });
    return result;
  }

  public encodeURIParamData(url: string, formData: Map<string, string>) {
    let result = url;
    if (formData) {
      if (result.indexOf("?") < 0) {
        result += "?_date=" + new Date().getTime();
      }
      formData.forEach((val, key) => {
        result += "&";
        result += key + "=" + encodeURIComponent(val);
      });
    }
    return result;
  }

  public getDefaultOptions(headers?: Object) {
    const baseHeader = {
      'Content-Type': 'application/json',
      'X-Skip-Entitlement-Validation': 'True'
    };
    // if (ServerUtil.validationModeKeycloak() || ServerUtil.validationModeArx()) {
    const token = this.getToken();
    if (token) {
      Object.assign(baseHeader, {
        'Authorization': this.getToken(),
        'apikey': this.apiKey,
      });
    }
    // }

    if (headers) {
      const keys = Object.keys(headers);
      keys.forEach(key => {
        if (headers[key]) {
          baseHeader[key] = headers[key];
        }
      });
    }
    const defaultOptions = {
      headers: new HttpHeaders(baseHeader),
      responseType: null
    };
    return defaultOptions;
  }

  public getToken() {
    let token = '';
    // if (ServerUtil.validationModeKeycloak()) {
    //   if (IamService.isLocalhost()) {
    token = 'Bearer ' + window.sessionStorage.getItem('TOKEN');
    //   } else {
    //     token = 'Bearer ' + IamService.keycloakAuth.token;
    //   }
    // } else if (ServerUtil.validationModeArx()) {
    //   if (ArxService.isLocalhost()) {
    //     token = window.sessionStorage.getItem('TOKEN');
    //   } else {
    //     token = ArxService.getAccessToken();
    //   }
    // }
    return token;
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  // public getArxUrl() {
  // 	return environment.arxUrl + environment.arxContext;
  //   }
}
