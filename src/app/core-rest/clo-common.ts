import { CoreREST } from './core-rest';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
// import { IamService } from '../iam-service/iam.service';
import { AppComponent } from '../app.component';
import { FormCommonComponent } from '../form-common/form-common.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CLOCommonService extends CoreREST {

	// public baseContext: string = '/clo-commons';
	// public baseContext: string = '/common-de';
	public baseContext: string = environment.serviceMap['/common-de'];
	public context: string = (this.baseContext + '/v1');
	private domainAttributesCache = {};
	private tenantDACache = {};
	public urlInfoContext: string = 'assets/json/url-info.json';
	public docContext: string = '/dev/igcb-dms/v1';
	public static UrlMap: any;
	public ActionModes = {};
	public APIInfo = {};
	public stageName;


	// public constructor(public http: HttpClient, public auth: IamService) {
	public constructor(public http: HttpClient) {
		//super(http, auth);
		super(http);

	}

	public setStageName(stageName) {
		this.stageName = stageName;
	}
	public saveDocumentUploadDetails(pFormData) {
		// if (pFormData) {
		// 	pFormData = this.encodeURIPostData(pFormData);
		// }
		return this.http.post(this.getUrl('/proposals/document-upload-details'), pFormData, this.getDefaultOptions());
	}
	public saveTabletDocUploadDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/documentUploads?userId=' + sessionStorage.getItem("USERID")), pFormData, this.getDefaultOptions());
	}
	public deleteDocUploadDetails(pFormData) {
		return this.http.delete(this.getUrl('/documents?documentId=' + pFormData.id), this.getDefaultOptions());
	}
	public deleteUploadedImage(id) {
		return this.http.delete(this.getUrl('/documentUploads?seqId=' + id), this.getDefaultOptions());
	}
	public getOwnerNamesDetails(pFormData) {
		let url = this.getUrl('/proposals/document-owner-names?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDocumentTypesDetail(pFormData) {
		let url = this.getUrl('/proposals/document-types?entityId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDocumentUploadDtls(pFormData) {
		let url = this.getUrl('/proposals/document-upload-details?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDocumentsDetail(pFormData) {
		let url = this.getUrl('/proposals/document-details');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCommentsCategory(pFormData) {
		let url = this.getUrl('/proposals/comment/categories?trnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCommentById(pFormData) {
		let url = this.getUrl('/proposals/comment?id=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public saveCommentDetail(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/comment'), pFormData, this.getDefaultOptions());
	}
	public getCommentsDetails(cFromData) {
		let url = this.getUrl('/proposals/comment/grid?trnProposalId=' + cFromData);
		return this.http.get(url, this.getDefaultOptions());
	}
	getCustomerList(Proposalid, sectionId) {
		let url = this.getUrl('/proposals/customerlist?ProposalId=' + Proposalid + '&SectionId=' + sectionId);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getJSON(filepath) {
		return this.http.get(filepath);
	}

	public LoadUserNameUserRoleMs(pFormData) {
		let url = this.getUrl('/users/roles?UserID=' + encodeURIComponent(pFormData));
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTenantDetails() {
		let url = this.getUrl('/users/tenant-info?TENANT_ID=smartbankone');
		return this.http.get(url, this.getDefaultOptions());
	}
	public getAllTenants() {
		let url = this.getUrl('/tenants');
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTenantFormDetails(serviceName) {
		let url = this.getUrl('/users/api-details/' + serviceName);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getAllForms() {
		let url = this.getUrl('/users/api-details');
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDADetails(serviceName) {
		let url = this.getUrl('/users/api-details/' + serviceName + '/domain-attributes/ui');
		return this.http.get(url, this.getDefaultOptions());
	}
	public getAllDomainAttributes() {
		let url = this.getUrl('/users/api-details/domain-attributes');
		return this.http.get(url, this.getDefaultOptions());
	}
	public LoadTenantDADetails(serviceName) {
		if (this.tenantDACache[serviceName]) {
			return new Observable(resolve => {
				resolve.next(this.tenantDACache[serviceName]);
				resolve.complete();
			});
		}
		let url = this.getUrl('/users/api-details/domain-attributes/services?FormName=' + serviceName + "&TENANT_ID=smartbankone");
		return this.http.get(url, this.getDefaultOptions());
	}
	public setTenantDADetailsCache(serviceName, response) {
		this.tenantDACache[serviceName] = response;
	}
	public LoadFieldList(showHideType) {
		let url = this.getUrl('/users/fields?showHidetype=' + showHideType);
		return this.http.get(url, this.getDefaultOptions());
	}
	public deleteTenantFormField(pFormData) {
		let url = this.getUrl('/users/api-details/fields/' + pFormData.Id);
		return this.http.delete(url, this.getDefaultOptions());
	}
	public getFieldDetails(formId) {
		let url = this.getUrl('/users/field-details?FormId=' + formId);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFormFieldDetails(formId) {
		let url = this.getUrl('/users/form-field-details?FormId=' + formId);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTenantFormFieldDetails(tenantId, formId) {
		let url = this.getUrl('/users/api-details/fields?FormId=' + formId + "&TenantId=" + tenantId);
		return this.http.get(url, this.getDefaultOptions());
	}
	public saveTenantFormFieldDetails(pFormData) {
		let url = this.getUrl('/users/api-details/fields');
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(url, pFormData, this.getDefaultOptions());
	}
	public getRAValidationConfig(tenantId, formId) {
		let url = this.getUrl('/users/ra-validation-config?FormId=' + formId + "&TenantId=" + tenantId);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTenantDAValidationDetail(serviceName) {
		if (this.domainAttributesCache[serviceName]) {
			return new Observable(resolve => {
				resolve.next(this.domainAttributesCache[serviceName]);
				resolve.complete();
			});
		}
		let url = this.getUrl('/api-details/validations?API_CODE=' + serviceName + "&SRV_CODE=" + serviceName);
		return this.http.get(url, this.getDefaultOptions());
	}
	public setTenantDAValidationDetailCache(serviceName, response) {
		this.domainAttributesCache[serviceName] = response;
	}
	public getDownloadUrl(inventoryNumber) {
		return this.getUrl('/documents/' + inventoryNumber, this.docContext)
	}
	public triggerBRE(pFormData) {
		let url = this.getUrl('/bre/calculate-scores');
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(url, pFormData, this.getDefaultOptions());
	}
	public subscribeDownload(inventoryNumber) {
		const url = this.getDownloadUrl(inventoryNumber);
		let mainUrl = url.slice(0, url.lastIndexOf("_")) + "driveType=" + this.driveType;

		console.error("this.getDownloadUrl", mainUrl);
		const header = {
			'apikey': this.apiKey,
			'Authorization': this.getToken()
		};
		return this.http.get(mainUrl, {
			headers: new HttpHeaders(header),
			responseType: 'blob',
			observe: 'response',
		});
	}

	public download(inventoryNumber, fileNameWithExt?) {
		this.subscribeDownload(inventoryNumber).subscribe((resp: HttpResponse<Blob>) => {
			const data = resp.body;
			const contentDisposition = resp.headers.get('content-disposition');

			let fileName;
			if (fileNameWithExt != undefined || fileNameWithExt != null) {
				let onlyFileName = fileNameWithExt.slice(0, fileNameWithExt.lastIndexOf('.'));
				fileName = onlyFileName;
			}
			else {
				fileName = 'default.unknown';
			}

			if (contentDisposition) {
				const spl = contentDisposition.split("filename=");
				if (spl && spl.length == 2 && spl[1]) {
					fileName = spl[1].replace(/\"/g, '');
				}
			}
			if (window.navigator.msSaveOrOpenBlob) { // FOR IE
				const blobObject = new Blob([data]);
				window.navigator.msSaveOrOpenBlob(blobObject, fileName);
			} else {
				const url = window.URL.createObjectURL(data);
				const a = document.createElement('a');
				document.body.appendChild(a);
				a.setAttribute('style', 'display: none');
				a.href = url;
				a.download = fileNameWithExt != undefined ? fileNameWithExt : fileName;
				a.click();
				a.remove(); // remove the element
				window.URL.revokeObjectURL(url);
			}
		});
	}

	public getUploadUrl() {
		return this.getUrl('/documents?driveType=' + this.driveType, this.docContext);
		//return this.getUrl('/documents', '/igcb-dms/v1');
	}

	public getUploader(onSuccess: Function, onError?: Function) {
		const headers = [{ name: 'Authorization', value: this.getToken() }, { name: 'apikey', value: this.apiKey }]
		let uploader = new FileUploader({ url: this.getUploadUrl(), itemAlias: 'myfile', headers });
		uploader.onProgressItem = (progress: any) => {
			console.log('-----------------------------------------');
			console.log('isReady: ' + progress.isReady);
			console.log('isUploading: ' + progress.isUploading);
			console.log('isUploaded: ' + progress.isUploaded);
			console.log('isSuccess: ' + progress.isSuccess);
			console.log('isCancel: ' + progress.isCancel);
			console.log('isError: ' + progress.isError);
			console.log('-----------------------------------------');
			// AppComponent.component.getSpinner().show();
		};
		const handleError = (item: any, response: any, status: any, headers: any) => {
			if (onError) onError(item, response, status, headers);
			//const fc = new FormCommonComponent(AppComponent.component.getUtility());
			const parsedRes = JSON.parse(response);
			const errMsg = parsedRes['message'];
			// AppComponent.component.getUtility().getAppService().error(errMsg);
		};
		uploader.onCancelItem = (item: any, response: any, status: any, headers: any) => {
			// AppComponent.component.getSpinner().hide();
			handleError(item, response, status, headers);
		};
		uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
			// AppComponent.component.getSpinner().hide();
			handleError(item, response, status, headers);
		};
		uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			// AppComponent.component.getSpinner().hide();
			try {
				if (response) {
					onSuccess(item, response, status, headers);
				} else {
					handleError(item, response, status, headers);
				}
			} catch (e) {
				handleError(item, response, status, headers);
			}
		};
		return uploader;
	}

	/**
	 * Service to delete the data 
	 * @param urlID 
	 * @param uPlaceHolder 
	 * @param pFormData 
	 */
	public deleteDataService(urlID: String, formData?: any, uPlaceHolder?: Map<any, any>) {
		let url;
		if (uPlaceHolder) {
			url = this.generateURL(urlID, null, uPlaceHolder);
		} else {
			url = this.generateURL(urlID);
		}
		let pFormData = {};
		for (var key in formData) {
			let elem = formData[key];
			if (elem instanceof Date) {
				pFormData[key] = window["moment"](elem).format("DD-MMM-YYYY");
			} else {
				let isDateChk = window["moment"](elem, ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DD HH:mm:SS.s"], true);
				if (isDateChk.isValid()) {
					pFormData[key] = isDateChk.format("DD-MMM-YYYY");
				} else {
					pFormData[key] = elem;
				}
			}
		}
		return this.http.delete(this.getContextUrl(url), this.getDefaultOptions());
	}

	/**
	 * Service to get the details
	 * @param urlID 
	 * @param uPlaceHolder 
	 * @param pFormData  
	 */
	public getDataService(urlID: any, pFormData?: Map<any, any>, uPlaceHolder?: Map<any, any>) {
		let url;
		if (pFormData && uPlaceHolder) {
			url = this.generateURL(urlID, pFormData, uPlaceHolder);
		} else if (pFormData) {
			url = this.generateURL(urlID, pFormData);
		} else if (uPlaceHolder) {
			url = this.generateURL(urlID, null, uPlaceHolder);
		} else {
			url = this.generateURL(urlID);
		}
		return this.http.get(this.getContextUrl(url), this.getDefaultOptions());

	}

	/**
	 * Service to save the data
	 * @param urlID 
	 * @param uPlaceHolder 
	 * @param pFormData 
	 */
	public saveDataService(urlID: String, formData?: any, uPlaceHolder?: Map<any, any>) {
		let url;
		if (uPlaceHolder) {
			url = this.generateURL(urlID, null, uPlaceHolder);
		} else {
			url = this.generateURL(urlID);
		}
		let pFormData = {};
		for (var key in formData) {
			let elem = formData[key];
			if (elem instanceof Date) {
				pFormData[key] = window["moment"](elem).format("DD-MMM-YYYY");
			} else {
				let isDateChk = window["moment"](elem, ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DD HH:mm:SS.s"], true);
				if (isDateChk.isValid()) {
					pFormData[key] = isDateChk.format("DD-MMM-YYYY");
				} else {
					pFormData[key] = elem;
				}
			}
		}
		return this.http.post(this.getContextUrl(url), pFormData, this.getDefaultOptions());
	}

	/**
	 * Service to edit the data
	 * @param urlID 
	 * @param uPlaceHolder 
	 * @param pFormData 
	 */
	public editDataService(urlID: String, pFormData?: Map<any, any>, uPlaceHolder?: Map<any, any>) {
		let url;
		if (uPlaceHolder) {
			url = this.generateURL(urlID, null, uPlaceHolder);
		} else {
			url = this.generateURL(urlID);
		}
		return this.http.put(this.getUrl(url), pFormData, this.getDefaultOptions());
	}

	/**
	 * Service to load all url's
	 */
	public getURLInfo() {
		return this.http.get(this.urlInfoContext);
	}

	/**
	 * generic method to create URL 
	 * @param uPlaceHolder 
	 * @param pFormData 
	 * @param urlID 
	 */
	public generateURL(urlID: String, pFormData?: Map<any, any>, uPlaceHolder?: Map<any, any>) {
		let url;
		if (CLOCommonService.UrlMap.get(urlID)) {
			url = CLOCommonService.UrlMap.get(urlID);
			if (uPlaceHolder) {
				url = this.relpacePlaceHolders(url, uPlaceHolder);
			}
			if (pFormData) {
				url = this.encodeURIParamData(url, pFormData);
			}
		}
		return url;
	}

	/**
	 * Replace the place holder's  in URL
	 * @param url 
	 * @param pHolderData 
	 */
	public relpacePlaceHolders(url: String, pHolderData: Map<any, any>) {
		pHolderData.forEach((val, key) => {
			url = url.replace("{" + key + "}", val);
		});
		return url;
	}

	public replaceURIParamData(url: string, formData: Map<string, string>) {
		let result = url;
		if (formData) {
			formData.forEach((val, key) => {
				result += "&";
				result += key + "=" + encodeURIComponent(val);
			});
		}
		return result;
	}

	getEntitlementCode(serviceCode: any, requestJson?: any, stageName?: string) {
		let actionCode;
		let entitlementCode;
		let APIDetails = this.APIInfo[serviceCode];
		if (stageName) {
			this.stageName = stageName;
		} else if (this.stageName == null || this.stageName == '' || typeof this.stageName == 'undefined') {
			// this.stageName = this.
		}
		if (APIDetails) {
			let actionKey = APIDetails["ActionKey"]
			if (actionKey && requestJson) {
				actionCode = this.ActionModes[requestJson[actionKey]];
				entitlementCode = this.stageName + "~" + actionCode;
			} else {
				let ActionMode = APIDetails["ActionMode"];
				actionCode = this.ActionModes[ActionMode];
				entitlementCode = this.stageName + "~" + actionCode;
			}
			if (typeof (entitlementCode) == "undefined") {
				if (typeof (this.stageName) != "undefined" && this.stageName != "") {
					entitlementCode = this.stageName + "~ViewData";
				} else {
					entitlementCode = sessionStorage.getItem("taskName") + "~ViewData"
				}
			}
			return entitlementCode;
		}
	}


	loadlookup(tokenID, pageNo: number = 1, term: string = null) {
		let entitlementCode = this.stageName + "~ViewData";
		let query = new HttpHeaders();
		query = query.append("_TOKEN", tokenID);
		query = query.append("_PROGRAM", "REF");
		//query = query.append("page", pageNo.toString());
		query = query.append('Authorization', 'my-auth-token');
		query = query.append('Content-Type', 'application/json');
		query = query.append('COUNT', "9999");
		if (term) {
			query = query.append("term", term);
		}
		const httpOptions = {
			headers: query,
		}
		//return this.http.get(this.runtimeWeb + "/RARuntimeWeb/rest/form/SSGW/"+entitlementCode+"/"+tokenID+"Lookup?_date=" + new Date().getTime(), httpOptions);
		//return this.http.get(this.runtimeWeb + "/RARuntimeWeb/rest/form/lookup/QFLUIDFORM?_date=" + new Date().getTime(), httpOptions);
		return this.http.get(this.getUrl("/RARuntimeWeb/rest/form/SSGW/" + entitlementCode + "/" + tokenID + "Lookup"), httpOptions);
	}

	setActionModes() {
		this.getJSON("./assets/json/ActionModes.json").subscribe(data => {
			console.log(data);
			this.ActionModes = data
		}, error => console.log(error));
		this.getJSON("./assets/json/ApiInfo.json").subscribe(data => {
			console.log(data);
			this.APIInfo = data;
		}, error => console.log(error));
		console.log('data = = ' + this.ActionModes + this.APIInfo);
	}

	public getUserInfo() {
		// const url = this.getUrl('/user-info');
		// const defaultHeaders = this.getDefaultOptions();
		// const additionalHeader = {
		// 	observe: 'response'
		// };
		// const headerParam = Object.assign(defaultHeaders, additionalHeader);
		// return this.http.get(url, headerParam);
	}

	public saveToDoList(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/todo?InputterId=' + sessionStorage.getItem('USERID')), pFormData, this.getDefaultOptions());
	}
	public getToDoList(proposalId, userId) {
		let url = this.getUrl('/application-summary/checklist?trnProposalId=' + proposalId + '&userId=' + userId);
		return this.http.get(url, this.getDefaultOptions());
	}
	public deleteToDoList(Id) {
		return this.http.delete(this.getUrl('/application-summary/checklist?Id=' + Id), this.getDefaultOptions());
	}
	public getRMToDoList(pFormData) {
		let url = this.getUrl('/todo?userId=' + sessionStorage.getItem('USERID'));
		return this.http.get(url, this.getDefaultOptions());
	}
	public gethelpandsupport() {
		let url = this.getUrl('/helpandSupport');
		return this.http.get(url, this.getDefaultOptions());
	}

	public getadditionalinfo(question) {
		let url = this.getUrl('/additionalInfo?question=' + question);
		return this.http.get(url, this.getDefaultOptions());
	}

	public chagepassword(pFormData) {
		let url = this.getUrl('/changepassword');
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(url, pFormData, this.getDefaultOptions());
	}

	// public getUserDtls(uniqKey) {
	// 	let url = this.getArxUrl() + '/GetLoggedInInfo';
	// 	return this.http.post(url, uniqKey);
	// }

	public getsaltresult(pFormData) {
		let url = this.getUrl('/saltgen');
		url = this.encodeURIParamData(url, pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}

	public updateToDoList(id, status, pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/todo/modify?id=' + id + '&status=' + status), pFormData, this.getDefaultOptions());
	}

	getCustomerSearchDetails(pFormData) {
		let url = this.getUrl('/customers/search');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}

	public getCustomerSearchFields(pFormData) {
		let url = this.getUrl('/customers/search/parameters');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCustomerLevelDocs(id) {
		let url = this.getUrl('/documentsByCustomer?trnDemographicId=' + id);
		return this.http.get(url, this.getDefaultOptions());
	}

	// public callArxApis(resource, pFormData){
	// 	if (pFormData) {
	// 		pFormData = this.encodeURIPostData(pFormData);
	// 	}
	// 	return this.http.post(this.getUrl('/'+ resource, environment.arxContext, environment.arxUrl), pFormData, this.getDefaultOptions({'Cache-Control':'no-cache'}));
	// }

	public getUserAuthenticated(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/getUserAuthenticated'), pFormData, this.getDefaultOptions());
	}

	//  Methos to be used once MPIN integrated
	// public setupMpin(pFormData){
	// 	if (pFormData) {
	// 		pFormData = this.encodeURIPostData(pFormData);
	// 	}
	// 	return this.http.post(this.getUrl('/setMPin', environment.arxContext, environment.arxUrl), pFormData, this.getDefaultOptions({'Cache-Control':'no-cache'}));
	// }

	// public getExternalCustSearchResults(pFormData) {
	// 	let url = this.getUrl('', environment.interfaceContext, environment.interfaceUrl);
	// 	if (pFormData) {
	// 		pFormData = this.encodeURIPostData(pFormData);
	// 	}
	// 	return this.http.post(url, pFormData, this.getDefaultOptions());
	// }

	public getDocChecklistCustomers(id) {
		let url = this.getUrl('/document?proposalId=' + id);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getDocumentsForCustomers(id) {
		let url = this.getUrl('/documents?custType=' + id);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getMaintainedDocumentsForCustomers(id) {
		let url = this.getUrl('/customer-documents?custType=' + id);
		return this.http.get(url, this.getDefaultOptions());
	}
	public saveNewDocumentDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/document?userId=' + sessionStorage.getItem('USERID')), pFormData, this.getDefaultOptions());

	}
	public getDocumentsForPrograms(id) {
		let url = this.getUrl('/documentsForPrograms?prodCode=' + id);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getProgramLevelDocs(id) {
		let url = this.getUrl('/documentsByPrograms?proposalId=' + id);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFilePreview(id) {
		let url = this.getUrl('/documents/' + id + '/preview?driveType=' + this.driveType, this.docContext);

		return this.http.get(url, {
			responseType: 'blob',
			observe: 'response',
		});
	}
	public getPendingTaggedImages(id) {
		let url = this.getUrl('/quick-uploads/tags?proposalId=' + id);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDocumentTypes() {
		let url = this.getUrl('/document-types');
		return this.http.get(url, this.getDefaultOptions());
	}
	public savePendingTaggedDoc(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/documentsByCustomer?userId=' + sessionStorage.getItem('USERID')), pFormData, this.getDefaultOptions());
	}
	getImagesForUpdateAction(id) {
		// let url = this.getUrl('/documentUploads?docId=' + id);
		// return this.http.get(url, this.getDefaultOptions());
		let url = this.getUrl('/documentUploads?seqId=' + id);
		return this.http.get(url, this.getDefaultOptions());
	}
	public updateDocumentDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/documents?userId=' + sessionStorage.getItem('USERID')), pFormData, this.getDefaultOptions());

	}
	public logout() {
		// const reqMap = new Map<string, string>();
		// reqMap.set("userTicket", sessionStorage.getItem("TOKEN"));
		// let pFormData = this.encodeURIPostData(reqMap);
		// return this.http.post(this.getUrl('/LogOutUser', environment.arxContext, environment.arxUrl), pFormData, this.getDefaultOptions({ 'Cache-Control': 'no-cache' }));

	}

	public getBasicUserDtls() {
		// let url = this.getUrl('/getarxbasicdtls?url='+ environment.arxUrl);
		// return this.http.get(url, this.getDefaultOptions());
	}

	public getStage() {
		return this.http.get(this.getUrl('/proposals/stages'), this.getDefaultOptions());
	}
}
