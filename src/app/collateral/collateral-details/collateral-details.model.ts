import { FormCommonComponent } from "../../form-common/form-common.component";
import { SpecificInformation } from "./specific-detail.model";


export class Collateral {
    originalValue: string;
    maximumLoanableValue: string;
    collateralCurrency: string;
    fairMarketValue: string;
    collateralType: string;
    collateralTypeDesc: string;
    collateralSubtype: string;
    collateralSubtypeDesc: string;
    collateralCode: string;
    customerNumber: string;
    scope: string;
    restricted: string;
    liquidationValueFactor = '1';
    AssociatedCustomer: string;
    inputDate: string;
    expiryDate: string;
    collateralStatus: string;
    productProcessor: string = 'CLO';
    referenceNumber: string;
    trnProposalId: string;
    trnDemographicId: string;
    specificFieldInformation = new Array<SpecificInformation>();

    public clear() {
        this.collateralCode = '';
        this.collateralCurrency = '';
        // this.collateralType = '';
        // this.collateralSubtype = '';
        this.expiryDate = '';
        this.originalValue = '';
        this.maximumLoanableValue = '';
        this.fairMarketValue = '';
        this.scope = '';
        this.restricted = '';
       // this.collateralStatus = '';
        const specificFieldInformation = this.specificFieldInformation;
        const newSpecInfo = new Array<SpecificInformation>();
        specificFieldInformation.forEach(data => {
            const obj = new SpecificInformation();
            Object.assign(obj, data);
            obj.clear();
            newSpecInfo.push(obj);
        });
        this.specificFieldInformation = newSpecInfo;
    }

    validateFields(component: FormCommonComponent) {
        component.flag = 0;
        for (const key in this) {
            console.log(key);
            if (!(this[key] instanceof Function)) {
                component.validateField(this[key], key);
            }
        }
    }
}
