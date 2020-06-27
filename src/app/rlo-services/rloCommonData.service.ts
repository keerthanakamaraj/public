import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { RloUtilService } from './rloutil.service';
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';
import { forkJoin } from 'rxjs';

export interface subjectParamsInterface {
    action: string;
    data: any;
}

export interface IComponentLvlData {
    name?: string;
    data: any;//eg:when used in grid(address) data contains list of added addressed
    BorrowerSeq?: string;
    sectionName?: string;
}


export interface IComponentSectionValidationData {
    isSectionValid: boolean,
    errorMessage: string
}

@Injectable({
    providedIn: 'root'
})


export class RloCommonData {

    //used to define if the header should be expaneded or collapsed
    childToParentSubject = new Subject<subjectParamsInterface>();
    updateDdeMenuSubject = new Subject<string>();//add or remove

    dataSavedSubject = new Subject<boolean>();//when a particular form section is saved successfully(save),subscribed in DDE

    dynamicComponentInstance: any;

    /////////////////////////////////////////////////////////
    masterDataMap = new Map();//contains customer and address data maps used in QDE and DDE
    componentLvlDataSubject = new Subject<IComponentLvlData>();

    constructor(public rloutil: RloUtilService) {
        this.resetMapData();
        console.log(this.masterDataMap);
    }

    resetMapData() {
        this.masterDataMap.set("customerMap", new Map());
        this.masterDataMap.set("applicationMap", new Map());
    }

    // //action can be 'add' or 'remove'
    // updateValuesFundLineGraph(action: string) {
    //     this.updateDdeMenuSubject.next(action);
    // }

    //action can be 'add' or 'remove'
    updateValuesFundLineGraph(action: string) {
        this.updateDdeMenuSubject.next(action);
    }

    getUpdatedDdeMenu(): Observable<any> {
        return this.updateDdeMenuSubject.asObservable();
    }




    ///////////////////////////////////////////////////////////////
    //global fn to get component lvl data (grid load,customerDtls data,etc)
    globalComponentLvlDataHandler(data: IComponentLvlData) {
        this.componentLvlDataSubject.next(data);
    }

    getComponentLvlData(): Observable<any> {
        return this.componentLvlDataSubject.asObservable();
    }

    // updateMasterDataMap(componentData: any, isCustomerTabSelected: boolean) {
    //     console.warn("deep ===", componentData, isCustomerTabSelected);
    //     let customerDetails = new Map();
    //     let tempStoreMap = new Map();
    //     const borSeq: string = componentData.BorrowerSeq;

    //     if (isCustomerTabSelected) {
    //         tempStoreMap.set("customerMap", this.masterDataMap.get("customerMap"))
    //     }
    //     else {
    //         tempStoreMap.set("applicationMap", this.masterDataMap.get("applicationMap"))
    //     }

    //     console.warn(this.masterDataMap, tempStoreMap);

    //     if (componentData.data.length > 0) {
    //         if (tempStoreMap.get("customerMap")) {
    //             if ((tempStoreMap.get("customerMap")).has(borSeq)) {
    //                 customerDetails = tempStoreMap.get("customerMap").get(borSeq);
    //             }
    //         }

    //         switch (componentData.name) {
    //             case 'CustomerDetails':
    //                 customerDetails.set('CustomerDetails', componentData.data[0]);
    //                 break;
    //             case 'AddressDetails':
    //                 customerDetails.set('AddressDetails', componentData.data);
    //                 break;
    //             case 'OccupationDetails':
    //                 customerDetails.set('OccupationDetails', componentData.data);
    //                 break;
    //             case 'FamilyDetails':
    //                 customerDetails.set('FamilyDetails', componentData.data);
    //                 break;
    //             case 'LiabilityDetails':
    //                 customerDetails.set('LiabilityDetails', componentData.data);
    //                 break;
    //             case 'AssetDetails':
    //                 customerDetails.set('AssetDetails', componentData.data);
    //                 break;
    //             case 'IncomeSummary':
    //                 customerDetails.set('IncomeSummary', componentData.data);
    //                 break;
    //             case 'CollateralDetails':
    //                 customerDetails.set('CollateralDetails', componentData.data);
    //                 break;
    //             case 'PersonalInterviewDetails':
    //                 customerDetails.set('PersonalInterviewDetails', componentData.data);
    //                 break;
    //             case 'RmVisitDetails':
    //                 customerDetails.set('RmVisitDetails', componentData.data);
    //                 break;
    //         }

