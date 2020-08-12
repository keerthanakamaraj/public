import { CoreREST } from './core-rest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { IamService } from '../iam-service/iam.service';

@Injectable({
	providedIn: 'root'
})
export class CLOEnrichService extends CoreREST {

  // public context: string = '/clo-enrichments/publisher/v1';
  public context: string = '/common-de/publisher/v1';

	// public constructor(public http: HttpClient, public auth: IamService) {
  public constructor(public http: HttpClient) {
		super(http);
	}
	public deleteAllTakeoverDetails(pFormData) {
		return this.http.delete(this.getUrl('/proposals/takeover-details?ProposalId=' + pFormData), this.getDefaultOptions());
	}
	public deleteTakeoverDetails(pFormData) {
		return this.http.delete(this.getUrl('/proposals/takeover-details/' + pFormData), this.getDefaultOptions());
	}
	public getIndividualBusinessInfo(pFormData) {
		let url = this.getUrl('/applicants/001/business-details?TrnCustomerId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCorporateBusinessInfo(pFormData) {
		let url = this.getUrl('/applicants/002/business-details?TrnCustomerId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getExistingCustAddrDetails(pFormData) {
		let url = this.getUrl('/applicants/addresses?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBankDetails(pFormData) {
		let url = this.getUrl('/applicants/business-details/bank-details?TrnCustomerId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCommonGroupInfo(pFormData) {
		let url = this.getUrl('/applicants/business-details/group-details?TrnCustomerId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getExistingGroupCompDetails(pFormData) {
		let url = this.getUrl('/applicants/business-details/group-comp-details/companies?Id=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTaxInfoDetails(pFormData) {
		let url = this.getUrl('/applicants/business-details/tax-details?TrnCustomerId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getVerificationMasterList(pFormData) {
		let url = this.getUrl('/applicants/verification-list?CustomerSubType=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getApplicantVerificationList(pFormData) {
		let url = this.getUrl('/applicants/verification-results');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public loadBankCode(pFormData) {
		let url = this.getUrl('/bank-codes?BANK_IFS_CODE=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getExistingGroupnames(pFormData) {
		let url = this.getUrl('/group-details');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getPostalCode(pFormData) {
		let url = this.getUrl('/postal-codes?Pincode=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBuyerSupplierDetails(pFormData) {
		let url = this.getUrl('/proposals/vendor-details?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getAddressDetails(pFormData) {
		let url = this.getUrl('/proposals/addresses');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDemographicDetail(pFormData) {
		let url = this.getUrl('/proposals/applicants?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getAppBasicDetails(pFormData) {
		let url = this.getUrl('/proposals/basic-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getComments(pFormData) {
		let url = this.getUrl('/proposals/comments?TrnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getComplianceCustDetails(pFormData) {
		let url = this.getUrl('/proposals/compliance-details?TrnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getComplMasterDetails(pFormData) {
		let url = this.getUrl('/proposals/compliance-topics?TrnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCommonFacilityDetail(pFormData) {
		let url = this.getUrl('/proposals/facilities-commons?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getAmtSecFacilityDetails(pFormData) {
		let url = this.getUrl('/proposals/facilities-details/secured-amounts?Id=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFacilityDetails(pFormData) {
		let url = this.getUrl('/proposals/facilities-list?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFacilityMainLimits(pFormData) {
		let url = this.getUrl('/proposals/facilities-list/main-limits?progCode=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFacilitySubLimits(pFormData) {
		let url = this.getUrl('/proposals/facilities-list/sub-limits');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getGoNoGoDetails(pFormData) {
		let url = this.getUrl('/proposals/go-nogo-details?TrnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getGoNoGoMasterDetails(pFormData) {
		let url = this.getUrl('/proposals/go-nogo-topics?TrnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getIndependentRefDetails(pFormData) {
		let url = this.getUrl('/proposals/independent-references?TrnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getPSLDetails(pFormData) {
		let url = this.getUrl('/proposals/psl-details?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTakeoverDetails(pFormData) {
		let url = this.getUrl('/proposals/takeover-details?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getProposalVerificationList(pFormData) {
		let url = this.getUrl('/proposals/verification-results?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getRMRADetails(pFormData) {
		let url = this.getUrl('/proposals/visit-details?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTaxMasterDetails(pFormData) {
		let url = this.getUrl('/tax-codes?TaxNumber=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public saveDemographicIndividualDetail(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/individual?InputterId=' + sessionStorage.getItem("USERID")), pFormData, this.getDefaultOptions());
	}
	public saveDemographicCorporateDetail(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/corporate?InputterId=' + sessionStorage.getItem("USERID")), pFormData, this.getDefaultOptions());
	}
	public saveCorporateBusinessInfo(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/002/business-details'), pFormData, this.getDefaultOptions());
	}
	public saveIndividualBusinessInfo(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/001/business-details'), pFormData, this.getDefaultOptions());
	}
	public saveAddressDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/addresses'), pFormData, this.getDefaultOptions());
	}
	public deleteAddressDetails(pFormData) {
		let url = this.getUrl('/applicants/addresses');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.delete(url, this.getDefaultOptions());
	}
	public saveCorporateBankDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/business-details/bank-details'), pFormData, this.getDefaultOptions());
	}
	public deleteBankDetailsInfo(pFormData) {
		let url = this.getUrl('/applicants/business-details/bank-details');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.delete(url, this.getDefaultOptions());
	}
	public saveCorporateGroupDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/business-details/group-details'), pFormData, this.getDefaultOptions());
	}
	public deleteCorporateGroupDetails(pFormData) {
		return this.http.delete(this.getUrl('/applicants/business-details/group-details/' + pFormData.Id), this.getDefaultOptions());
	}
	public saveCorpGroupCompDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/business-details/group-comp-details/companies'), pFormData, this.getDefaultOptions());
	}
	public deleteCorpGroupCompDetails(pFormData) {
		let url = this.getUrl('/applicants/business-details/group-comp-details/companies');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.delete(url, this.getDefaultOptions());
	}
	public saveCorpTaxDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/business-details/tax-details'), pFormData, this.getDefaultOptions());
	}
	public deleteTaxDetails(pFormData) {
		let url = this.getUrl('/applicants/business-details/tax-details');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.delete(url, this.getDefaultOptions());
	}
	public saveApplicantVerificationList(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/applicants/verification-list'), pFormData, this.getDefaultOptions());
	}
	public saveBuyerSupplierDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/vendor-details'), pFormData, this.getDefaultOptions());
	}
	public deleteDemographicDetail(pFormData) {
		return this.http.delete(this.getUrl('/proposals/applicants/' + pFormData.Id), this.getDefaultOptions());
	}
	public saveAppBasicDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/basic-details'), pFormData, this.getDefaultOptions());
	}
	public deleteBuyerSupplierDetails(pFormData) {
		return this.http.delete(this.getUrl('/proposals/vendor-details/' + pFormData), this.getDefaultOptions());
	}
	public saveComments(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/comments'), pFormData, this.getDefaultOptions());
	}
	public deleteComments(pFormData) {
		return this.http.delete(this.getUrl('/proposals/comments/' + pFormData.Id), this.getDefaultOptions());
	}
	public saveComplianceDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/compliance-details'), pFormData, this.getDefaultOptions());
	}
	public saveCommonFacilityDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/facilities-commons'), pFormData, this.getDefaultOptions());
	}
	public SaveFacilityDetail(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/facilities'), pFormData, this.getDefaultOptions());
	}
	public deleteFacilityDetails(pFormData) {
		let url = this.getUrl('/proposals/facilities');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData)
		}
		return this.http.delete(url, this.getDefaultOptions());
	}
	public saveGoNoGoDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/go-nogo-details'), pFormData, this.getDefaultOptions());
	}
	public saveIndependentReferenceDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/independent-references'), pFormData, this.getDefaultOptions());
	}
	public deleteIndependentReferenceDetails(pFormData) {
		return this.http.delete(this.getUrl('/proposals/independent-references/' + pFormData.Id), this.getDefaultOptions());
	}
	public savePSLDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/psl-details'), pFormData, this.getDefaultOptions());
	}
	public deletePSLDetail(pFormData) {
		let url = this.getUrl('/proposals/psl-details');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.delete(url, this.getDefaultOptions());
	}
	public saveTakeoverDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/takeover-details'), pFormData, this.getDefaultOptions());
	}
	public saveRMRADetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/visit-details'), pFormData, this.getDefaultOptions());
	}
	public deleteRMRADetails(pFormData) {
		return this.http.delete(this.getUrl('/proposals/visit-details/' + pFormData.Id), this.getDefaultOptions());
	}
	public getMethodCodeForProduct(pFormData) {
		return this.http.get(this.getUrl('/proposals/assessment-method-codes?MethodCode=' + pFormData), this.getDefaultOptions());
	}
	public getMappedAssessmentDetails(pFormData) {
		let url = this.getUrl('/proposals/mapped-assessment?TrnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCovenantDesc(pFormData) {
		let url = this.getUrl('/proposals/covenant-descriptions?Covenant=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public LoadSodDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/takeover-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public LoadYesGstDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/tax-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getAssessmentInvoiceDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/invoices?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBalanceSheet(pFormData) {
		let url = this.getUrl('/proposals/assessments/balance-sheets?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getUploadedBankNames(pFormData) {
		let url = this.getUrl('/proposals/assessments/uploaded-bank-names?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBankingConsolidatedDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/bank-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBankingOverdrawingDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/bank-overdraw-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBGContractor(pFormData) {
		let url = this.getUrl('/proposals/assessments/bg-contractor?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBGNonContractor(pFormData) {
		let url = this.getUrl('/proposals/assessments/bg-non-contractor?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBillsDiscountingLimitDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/bill-discount-limits?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCapacityChart(pFormData) {
		let url = this.getUrl('/proposals/assessments/capacity-charts?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCMSDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/cms-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCMSTreasury(pFormData) {
		let url = this.getUrl('/proposals/assessments/cms-treasuries?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCostMeansFinanceDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/cms-finance-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFinancialSheet(pFormData) {
		let url = this.getUrl('/proposals/assessments/finance-sheets?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFundingDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/funding-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getInvestmentDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/investment-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getKeyFinancialsRatioDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/finance-ration-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getLACRDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/lacr-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getMaximumPermissableBankFinance(pFormData) {
		let url = this.getUrl('/proposals/assessments/max-permissable-finance-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getOrderBookPositionDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/order-book-position-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getPreshipmentDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/pre-shipment-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getPLSheet(pFormData) {
		let url = this.getUrl('/proposals/assessments/plsheet-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFiveProjectExecutedDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/project-executed-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFiveProjectExecutionDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/project-execution-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getPurchasesSalesBifurcation(pFormData) {
		let url = this.getUrl('/proposals/assessments/purchase-sales-bifurcation?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBankingSummary(pFormData) {
		let url = this.getUrl('/proposals/assessments/banking-summaries?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getScoreAppl(pFormData) {
		let url = this.getUrl('/proposals/assessments/application-scores?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getScore(pFormData) {
		let url = this.getUrl('/proposals/assessments/scores');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public validateScoreUpload(pFormData) {
		let url = this.getUrl('/proposals/assessments/validate-scores?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getSensitivityAnalysisDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/sensitivity-analysis-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTCPLCDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/tcplc-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTermLoanAssessment(pFormData) {
		let url = this.getUrl('/proposals/assessments/term-loan-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getExposureBusinessDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/business-exposure-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getTurnover(pFormData) {
		let url = this.getUrl('/proposals/assessments/turnover-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getVendorChannelFinance(pFormData) {
		let url = this.getUrl('/proposals/assessments/vendor-finance-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getWCCycle(pFormData) {
		let url = this.getUrl('/proposals/assessments/working-capital-cycles?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getWorkingCapitalBCDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/working-capital-bc-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getWorkingCapitalLCDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/working-capital-lc-details?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public saveAssessmentMethod(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/assessments'), pFormData, this.getDefaultOptions());
	}
	public saveScore(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/scores'), pFormData, this.getDefaultOptions());
	}
	public saveBankingDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/assessments/banking-details?driveType=' + this.driveType), pFormData, this.getDefaultOptions({ 'apikey': this.apiKey }));
	}
	public saveFileUploadDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/assessments/file-upload'), pFormData, this.getDefaultOptions());
	}
	public getAssessmentDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCAMCheckBox(pFormData) {
		let url = this.getUrl('/proposals/assessments/cam-checks');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public generateCAMReport(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/cam-report'), pFormData, this.getDefaultOptions());
	}
	public LoadBranchProductDetails(pFormData) {
		let url = this.getUrl('/proposals/branch-products?AppRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBankingDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/banking-details');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFacilityCodeDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/facility-details?FacilityCode=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFileUploadDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/file-upload');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getFileUploadHistDetails(pFormData) {
		let url = this.getUrl('/proposals/assessments/file-upload/histories');
		//FileType
		//AppRefNum
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBankNames(pFormData) {
		let url = this.getUrl('/proposals/assessments/bank-names?KEY1=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDocumentUploadDtls(pFormData) {
		let url = this.getUrl('/proposals/document-upload-details?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public saveDocumentUploadDetails(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/document-upload-details'), pFormData, this.getDefaultOptions());
	}
	public deleteDocUploadDetails(pFormData) {
		return this.http.delete(this.getUrl('/proposals/document-upload-details/' + pFormData.CfsInvNum), this.getDefaultOptions());
	}
	public getBorrDocDetail(pFormData) {
		let url = this.getUrl('/proposals/borrower-document-details?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDocumentTypesDetail(pFormData) {
		let url = this.getUrl('/proposals/document-types?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getOwnerNamesDetails(pFormData) {
		let url = this.getUrl('/proposals/document-owner-names?ProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public scoreUpload(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/upload-scores'), pFormData, this.getDefaultOptions());
	}
	public getDocumentsDetail(pFormData) {
		let url = this.getUrl('/proposals/document-details');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getBankAccountNumbers(pFormData) {
		let url = this.getUrl('/bank-codes/accounts');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public getInitAccountNumber(pFormData) {
		let url = this.getUrl('/proposals/assessments/init-accounts');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}
	public saveAssessment(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/assessments/save?driveType=' + this.driveType), pFormData, this.getDefaultOptions({ 'apikey': this.apiKey }));
	}
	public saveBankingSummary(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/banking-summary'), pFormData, this.getDefaultOptions());
	}
	public SaveMdyVisitRefChkConRemarks(pFormData) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/visit-details'), pFormData, this.getDefaultOptions());
	}
	public getProfitLossFinYears(pFormData) {
		let url = this.getUrl('/proposals/financial-years?ApplRefNum=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getLinkedCollaterals(pFormData) {
		let url = this.getUrl('/proposals/facilities/linked-collaterals?Id=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getCollateralTypes(pFormData) {
		let url = this.getUrl('/proposals/collateral-details/collateral-types');
		return this.http.get(url, this.getDefaultOptions());
	}

	public getCollateralSpecificDetails(pFormData) {
		let url = this.getUrl('/proposals/collateral-details/specific-details?collateralCode=' + pFormData.collateralCode);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getCollateralCommonDetails(pFormData) {
		let url = this.getUrl('/proposals/collateral-details/common-details?customerNumber=' + pFormData.customerNumber + '&collateralCode=' + pFormData.collateralCode);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getApplicantCollateralDetails(pFormData) {
		let url = this.getUrl('/proposals/collateral-details/applicant-details?customerNumber=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getLinkedFacilities(pFormData) {
		let url = this.getUrl('/proposals/collateral-details/linked-facilities?collateralCode=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getSecuredFacilities(pFormData) {
		let url = this.getUrl('/proposals/collateral-details/secured-facilities?TrnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}

	public deleteCollateralDetail(pFormData) {
		let url = this.getUrl('/proposals/collateral-details');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.delete(url, this.getDefaultOptions());
	}

	/**
	 * Get the list of cities based on the tenant country.
	 */
	public getTenantCityDetails(CountryKey) {
		let url = this.getUrl('/addresses/cities?CountryKey=' + CountryKey);
		return this.http.get(url, this.getDefaultOptions());
	}

	public getFacCollLinkingDetails(FacCode) {
		let url = this.getUrl('/proposals/facilities/link-collaterals?FacCode=' + FacCode);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDashboardProposalDetails(pFormData) {
		let url = this.getUrl('/application-summary/overview?trnProposalId=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDashboardProgramDetails(pFormData) {
		let url = this.getUrl('/application-summary/programDocuments?trnProposalId=' + pFormData + "&category=Program");
		return this.http.get(url, this.getDefaultOptions());
	}
	public getDashboardCustomerDetails(pFormData) {
		let url = this.getUrl('/application-summary/customers?trnProposalId=' + pFormData + '&category=Customer');
		return this.http.get(url, this.getDefaultOptions());
	}
	public getToDoList(proposalId, userId) {
		let url = this.getUrl('/application-summary/checklist?trnProposalId=' + proposalId + '&userId=' + userId);
		return this.http.get(url, this.getDefaultOptions());
	}
	public deleteToDoList(Id) {
		return this.http.delete(this.getUrl('/application-summary/checklist?Id=' + Id), this.getDefaultOptions());
	}
	public getProposalBPMDetails(proposalId) {
		let url = this.getUrl('/application/bpm-details?trnProposalId=' + proposalId);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getserachfilterdtls(pFormData) {
		let url = this.getUrl('/landing-search/search');
		url = this.encodeURIParamData(url, pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}

	getCustomerDetails(demographicId, customerSubType) {
		let url = this.getUrl('/customers/search/' + demographicId + '/' + customerSubType);
		return this.http.get(url, this.getDefaultOptions());
	}

	saveAllAddressDetails(pFormData) {
		let url = this.getUrl('/applicants/addresses/copy');
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(url, pFormData, this.getDefaultOptions());
	}

	public getCollateralDetail() {
		let url = this.getUrl('/proposals/collaterals/types');
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCollateralUDFDetails(pFormData) {
		let url = this.getUrl('/proposals/collaterals/fields?collateralType=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCollGenericAndSpecDetails(custNum, collCode) {
		let url = this.getUrl('/proposals/customers/' + custNum + '/collaterals/' + collCode);
		return this.http.get(url, this.getDefaultOptions());
	}
	public getCollateralAttributesDataDetail(pFormData) {
		let url = this.getUrl('/proposals/collaterals/fields/values');
		if (pFormData) {
			url = this.encodeURIParamData(url, pFormData);
		}
		return this.http.get(url, this.getDefaultOptions());
	}

	public saveCollateralDetails(pFormData, custNum) {
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(this.getUrl('/proposals/customers/' + custNum + '/collaterals'), pFormData, this.getDefaultOptions());
	}

	public getCustomerCollateralDetails(custNumber) {
		let url = this.getUrl('/proposals/customers/' + custNumber + '/collaterals');
		return this.http.get(url, this.getDefaultOptions());
	}

	public getLinkedfacilities(pFormData) {
		let url = this.getUrl('/proposals/collaterals/linked-facilities?customerNumber=' + pFormData);
		return this.http.get(url, this.getDefaultOptions());
	}

	// covenants
	public deleteCovenantsDetail(trnId) {
		let url = this.getUrl('/covenantDetails/'+trnId);
		return this.http.delete(url, this.getDefaultOptions());
	}

	public getCovenantsDetail(trnProposals) {
		let url = this.getUrl('/proposal/' + trnProposals + "/covenants");
		return this.http.get(url, this.getDefaultOptions());
	}


	public updateCovenantsDetail(pFormData) {
		let url = this.getUrl('/covenantDetails/'+ pFormData['covenantDetails']['id']);
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.put(url, pFormData ,  this.getDefaultOptions());
	}

	public saveCovenantsDetails(pFormData) {
		let url = this.getUrl('/covenantDetails');
		if (pFormData) {
			pFormData = this.encodeURIPostData(pFormData);
		}
		return this.http.post(url, pFormData, this.getDefaultOptions());
	}
}

