/* IMPORTS */
import { Injectable, EventEmitter, Output, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationObj } from './main-header/notifications';
import { Router, CanActivate } from '@angular/router';
import { Data } from './DataService';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http } from '@angular/http';

export var errorMap;

@Injectable({
  providedIn: 'root'
})

export class ProvidehttpService implements CanActivate {

  baseURL: string;
  restURL: string;
  showMenu=false;
  displaySide = false;
  ActiveTab='LANDING';
  showDraft = true;
  navBarMessage='';
  currentLanguage;

  sessionValid = true;
  loggedIn = false;
  tfaapplet: any;
  tfaMessage: any;

  isLoggedIn(): boolean {
    return this.loggedIn && this.sessionValid;
  }

  canActivate() {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.sessionValid = false;
      this.data.formGenericData = "FLI008";
      this.router.navigate(["/logout"]);
      return false;
    }
  }
  

  constructor(private httpClient: HttpClient, private spinnerService: Ng4LoadingSpinnerService, private router: Router, private data: Data, private http: Http) {
    if (isDevMode()) {
      // this.baseURL = 'http://localhost:28080/RARuntimeWeb/';//local
  //    this.baseURL = 'http://10.10.16.203:8390/OliveFabricWeb/';//HDFC
      //this.baseURL = 'http://localhost:28680/olive/';//OTTO
      //this.baseURL = window.location.origin + '/RARuntimeWeb/';
      this.baseURL = 'http://10.11.12.19:18180/olive/';//RLO
    } else {
      //let href = window.location.href.lastIndexOf('/');
       //this.baseURL = 'http://localhost:28680/olive/';//OTTO
      //this.baseURL = window.location.origin + '/olive/';
      this.baseURL = 'http://10.10.8.113:8980/olive/';//OTTO
    }
    this.restURL = this.baseURL; 
    this.getJSON().subscribe(data => {
      errorMap = data['ErrorCodes'];
    }
    , error => {});
  }

  submitLoginForm(formCode, csrf, value) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    if (csrf) {
      headers = headers.set('_CSRF', csrf);
    }

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };
    let json = {};
    json['MESSAGE'] = JSON.stringify(value);
    return this.httpClient.post<String>(this.restURL + "Auth/SSGW/" + formCode + "/SUBMIT", json, httpOptions);
  }

  resetLoginForm(formCode) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };

    const URL = this.restURL + 'Auth/SSGW/' + formCode + '/RESET';    
    return this.httpClient.post(URL, '', httpOptions);
  }

  getElogoutAuthData() {
    this.loggedIn = false;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };
    let json = {};
    let value = JSON.stringify(json);
    return this.httpClient.post<String>(this.restURL + "Auth/SSGW/ELOGOUT/SUBMIT", value, httpOptions);
  }

  domainObjectValidation(doURL, fieldValue, dependentValues) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });
    // let httpOpts = { headers, withCredentials: true };
    let httpOpts = { headers };

    var url = this.restURL.substring(0, this.restURL.length - 1)+'/publisher' + doURL;

    url = url.replace(url.substring(url.indexOf('{'), url.indexOf('}') + 1), fieldValue);

    var queryParam = "";
    dependentValues.forEach(
      (dep, key) => {
        if(dep.paramType == undefined || dep.paramType == 'PathParam'){
          url = url.replace('{' + key + '}', dep.value ? dep.value : '');
        }else if(dep.paramType == 'QueryParam'){
          queryParam += key + "=" + dep.value + "&";
        }
      }
    );

    if(queryParam.length>0){
      url += '?' + queryParam.substring(0, queryParam.length - 1);
    }

    return this.httpClient.get(url, httpOpts);
  }  