    //         tempStoreMap.get("customerMap").set(borSeq, customerDetails);
    //     }
    //     else if (componentData.name !== 'CustomerDetails') {
    //         const borSeq: string = componentData.BorrowerSeq;
    //         let customerDetails = new Map();
    //         if (tempStoreMap.get("customerMap").has(borSeq)) {
    //             customerDetails = tempStoreMap.get("customerMap").get(borSeq);
    //             customerDetails.delete(componentData.name);
    //         }
    //     }
    //     console.log(tempStoreMap);
    // }

    updateMasterDataMap(componentData: any, isCustomerTabSelected: boolean) {
        console.warn("deep ===", componentData, isCustomerTabSelected);
        let mapValue = new Map();
        let tempStoreMap = new Map();
        let mapName = undefined;
        let mapKey = undefined;

        if (isCustomerTabSelected) {
            mapName = "customerMap";
            mapKey = componentData.BorrowerSeq;
        } else {
            mapName = "applicationMap";
            mapKey = componentData.sectionName;
        }

        tempStoreMap.set(mapName, this.masterDataMap.get(mapName))


        console.warn(this.masterDataMap, tempStoreMap);

        if (componentData.data.length > 0) {
            if (tempStoreMap.get(mapName)) {
                if ((tempStoreMap.get(mapName)).has(mapKey)) {
                    mapValue = tempStoreMap.get(mapName).get(mapKey);
                }
            }

            switch (componentData.name) {
                case 'CustomerDetails': // for customer tab
                    mapValue.set('CustomerDetails', componentData.data[0]);
                    break;
                case 'AddressDetails':
                    mapValue.set('AddressDetails', componentData.data);
                    break;
                case 'OccupationDetails':
                    mapValue.set('OccupationDetails', componentData.data);
                    break;
                case 'FamilyDetails':
                    mapValue.set('FamilyDetails', componentData.data);
                    break;
                case 'LiabilityDetails':
                    mapValue.set('LiabilityDetails', componentData.data);
                    break;
                case 'AssetDetails':
                    mapValue.set('AssetDetails', componentData.data);
                    break;
                case 'IncomeSummary':
                    mapValue.set('IncomeSummary', componentData.data);
                    break;
                case 'CollateralDetails':
                    mapValue.set('CollateralDetails', componentData.data);
                    break;
                case 'PersonalInterviewDetails':
                    mapValue.set('PersonalInterviewDetails', componentData.data);
                    break;
                case 'RmVisitDetails':
                    mapValue.set('RmVisitDetails', componentData.data);
                    break;
                case 'GoNoGoDetails': // for application tab
                    mapValue = componentData.data;
                    console.log("in service switch case", mapValue);
                    this.validateGONOGOSection();
                    break;
                case 'Notes':
                    mapValue = componentData.data;
                    break;
                case 'LoanDetails':
                    mapValue = componentData.data;
                    break;
                case 'CreditCardDetails':
                    mapValue = componentData.data;
                    break;
            }

            tempStoreMap.get(mapName).set(mapKey, mapValue);
        }
        else if (componentData.name !== 'CustomerDetails') {
            const borSeq: string = componentData.BorrowerSeq;
            let customerDetails = new Map();
            if (tempStoreMap.get("customerMap").has(borSeq)) {
                customerDetails = tempStoreMap.get("customerMap").get(borSeq);
                customerDetails.delete(componentData.name);
            }
        }
        console.log("shweta :: in update services temp map", tempStoreMap);
    }

