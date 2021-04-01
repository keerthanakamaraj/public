import { Routes } from "@angular/router";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { FavoritesComponent } from "./favorites/favorites.component";
export var componentRoutes: Routes = [
	{
		path: 'CUSTPROFILE',
		component: MyProfileComponent
	},
	{
		path: 'result',
		loadChildren: 'src/app/result-page/result-page.module#ResultPageModule'
	},
	{
		path: 'VIEWIMG',
		loadChildren: 'src/app/view-image/view-image.module#ViewImageModule'
	},
	{
		path: 'VIEWPDF',
		loadChildren: 'src/app/view-pdf/view-pdf.module#ViewPdfModule'
	},
	{
		path: 'favorites',
		component: FavoritesComponent
	},
	// {
	//     path: 'DRAFT',
	//     loadChildren: 'src/app/draft-form/draft-form.module#DraftFormModule'
	// },
	{
		path: 'LANDING',
		loadChildren: 'src/app/my-tray-page/my-tray-page.module#MYTRAYPAGEModule'
	},
	{
		path: 'ServiceTypeMaster',
		loadChildren: 'src/app/ServiceTypeMaster/ServiceTypeMaster.module#ServiceTypeMasterModule'
	},

	{
		path: 'Initiation',
		loadChildren: 'src/app/Initiation/Initiation.module#InitiationModule'
	},
	{
		path: 'SearchForm',
		loadChildren: 'src/app/SearchForm/SearchForm.module#SearchFormModule'
	}
	, {
		path: 'ApplicationDtls',
		loadChildren: 'src/app/ApplicationDtls/ApplicationDtls.module#ApplicationDtlsModule'
	},
	{
		path: 'AddressDetails',
		loadChildren: 'src/app/AddressDetails/AddressDetails.module#AddressDetailsModule'
	},
	{
		path: 'OccupationDtlsForm',
		loadChildren: 'src/app/OccupationDtlsForm/OccupationDtlsForm.module#OccupationDtlsFormModule'
	}
	, {
		path: 'LiabilityDtlsForm',
		loadChildren: 'src/app/LiabilityDtlsForm/LiabilityDtlsForm.module#LiabilityDtlsFormModule'
	},
	{
		path: 'LiabilityDtlsForm',
		loadChildren: 'src/app/LiabilityDtlsForm/LiabilityDtlsForm.module#LiabilityDtlsFormModule'
	},
	{
		path: 'AssetDetailsForm',
		loadChildren: 'src/app/AssetDetailsForm/AssetDetailsForm.module#AssetDetailsFormModule'
	},
	{
		path: 'IncomeSummaryForm',
		loadChildren: 'src/app/IncomeSummaryForm/IncomeSummaryForm.module#IncomeSummaryFormModule'
	},
	{
		path: 'CustomerDtls',
		loadChildren: 'src/app/CustomerDtls/CustomerDtls.module#CustomerDtlsModule'
	},
	{
		path: 'VisitReportForm',
		loadChildren: 'src/app/VisitReportForm/VisitReportForm.module#VisitReportFormModule'
	},
	{
		path: 'QDE',
		loadChildren: 'src/app/QDE/QDE.module#QDEModule'
	},
	{
		path: 'DDE',
		loadChildren: 'src/app/DDE/DDE.module#DDEModule'
	},
	{
		path: 'Underwriter',
		loadChildren: 'src/app/under-writer/under-writer.module#UnderWriterModule'
	},
	{
		path: 'FamilyDetailsForm',
		loadChildren: 'src/app/FamilyDetailsForm/FamilyDetailsForm.module#FamilyDetailsFormModule'
	},
	{
		path: 'CreditCardDetails',
		loadChildren: 'src/app/CreditCardDetails/CreditCardDetails.module#CreditCardDetailsModule'
	},
	{
		path: 'checkEligibilityForm',
		loadChildren: 'src/app/checkEligibilityForm/checkEligibilityForm.module#checkEligibilityFormModule'
	}
	,
	{
		path: 'FeesChargesDetails',
		loadChildren: 'src/app/Fees&ChargesDetails/Fees&ChargesDetails.module#FeesChargesDetailsModule'
	},
	{
		path: 'Operation',
		loadChildren: 'src/app/Operation/Operation.module#OperationModule'
	},
	{
		path: 'DisbursementDetails',
		loadChildren: 'src/app/DisbursementDetails/DisbursementDetails.module#DisbursementDetailsModule'
	},
	{
		path: 'document',
		loadChildren: 'src/app/document-upload/document-upload.module#DocumentUploadModule'
	},
	{
		path: 'collateral',
		loadChildren: 'src/app/collateral/collateral.module#CollateralModule'
	},
	{
		path: 'view-wf',
		loadChildren: 'src/app/workflow-viewer/workflow-viewer.module#WorkflowViewerModule'
	},
	{
		path: 'PRE-CPV',
		loadChildren: 'src/app/pre-cpv/pre-cpv.module#PreCPVModule'
  },
  {
		path: 'PostCPV',
		loadChildren: 'src/app/PostCPV/PostCPV.module#PostCPVModule'
  },
	// {
	// 	path: 'customization-console',
	// 	loadChildren: 'src/app/CustomizationConsole/customization-console.module#CustomizationConsoleModule'
	// },
	{
		path: 'AddOn',
		loadChildren: 'src/app/AddOn/AddOn.module#AddOnModule'
	},
	{
		path: 'LimitEnhancement',
		loadChildren: 'src/app/AddOn/AddOn.module#AddOnModule'
	},
	// {
	// 	path: 'POST-CPV',
	// 	loadChildren: 'src/app/PostCPV/PostCPV.module#PostCPVModule'
	// }
	
   {
		path: 'LoanTopup',
		//   loadChildren: 'src/app/Initiation/Initiation.module#InitiationModule'
		loadChildren: 'src/app/LoanTopupDetails/LoanTopupDetails.module#LoanTopupDetailsModule'
	},
	{
		path: 'TopUpReview',
		loadChildren: 'src/app/top-up-loan-review/top-up-loan-review.module#TopUpLoanReviewModule'
	},
	{
		path: 'RWEQueue',
		loadChildren: 'src/app/RWEQueue/RWEQueue.module#RWEQueueModule'
	},		
];
export class AppRoutingModule { }
