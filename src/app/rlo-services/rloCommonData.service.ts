import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { RloUtilService } from './rloutil.service';
import { CustomerDtlsComponent } from '../CustomerDtls/CustomerDtls.component';

export interface subjectParamsInterface {
    action: string;
    data: any;
}

export interface IComponentLvlData {
    name?: string;
    data: any;//eg:when used in grid(address) data contains list of added addressed
    BorrowerSeq?: string;
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

    resetMapData(){
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

    updateMasterDataMap(componentData: any, isCustomerTabSelected: boolean) {
        console.warn("deep ===", componentData, isCustomerTabSelected);
        let customerDetails = new Map();
        let tempStoreMap = new Map();
        const borSeq: string = componentData.BorrowerSeq;

        if (isCustomerTabSelected) {
            tempStoreMap.set("customerMap", this.masterDataMap.get("customerMap"))
        }
        else {
            tempStoreMap.set("applicationMap", this.masterDataMap.get("applicationMap"))
        }

        console.warn(this.masterDataMap, tempStoreMap);

        if (componentData.data.length > 0) {
            if (tempStoreMap.get("customerMap")) {
                if ((tempStoreMap.get("customerMap")).has(borSeq)) {
                    customerDetails = tempStoreMap.get("customerMap").get(borSeq);
                }
            }

            switch (componentData.name) {
                case 'CustomerDetails':
                    customerDetails.set('CustomerDetails', componentData.data[0]);
                    break;
                case 'AddressDetails':
                    customerDetails.set('AddressDetails', componentData.data);
                    break;
                case 'OccupationDetails':
                    customerDetails.set('OccupationDetails', componentData.data);
                    break;
                case 'FamilyDetails':
                    customerDetails.set('FamilyDetails', componentData.data);
                    break;
                case 'LiabilityDetails':
                    customerDetails.set('LiabilityDetails', componentData.data);
                    break;
                case 'AssetDetails':
                    customerDetails.set('AssetDetails', componentData.data);
                    break;
                case 'IncomeSummary':
                    customerDetails.set('IncomeSummary', componentData.data);
                    break;
                case 'CollateralDetails':
                    customerDetails.set('CollateralDetails', componentData.data);
                    break;
                case 'PersonalInterviewDetails':
                    customerDetails.set('PersonalInterviewDetails', componentData.data);
                    break;
                case 'RmVisitDetails':
                    customerDetails.set('RmVisitDetails', componentData.data);
                    break;
            }

            tempStoreMap.get("customerMap").set(borSeq, customerDetails);
        }
        else if (componentData.name !== 'CustomerDetails') {
            const borSeq: string = componentData.BorrowerSeq;
            let customerDetails = new Map();
            if (tempStoreMap.get("customerMap").has(borSeq)) {
                customerDetails = tempStoreMap.get("customerMap").get(borSeq);
                customerDetails.delete(componentData.name);
            }
        }
        console.log(tempStoreMap);
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

    async isFormValid(page: string, CUSTOMER_DETAILS: CustomerDtlsComponent) {
        let dataObject = {
            isAppValidFlag: true,
            errorsList: []
        }
        var dataToValidate: Map<any, any>;
        if (page == "QDE") {
            dataToValidate = this.masterDataMap.get("customerMap");
        } else {

        }

        await this.asyncForEach(Array.from(dataToValidate.entries()), async (entry) => {
            let isAddressValid = true;
            let isOccupationValid = true;
            let isCustomerValid = true;
            let errorMessage = '';
            let custFullName = '';
            // const bottowerSeq: string = entry[0];
            if (entry[1].has('CustomerDetails')) {
                const customer = entry[1].get('CustomerDetails');
                custFullName = customer.FullName;
                isCustomerValid = await this.validateCustomer(CUSTOMER_DETAILS);

                if (!isCustomerValid) {
                    errorMessage = errorMessage + ' All mandatory fields for the customer';
                }
                const LoanOwnership = customer.LoanOwnership;
                const custType = customer.CustomerType;

                if (!entry[1].has('AddressDetails')) {
                    isAddressValid = false;
                    errorMessage = errorMessage !== '' ? errorMessage + ', ' : errorMessage;
                    errorMessage = errorMessage + ' Add atleast one address';
                } else {
                    const addressList = entry[1].get('AddressDetails');
                    const addrValidationObj = { isMailing: false, isPermenet: false, isCurrent: false, isOffice: false };
                    const isMailing = true;
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
                            isAddressValid = false;
                        }
                    }

                    if (!isAddressValid) {
                        errorMessage = errorMessage !== '' ? errorMessage + ', ' : errorMessage;
                        errorMessage += (addrValidationObj.isOffice) ?
                            'add one permanent residence, one current residence and select one of these as the correspondence address'
                            // tslint:disable-next-line:max-line-length
                            : 'add one permanent residence, one current residence and at least one office address and select one of these as the correspondence address';
                    }
                }

                if (LoanOwnership !== undefined) {
                    isOccupationValid = false;
                    if (entry[1].has('OccupationDetails')) {
                        const occupationList = entry[1].get('OccupationDetails');

                        for (const eachOccupation of occupationList) {
                            if (eachOccupation.IncomeType && 'PRI' === eachOccupation.IncomeType.toString()) {
                                isOccupationValid = true;
                            }
                        }
                    }
                    if (!isOccupationValid) {
                        errorMessage = errorMessage !== '' ? errorMessage + '. ' : errorMessage;
                        errorMessage = errorMessage + 'Customer\'s primary occupation is required.';

                    }
                }
            }

            if (!(isCustomerValid && isAddressValid && isOccupationValid)) {
                errorMessage = 'formalities of customer ' + custFullName + ' are pending. Please fill : ' + errorMessage;
                dataObject.errorsList.push(errorMessage);
                dataObject.isAppValidFlag = false;
            }
        });

        return dataObject;
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
}