    //TAGS
    //updateTags
    async updateAddressTags(event) {
        const tags = [];
        event.data.forEach(address => {
            let tagText = '';
            if (address.MailingAddress === 'Y') {
                if (address.AddressType === 'OF') {
                    tagText = 'Office; ';
                } else if (address.AddressType === 'RS') {
                    tagText = 'Residence; ';
                }

                tagText = tagText + this.rloutil.concatenate([address.AddressLine1, address.Region, address.City, address.State, address.PinCode], ', ');
                tags.push({ text: tagText });
            }
        });
        return tags;
    }

    async UpdateOccupationTags(event) {
        const tags = [];
        event.data.forEach(occupation => {
            switch (occupation.Occupation) {
                case 'RT': tags.push({ text: 'Retired' }); break;
                case 'HW': tags.push({ text: 'Housewife' }); break;
                case 'ST': tags.push({ text: 'Student' }); break;
                case 'SL': tags.push({ text: 'Salaried' }); break;
                case 'SE': tags.push({ text: 'Self Employed' }); break;
                case 'OT': tags.push({ text: 'Others' }); break;
                default: tags.push({ text: occupation.Occupation });
            }
        });
        return tags;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    async validateCustomer(CUSTOMER_DETAILS: CustomerDtlsComponent) {
        const noOfErrors: number = await CUSTOMER_DETAILS.revalidate();
        return (noOfErrors > 0) ? false : true;
    }

    //all validation fn()
    async validateCustomerDetailsSection(customerData) {
        let dataObject = {
            isAppValidFlag: true,
            errorsList: []
        }

        let errorMessage;
        let custFullName = customerData.FullName;
        let isCustomerValid = await this.validateCustomer(this.dynamicComponentInstance);

        if (!isCustomerValid) {
            errorMessage = errorMessage + ' All mandatory fields for the customer';
        }

        if (!isCustomerValid) {
            errorMessage = 'formalities of customer ' + custFullName + ' are pending. Please fill : ' + errorMessage;
            dataObject.errorsList.push(errorMessage);
            dataObject.isAppValidFlag = false;
        }

        return dataObject;
    }

    getCustomerList() {
        let CustomerList = [];
        if (this.masterDataMap.has('customerMap')) {
            const customerMap = this.masterDataMap.get('customerMap');
            customerMap.forEach(entry => {
                if (entry.has('CustomerDetails')) {
                    CustomerList.push(entry.get('CustomerDetails'));
                }
            });
        }
        return CustomerList;
    }














    //88888888888888888888888888888888888888888888888888888888888888888888888888888

    async isFormValid(page: string, CUSTOMER_DETAILS: CustomerDtlsComponent) {
        let dataObject = {
            isAppValid: true,
            errorsList: []
        }
        var dataToValidate: Map<any, any>;
        if (page == "QDE") {
            dataToValidate = this.masterDataMap.get("customerMap");
        }

        await this.asyncForEach(Array.from(dataToValidate.entries()), async (entry) => {
            let isAddressValid = true;
            let isOccupationValid = true;
            let isCustomerValid = true;
            let errorMessage = '';
            let custFullName = '';

            if (entry[1].has('CustomerDetails')) {
                const customer = entry[1].get('CustomerDetails');
                custFullName = customer.FullName;
                isCustomerValid = await this.validateCustomer(CUSTOMER_DETAILS);

                if (!isCustomerValid) {
                    errorMessage = errorMessage + ' All mandatory fields for the customer';
                }

                forkJoin(
                    this.validateAddressDetailSection(entry[1]),
                    this.validateOccupationDetailsSection(entry[1])
                ).subscribe((data) => {
                    console.error(data);
                    isAddressValid = data[0].isSectionValid;
                    isOccupationValid = data[1].isSectionValid;

                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];
                        if (!element.isSectionValid) {
                            errorMessage = errorMessage !== '' ? errorMessage + ', ' : errorMessage;
                        }
                        errorMessage += element.errorMessage;
                    }

                    if (!(isCustomerValid && isAddressValid && isOccupationValid)) {
                        let msg = "Formalities of customer " + custFullName + " are pending kindly fill : " + errorMessage + "\r\n";
                        dataObject.errorsList.push(msg);
                        dataObject.isAppValid = false;
                    }
                });
            }
        });
        console.warn(dataObject.errorsList);
        return dataObject;
    }

    async validateOccupationDetailsSection(customerSectionData: Map<any, any>) {
        let customerData = customerSectionData.get('CustomerDetails');
        let commonObj: IComponentSectionValidationData = {
            isSectionValid: true,
            errorMessage: ''
        }

        const LoanOwnership = customerData.LoanOwnership;

        if (LoanOwnership !== undefined) {
            commonObj.isSectionValid = false;
            if (customerSectionData.has('OccupationDetails')) {
                const occupationList = customerSectionData.get('OccupationDetails');

                for (const eachOccupation of occupationList) {
                    if (eachOccupation.IncomeType && 'PRI' === eachOccupation.IncomeType.toString()) {
                        commonObj.isSectionValid = true;
                    }
                }
            }
            if (!commonObj.isSectionValid) {
                commonObj.errorMessage += "customer's primary occupation is required.";
            }
        }
        return commonObj;
    }

    async validateAddressDetailSection(sectionData: Map<any, any>) {
        let commonObj: IComponentSectionValidationData = {
            isSectionValid: true,
            errorMessage: ''
        }
        let customerData = sectionData.get('CustomerDetails');

        const LoanOwnership = customerData.LoanOwnership;
        const custType = customerData.CustomerType;

        if (!sectionData.has('AddressDetails')) {
            commonObj.isSectionValid = false;
            commonObj.errorMessage += 'add atleast one address';
        } else {
            const addressList = sectionData.get('AddressDetails');
            const addrValidationObj = { isMailing: false, isPermenet: false, isCurrent: false, isOffice: false };
            for (const eachAddress of addressList) {
                if (eachAddress.MailingAddress && eachAddress.MailingAddress === 'Y') {
                    addrValidationObj.isMailing = true;
                }
                if ('CR' === ('' + eachAddress.OccupancyType)) {
                    addrValidationObj.isCurrent = true;
                }
                if ('PR' === ('' + eachAddress.OccupancyType)) {
                    addrValidationObj.isPermenet = true;
                }
                if ('OF' === ('' + eachAddress.AddressType)) {
                    addrValidationObj.isOffice = true;
                }
            }

            if (LoanOwnership === undefined && custType !== 'B' && custType !== 'CB') {
                addrValidationObj.isOffice = true;
            }

            for (const flag in addrValidationObj) {
                if (!addrValidationObj[flag]) {
                    commonObj.isSectionValid = false;
                }
            }

            if (!commonObj.isSectionValid) {
                commonObj.errorMessage += (addrValidationObj.isOffice) ?
                    'add one permanent residence, one current residence and select one of these as the correspondence address'
                    : 'add one permanent residence, one current residence and at least one office address and select one of these as the correspondence address';
            }
        }
        return commonObj;
    }

    async getCustomerDetails(CUSTOMER_DETAILS) {
        let commonObj: IComponentSectionValidationData = {
            isSectionValid: true,
            errorMessage: ''
        }

        commonObj.isSectionValid = await this.validateCustomer(CUSTOMER_DETAILS);

        if (!commonObj.isSectionValid) {
            commonObj.errorMessage = ' All mandatory fields for the customer';
        }

        return commonObj;
    }

    async validateGONOGOSection() {
        let commonObj = {
            isSectionValid: true,
            errorMessage: ''
        }

        console.log("shweta :: in service validation", commonObj);
        return commonObj;
    }
}
