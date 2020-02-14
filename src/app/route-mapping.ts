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
    {
        path: 'DRAFT',
        loadChildren: 'src/app/draft-form/draft-form.module#DraftFormModule'
    },
    {
        path: 'LANDING',
        loadChildren: 'src/app/fluid-page/fluid-page.module#FluidPageModule'
    },
	{
	path: 'ServiceTypeMaster',
	loadChildren: 'src/app/ServiceTypeMaster/ServiceTypeMaster.module#ServiceTypeMasterModule'
	},
	{
	path: 'EmployeeC3Y',
	loadChildren: 'src/app/EmployeeC3Y/EmployeeC3Y.module#EmployeeC3YModule'
	},
	{
	path: 'TestLoanGridForm',
	loadChildren: 'src/app/TestLoanGridForm/TestLoanGridForm.module#TestLoanGridFormModule'
	},
	{
	path: 'TestAddLoanForm',
	loadChildren: 'src/app/TestAddLoanForm/TestAddLoanForm.module#TestAddLoanFormModule'
	},
	{
	path: 'TEST_LOAN_GRID_FORM',
	loadChildren: 'src/app/TEST_LOAN_GRID_FORM/TEST_LOAN_GRID_FORM.module#TEST_LOAN_GRID_FORMModule'
	},
	{
	path: 'SaveLoanDetailsForm',
	loadChildren: 'src/app/SaveLoanDetailsForm/SaveLoanDetailsForm.module#SaveLoanDetailsFormModule'
	},
	{
	path: 'TestLoanModal',
	loadChildren: 'src/app/TestLoanModal/TestLoanModal.module#TestLoanModalModule'
	},
	{
	path: 'InitiationMainForm',
	loadChildren: 'src/app/InitiationMainForm/InitiationMainForm.module#InitiationMainFormModule'
	},
	{
	path: 'TestOccForm',
	loadChildren: 'src/app/TestOccForm/TestOccForm.module#TestOccFormModule'
	},
	{
	path: 'SearchForm',
	loadChildren: 'src/app/SearchForm/SearchForm.module#SearchFormModule'
	}
	,{
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
,{
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
];
export class AppRoutingModule {}
