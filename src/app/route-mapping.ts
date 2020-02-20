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
        path: 'LANDING',
        loadChildren: 'src/app/fluid-page/fluid-page.module#FluidPageModule'
    }
    , {
        path: 'ServiceTypeMaster',
        loadChildren: 'src/app/ServiceTypeMaster/ServiceTypeMaster.module#ServiceTypeMasterModule'
    },
    {
        path: 'ServiceTypeMaster',
        loadChildren: 'src/app/ServiceTypeMaster/ServiceTypeMaster.module#ServiceTypeMasterModule'
    },
    {
        path: 'SearchForm',
        loadChildren: 'src/app/SearchForm/SearchForm.module#SearchFormModule'
    },
    {
        path: 'InitiationMainForm',
        loadChildren: 'src/app/InitiationMainForm/InitiationMainForm.module#InitiationMainFormModule'
    },
    {
        path: 'AddressDetails',
        loadChildren: 'src/app/AddressDetails/AddressDetails.module#AddressDetailsModule'
    },
    {
        path: 'LiabilityDetails',
        loadChildren: 'src/app/LiabilityDtlsForm/LiabilityDtlsForm.module#LiabilityDtlsFormModule'
    },
    {
        path: 'DeductionDeatils',
        loadChildren: 'src/app/OtherDeductionForm/OtherDeductionForm.module#OtherDeductionFormModule'
    }
    //   {
    //     path: 'QDE',
    //     loadChildren: 'src/app/QDE/QDE.module#QDEModule'
    // }

];
export class AppRoutingModule {}