loadLookup(doURL, dependentValues, pageNo: number, searchTerm: string, count: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });
    // let httpOpts = { headers, withCredentials: true };
    let httpOpts = { headers };

    var url = this.restURL.substring(0, this.restURL.length - 1)+'/publisher' + doURL;

    url = url.replace(url.substring(url.indexOf('{') - 1, url.indexOf('}') + 1), "");

    var queryParam = "";
    dependentValues.forEach(
      (dep, key) => {
        if(dep.paramType == undefined || dep.paramType == 'PathParam'){
          url = url.replace('{' + key + '}', dep.value ? dep.value : '');
        }else if(dep.paramType == 'QueryParam'){
          queryParam += key + "=" + dep.value + "&";
        }
      }
    );

    url += "?lookup=1";
    if(queryParam.length>0){
      url += '&' + queryParam.substring(0, queryParam.length - 1);
    }

    var criteriaDetails = {};
    if (searchTerm) {
      let filter = [];
      let filterOption = {};
      filterOption['columnName'] = 'text';
      filterOption['columnType'] = 'string';
      filterOption['conditions'] = { searchText: searchTerm, searchType : 'Contains' };
      filter.push(filterOption);
      criteriaDetails['FilterCriteria'] = filter;
    }
    if (count > 0) {
      criteriaDetails['Count'] = count;
      criteriaDetails['Offset'] = (pageNo * count) + 1;
      url += "&criteriaDetails="+JSON.stringify(criteriaDetails);
    }

    return this.httpClient.get(url, httpOpts);
  }

  loginService(URL) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };

    return this.httpClient.get(this.restURL+'/publisher' + URL, httpOptions);
  }

  getContextPathValue(contextPath: string, jsonObj: {}) {
    if (contextPath == undefined || contextPath == "" || jsonObj == undefined) {
      return jsonObj;
    }
    var keys = contextPath.split(".");
    var value = jsonObj;
    for (var i = 0; i < keys.length; i++) {
      value = value[keys[i]];
    }
    return value;
  }

  async validateField(formCode, domainObjectCode, data: string, dependentValues = {}): Promise<JSON> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });
    let httpOpts = { headers, withCredentials: true };
    data = data.toString().replace(/\//g, "-");
    var URL = this.restURL + "form/SSGW/" + formCode + "/" + domainObjectCode + "/DATA/" + data;

    for (var key of Object.keys(dependentValues)) {
      var value = dependentValues[key];
      if (value) {
        value = value.toString().replace(/\//g, "-");
        URL = URL + "/" + key + "/" + value;
      }
    }

    let response = await this.httpClient.get(URL, httpOpts).toPromise();
    let res = JSON.parse(JSON.stringify(response));
    //this.checkForSession(res);
    return res;
  }


  async onSubmit(formCode, apiGatewayCode, serviceCode, formData, csrf): Promise<JSON> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    if (csrf) {
      headers = headers.set('_CSRF', csrf);
    }

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };
    const URL = this.restURL + 'form/' + apiGatewayCode + '/' + formCode + '/' + serviceCode + '/urlaction/SUBMIT';
    
    let response = await this.httpClient.post(URL, formData, httpOptions).toPromise();
    let res = JSON.parse(JSON.stringify(response));

    return res;
  }

  showSpinner() {
    this.spinnerService.show();
  }

  hideSpinner() {
    this.spinnerService.hide();
  }

  getMenu() {
    const httpOpts = {
      headers: new HttpHeaders({
        //'ServiceCode':'MENU'
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'internal/SSGW/EHOME/MENU', httpOpts);
  }

  getLandingForms() {
    const httpOpts = {
      headers: new HttpHeaders({
        //'ServiceCode':'MENU'
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'internal/SSGW/EHOME/LANDINGFORMS', httpOpts);
  }

  getAnnouncements() {//Replace exiting method

    const httpOpts = {
      headers: new HttpHeaders({
        //'ServiceCode':'MENU'
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'form/SSGW/EHOME/ANNOUNCEAFTER/urlaction/FETCH/UserId/' + sessionStorage.getItem("USER_ID") + '/Custcode/' + sessionStorage.getItem("CUSTOMER_CODE") + '/Srvbqe/' + sessionStorage.getItem("USER_SERVICE_BOUQUET"), httpOpts);
  }

  getServiceList() {
    const httpOpts = {
      headers: new HttpHeaders({
        //'Content-Type':  'application/json',
        //          'ServiceCode':'ALERTS'
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'internal/SSGW/EHOME/SEARCH', httpOpts);
  }

  displayMenu = false;

  getNgGridData(apiGatewayCode, formCode, serviceCode, inputMap, json) {

    const httpOpts = {
      headers: new HttpHeaders({
        //'Content-Type':  'application/json',
        //          'ServiceCode':'ALERTS'
      }),
      withCredentials: true
    };

    var URL = this.restURL + 'form/' + apiGatewayCode + '/' + formCode + '/' + serviceCode + '/urlaction/FETCH';
    var iterator1 = Array.from(inputMap.keys());
    for (var key of iterator1) {
      var value = inputMap.get(key);
      if (value) {
        //value = value.replace(/\//g, "-");
        //URL = URL + "/" + key + "/" + value;
        json[<string>key] = value;
      }
    }

    return this.httpClient.post<String>(URL, json, httpOpts);
  }

  // getGridData(URL) {
  //   const httpng = {

  //     headers: new HttpHeaders({
  //       'ServiceCode': 'SRVHIST'
  //     })
  //   };

  //   return this.httpClient.get("http://10.10.8.24:20341/PrivateApiGateway/rest?InitBy=CBAADMINM" + URL + " ", httpng);
  // }

  getNotifications(userID, startRow, endRow, isRead) {//replace existing one
    const httpOpts = {
      headers: new HttpHeaders({
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'form/SSGW/EHOME/ALRTNTFN/USRID/' + userID + '/STRW/' + startRow + '/ENRW/' + endRow + '/UNREAD/' + isRead, httpOpts);
  }

  getDownloads() {
    const httpOpts = {
      headers: new HttpHeaders({
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'form/SSGW/EHOME/DWNLDS/urlaction/FETCH', httpOpts);
  }

  getFavorites() {
    const httpOpts = {
      headers: new HttpHeaders({
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'internal/SSGW/EHOME/GETFAVORITES', httpOpts);
  }

  setFavorites(favorites) {
    const httpOpts = {
      headers: new HttpHeaders({
      }),
      withCredentials: true
    };
    return this.httpClient.post(this.restURL + 'internal/SSGW/EHOME/SETFAVORITES', favorites, httpOpts);
  }

  mapToJson(inputMap) {
    let json = {}

    if (inputMap) {
      var iterator1 = Array.from(inputMap.keys());

      for (var key of iterator1) {
        var value = inputMap.get(key);
        if (value) {
          let arry = (<any>key).split(".");
          let arryLength = arry.length;
          let jsonObj = json;
          for (let i = 0; i < arryLength; i++) {
            if (i == arryLength - 1) {
              jsonObj[arry[i]] = value;
            }
            else {
              if (!jsonObj[arry[i]]) {
                jsonObj[arry[i]] = {};
              }
              jsonObj = jsonObj[arry[i]];
            }
          }
        }
      }
    }

    return json;
  }

  fetchData(formCode, apiGatewayCode, serviceCode, inputMap) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });
    let httpOpts = { headers, withCredentials: true };
    var URL = this.restURL + 'form/' + apiGatewayCode + '/' + formCode + '/' + serviceCode + '/urlaction/FETCH';
    var iterator1 = Array.from(inputMap.keys());
    for (var key of iterator1) {
      var value = inputMap.get(key);
      if (value) {
        value = value.toString().replace(/\//g, "-");
        URL = URL + "/" + key + "/" + value;
      }
    }

    return this.httpClient.get(URL, httpOpts);
  }

  UnAuthorizationfetchApi(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', inputMap: Map<string, any>) {
    var json = this.mapToJson(inputMap);
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    };
    for (let key in json['HeaderParam']) {
      var value = json['HeaderParam'][key];
      if (value) {
        headers[key] = value;
      }
    }
    let httpOpts = { headers: new HttpHeaders(headers) };
    for (let key in json['PathParam']) {
      var value = json['PathParam'][key];
      url = url.replace('{' + key + '}', value ? value : '');
    }
    url = this.restURL.substring(0, this.restURL.length - 1) + url;
    if (json['QueryParam']) {
      url += '?';
      for (let key in json['QueryParam']) {
        var value = json['QueryParam'][key];
        if (value) {
          if((typeof value)!='string'){
            value= JSON.stringify(value)
          }
          url += key + "=" + value + "&";
        }
      }
      url = url.substring(0, url.length - 1);
    }

    if (method == 'GET') {
      return this.httpClient.get(url, httpOpts);
    } else if (method == 'POST') {
      return this.httpClient.post<String>(url, JSON.stringify(json['Body']), httpOpts);
    } else if (method == 'PUT') {
      return this.httpClient.put<String>(url, JSON.stringify(json['Body']), httpOpts);
    } else if (method == 'DELETE') {
      return this.httpClient.delete(url, httpOpts);
    }
  }

  fetchApi(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', inputMap: Map<string, any>) {
    var json = this.mapToJson(inputMap);

    let headers = {
      'Content-Type': 'application/json',
      'authorization': 'Bearer '+sessionStorage.getItem('access_token')
    };
    for (let key in json['HeaderParam']) {
      var value = json['HeaderParam'][key];
      if (value) {
        headers[key] = value;
      }
    }
    
    let httpOpts: { 
      headers: HttpHeaders,
      observe: any,
    } = {
      headers: new HttpHeaders(headers),
      observe:"response"
    };

    for (let key in json['PathParam']) {
      var value = json['PathParam'][key];
      url = url.replace('{' + key + '}', value ? value : '');
    }
    if(url.includes('AddressDetails') || url.includes('/dedupe')){
      this.restURL = 'http://10.11.12.19:18280/olive/';
    }
    url = this.restURL.substring(0, this.restURL.length - 1)+'/publisher' + url;
    if (json['QueryParam']) {
      url += '?';
      for (let key in json['QueryParam']) {
        var value = json['QueryParam'][key];
        if (value) {
          if((typeof value)!='string'){
            value= JSON.stringify(value)
          }
          url += key + "=" + value + "&";
        }
      }
      url = url.substring(0, url.length - 1);
    }

    if (method == 'GET') {
      return this.httpClient.get(url, httpOpts);
    } else if (method == 'POST') {
      return this.httpClient.post(url, JSON.stringify(json['Body']), httpOpts);
    } else if (method == 'PUT') {
      return this.httpClient.put(url, JSON.stringify(json['Body']), httpOpts);
    } else if (method == 'DELETE') {
      return this.httpClient.delete(url, httpOpts);
    }
  }

  fetchPostData(formCode, apiGatewayCode, serviceCode, json) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });
    let httpOpts = { headers, withCredentials: true };

    var URL = this.restURL + 'form/' + apiGatewayCode + '/' + formCode + '/' + serviceCode + '/urlaction/FETCH';

    return this.httpClient.post<String>(URL, JSON.stringify(json), httpOpts);
  }

  checkForSession(response) {
  //   //var stringArray = ["SS00", "SS001", "SS002", "SS003", "SS004", "SS005", "SS006", "SS007", "SS008", "SS009", "SS0010", "SS0011"];
  //   var stringArray = ["FLI000", "FLI001", "FLI002", "FLI003", "FLI004", "FLI005", "FLI006", "FLI007", "FLI008", "FLI009", "FLI010", "FLI011", "FLI012", "FLI013"];
  //   if (response['Status'] == 'F') {
  //     if (stringArray.indexOf(response['error']) >= 0) {
  //       this.sessionValid = false;
  //       this.data.formGenericData = response['error'];
  //       this.router.navigate(['/logout']);
  //     }
  //   }
  }

  getFileName(cfsNumber) {
    const httpOpts = {
      headers: new HttpHeaders({
        //'Content-Type':  'application/json',
        //          'ServiceCode':'ALERTS'
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'internal/SSGW/EHOME/FILEAPI/CFS_INV_NUM/' + cfsNumber, httpOpts);
  }

  async resetForm(formCode, mode) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };

    let json = {};
    json['MODE'] = mode;

    this.showSpinner();
    const URL = this.restURL + 'form/SSGW/' + formCode + '/RESET' + '/urlaction/RESET';

    let response = await this.httpClient.post(URL, json, httpOptions).toPromise();
    this.hideSpinner();
    let res = JSON.parse(JSON.stringify(response));
    //this.checkForSession(res);
    return res;
  }

  setNtfReadUnread(userID, entityCode, inventoryNum, isRead) {
    const httpOpts = {
      headers: new HttpHeaders({
      }),
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'form/SSGW/EHOME/MARKALERTREAD/EntityCode/' + entityCode + '/InventoryNum/' + inventoryNum + '/IsRead/' + isRead + '/UserID/' + userID, httpOpts);
  }

  saveAsDraft(formCode, apiGatewayCode, serviceCode, formData, RefNo, remarks) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    const httpOptions = {
      headers: headers,
      withCredentials: true
    };

    let Json = {
      Ref_No: RefNo,
      Data: formData,
      Remarks: remarks,
    };

    const URL = this.restURL + 'form/' + apiGatewayCode + '/' + formCode + '/' + serviceCode + '/urlaction/SAVEDRAFT';
    return this.httpClient.post(URL, Json, httpOptions);
  }

  loadAllDarfts(formCode, apiGatewayCode, serviceCode) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    const httpOptions = {
      headers: headers,
      withCredentials: true
    };
    const URL = this.restURL + 'form/' + apiGatewayCode + '/' + formCode + '/' + serviceCode + '/urlaction/LOADALLDRAFTS';
    return this.httpClient.post(URL, '', httpOptions);
  }

  loadDarft(formCode, apiGatewayCode, serviceCode, RefNo) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };

    let Json = {
      Ref_No: RefNo
    };
    const URL = this.restURL + 'form/' + apiGatewayCode + '/' + formCode + '/' + serviceCode + '/urlaction/LOADDRAFT';
    return this.httpClient.post(URL, Json, httpOptions);
  }
  deleteDarft(formCode, apiGatewayCode, serviceCode, RefNo) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };

    let Json = {
      Ref_No: RefNo
    };
    const URL = this.restURL + 'form/' + apiGatewayCode + '/' + formCode + '/' + serviceCode + '/urlaction/DELETEDRAFT';
    return this.httpClient.post<String>(URL, Json, httpOptions);
  }

  public getJSON(): Observable<any> {
    const url = window.location.origin + window.location.pathname + "assets/i18n/En.json";
  
    return this.http.get(url).pipe(map((res: any) => res.json()));
  }

  public getLanguages(formCode) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'internal/SSGW/' + formCode + '/GETLANGUAGES', httpOptions);
  }

  public translate(formCode, languageCode) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    });

    let httpOptions = {
      headers: headers,
      withCredentials: true
    };
    return this.httpClient.get(this.restURL + 'internal/SSGW/' + formCode + '/TRANSLATE/LANGUAGE_CODE/' + languageCode, httpOptions);
  }

  downloadFile(cfsNumber, fileName = undefined) {
    var downloadAnchor = document.getElementById("fileDownloadAnchor");
    if (fileName) {
      downloadAnchor["download"] = fileName;
    }
    downloadAnchor["href"] = this.baseURL + 'servlet/FileDownloadProcessor?CFS_INV_NUM=' + cfsNumber;
    downloadAnchor.click();
  }
}
