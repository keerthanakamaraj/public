
import { IDeserializable, IGeneralCardData, ICardListData } from "../Interface/masterInterface";
import { Input } from "@angular/core";

export class Common {
    public branchCode: string;

    getFieldValueFromObj(data: any, propertyName: string, returnBlank: boolean = false) {
        return data[propertyName] == undefined ? returnBlank ? "" : "NA" : data[propertyName];
    }

    getSingleFieldValue(propertyName: string) {
        return propertyName == undefined;
    }

    setBranch(code: any) {
        this.branchCode = code;
    }

    getBranch() {
        return this.branchCode;
    }

    getDateFormated(date: string) {
        var index = date.indexOf(" ");
        if (index != -1) {
            return date.slice(0, index);
        }
        else {
            return date;
        }
    }
}

//customer section
export class FinancialSummary implements IDeserializable {
    public NetIncomeMonthly: any = "NA";
    public IncomeSummarySeq: string = "NA";
    public BorrowerSeq: string = "NA";
    public TotalIncome: any = "NA";
    public TotalLiabiity: any = "NA";
    public TotalObligation: any = "NA";
    public TotalAssetValue: any = "NA";
    public DBR: any = "NA";

    public common: Common;

    deserialize(input: any): this {
        console.log(input);
        if (input == undefined) {
            return Object.assign(this, input);
        }
        input.TotalIncome = input.TotalIncome != undefined ? input.TotalIncome ? input.TotalIncome : 'NA' : 'NA';
        input.TotalLiabiity = input.TotalLiabiity != undefined ? input.TotalLiabiity ? input.TotalLiabiity : 'NA' : 'NA';
        input.TotalAssetValue = input.TotalAssetValue != undefined ? input.TotalAssetValue ? input.TotalAssetValue : 'NA' : 'NA';
        input.TotalObligation = input.TotalObligation != undefined ? input.TotalObligation ? input.TotalObligation : 'NA' : 'NA';
        input.NetIncomeMonthly = input.NetIncomeMonthly != undefined ? input.NetIncomeMonthly ? input.NetIncomeMonthly : 'NA' : 'NA';
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Total Income (Annual)",
                subTitle: this.TotalIncome,
                type: "basic",
                modalSectionName: "OccupationDetails",
                formatToCurrency: true
            },
            {
                title: "Total Liability (Annual)",
                subTitle: this.TotalLiabiity,
                type: "basic",
                modalSectionName: this.TotalLiabiity != 'NA' ? "LiabilityDetails" : "",
                formatToCurrency: true
            },
            {
                title: "Total Asset Value",
                subTitle: this.TotalAssetValue,
                type: "basic",
                modalSectionName: this.TotalAssetValue != 'NA' ? "AssetDetails" : "",
                formatToCurrency: true
            },
            {
                title: "Total Obligation (Annual)",
                subTitle: this.TotalObligation,
                type: "basic",
                modalSectionName: this.TotalObligation != 'NA' ? "ObligationDetails" : "",
                //modalSectionName:"ObligationDetails",
                formatToCurrency: true
            },
            {
                title: "Net Income Monthly (Annual)",
                subTitle: this.NetIncomeMonthly,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "DBR",
                subTitle: this.DBR,
                type: "basic",
                modalSectionName: ""
            },
        ];
        const returnObj: IGeneralCardData = {
            name: "Financial Summary",
            modalSectionName: "IncomeSummary",
            data: fieldList,
            canShowModal: false
        };
        return returnObj;
    }

    getBorrowerSeq() {
        return this.BorrowerSeq + 1000;
    }

    isSectionAvaliable() {
        if (this.TotalIncome == 'NA' && this.TotalLiabiity == 'NA' && this.TotalAssetValue == 'NA' && this.TotalObligation == 'NA' && this.NetIncomeMonthly == 'NA' && this.DBR == 'NA') {
            return ""
        } else {
            return "OccupationDetails";
        }
    }
}

export class AddressDetails implements IDeserializable {
    public State: string;
    public City: string;
    public Pincode: string;
    public ResidenceType: string;
    public MailingAddress: string;
    public OccupancyType: string;
    public Verification: string;
    public addressesList: any
    public Common: Common = new Common();

    deserialize(input: any): this {
        this.addressesList = input;
        return this;
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Address Type",
                subTitle: "NA",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Mailing Address",
                subTitle: "NA",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Occupancy Type",
                subTitle: "NA",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Verification",
                subTitle: "pending",
                type: "icon",
                modalSectionName: ""
            }
        ];

        if (this.addressesList.length) {
            this.addressesList.forEach(element => {
                if (element.AddressType == "RS") {
                    fieldList[0].subTitle = "Residence";
                    fieldList[1].subTitle = this.getFullAddress(element);
                    fieldList[2].subTitle = this.getOccupancy(element)
                    fieldList[3].subTitle = "pending";
                }
            });
        }

        const returnObj: IGeneralCardData = {
            name: "Address Details",
            modalSectionName: this.addressesList.length ? "AddressDetails" : "",
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }

    getFullAddress(data) {
        let array = ['Address1', 'City', 'State', 'Pincode'];
        let address = "";
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            let txt = this.Common.getFieldValueFromObj(data, element, true);
            if (i != array.length - 1) {
                txt += ", ";
            }
            address += txt;
        }
        return address;
    }

    getOccupancy(element) {
        if (element.OccupationType != undefined) {
            if (element.OccupationType == "OW") {
                return "Owned";
            }
            else {
                return "Rented";
            }
        }
        else {
            return "NA";
        }
    }
}

export class CollateralDetails implements IDeserializable {
    public CollateralName: any = "NA";
    public CollateralType: string = "NA";
    public CollateralAmount: any = "NA";

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Collateral Type",
                subTitle: this.CollateralType,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Name of Collateral",
                subTitle: this.CollateralName,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Amount",
                subTitle: this.CollateralAmount,
                type: "basic",
                modalSectionName: ""
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Collateral Details",
            modalSectionName: "AssetDetails",
            //modalSectionName: this.isSectionAvaliable(),
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.CollateralType == 'NA' && this.CollateralName == 'NA' && this.CollateralAmount == 'NA') {
            return ""
        } else {
            return "AssetDetails";
        }
    }
}

export class FinancialDetails implements IDeserializable {
    public name: number;
    public IncomeSummarySeq: number;
    public Common: Common = new Common();
    public GrossIncome: string = "pending";
    public ExistingLiabilities: string = "pending";
    public IncomeVerification: string = "pending";
    public PANVerification: string = "pending";

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Gross Income",
                subTitle: this.GrossIncome,
                type: "iconStatus",
                modalSectionName: ""
            },
            {
                title: "Existing Liabilities",
                subTitle: this.ExistingLiabilities,
                type: "iconStatus",
                modalSectionName: ""
            },
            {
                title: "Income Verification",
                subTitle: this.IncomeVerification,
                type: "iconStatus",
                modalSectionName: ""
            },
            {
                title: "PAN Verification",
                subTitle: this.PANVerification,
                type: "iconStatus",
                modalSectionName: ""
            }
        ];

        const returnObj: IGeneralCardData = {
            name: "Financial Details",
            modalSectionName: "",
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }
}

export class FamilyDetails implements IDeserializable {
    public familyList: any = [];

    deserialize(input: any): this {
        this.familyList = input;
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            name: `Family Details (${this.familyList.length})`,
            modalSectionName: this.familyList.length ? "FamilyDetails" : "",
            data: "",
            canShowModal: true
        };
        return returnObj;
    }
}

export class PersonalInterview implements IDeserializable {
    public personalInterviewList: any = [];

    deserialize(input: any): this {
        this.personalInterviewList = input;
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            name: `Personal Interview (${this.personalInterviewList.length})`,
            modalSectionName: this.personalInterviewList.length ? "PersonalInterviewDetails" : "",
            //modalSectionName: "PersonalInterviewDetails",
            data: "",
            canShowModal: true
        };
        return returnObj;
    }
}

export class RmVisitDetails implements IDeserializable {
    public rmVisitListList = [];

    deserialize(input: any): this {
        this.rmVisitListList = input;
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            name: `RM Visit Details (${this.rmVisitListList.length})`,
            modalSectionName: this.rmVisitListList.length ? "RmVisitDetails" : "",
            //modalSectionName: "RmVisitDetails",
            data: "",
            canShowModal: true
        };
        return returnObj;
    }
}

export class AccountDetails implements IDeserializable {
    public accountDetailsList = [];

    deserialize(input: any): this {
        this.accountDetailsList = input;
        return Object.assign(this, input);
    }

    getTableData() {
        let tableRowData = [];

        this.accountDetailsList.forEach(element => {
            let tableData = {};
            if (element.hasOwnProperty("AccountType")) {
                tableData['AccountType'] = element['AccountType'].length ? element['AccountType'] : 'NA';
            } else {
                tableData['AccountType'] = "NA";
            }

            if (element.hasOwnProperty("AccountId")) {
                tableData['AccountNo'] = element['AccountId'].length ? element['AccountId'] : 'NA';
            } else {
                tableData['AccountNo'] = "NA";
            }

            if (element.hasOwnProperty("AvailableBalance")) {
                tableData['AvailableBalance'] = element['AvailableBalance'];
            } else {
                tableData['AvailableBalance'] = "NA";
            }

            if (element.hasOwnProperty("OpeningDate")) {
                tableData['OpeningDate'] = element['OpeningDate'].length ? element['OpeningDate'] : 'NA';
            } else {
                tableData['OpeningDate'] = "NA";
            }

            if (element.hasOwnProperty("AccountStatus")) {
                tableData['AccountStatus'] = element['AccountStatus'].length ? element['AccountStatus'] : 'NA';
            } else {
                tableData['AccountStatus'] = "NA";
            }

            tableRowData.push(tableData);
        });
        return tableRowData;
    }
}

//APPLICATION SECTION CLASSES

export class LoanDetails implements IDeserializable {
    public DisbursalDate: string = "NA";
    public TotalInstallmentAmount: string = "NA";
    public RepaymentStartDate: string = "NA";
    public Disbursals: string = "NA";
    public RepaymentFrequency: string = "NA";
    public FeesAndCharges: string = "NA";
    public AmortizationAmount: string = "NA";
    public MarginMoney: string = "NA";
    public TotalInterestAmount: string = "NA";
    public NetInterestRate: any = 0;//used in amortization modal popup
    public common: Common;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Disbursement Date",
                subTitle: this.DisbursalDate,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Total Installment Amount",
                subTitle: this.TotalInstallmentAmount,
                type: "basic",
                modalSectionName: this.TotalInstallmentAmount == 'NA' ? '' : 'Amortization',
                //modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "Repayment Start Date",
                subTitle: this.RepaymentStartDate,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "No. of Disbursals",
                subTitle: this.Disbursals,
                type: "basic",
                modalSectionName: this.checkDisbursals()
                //modalSectionName: "DisbursementDetails"
            },
            {
                title: "Repayment Frequency",
                subTitle: this.getFrequencyNames(this.RepaymentFrequency),
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Total Fees & Charges",
                subTitle: this.FeesAndCharges,
                type: "basic",
                modalSectionName: this.checkFeesAndCharges(),
                //modalSectionName: 'FeesAndCharges',
                formatToCurrency: true
            },
            {
                title: "Amortization Amount",
                subTitle: this.AmortizationAmount,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "Margin Money",
                subTitle: this.MarginMoney,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "Total Interest Amount",
                subTitle: this.TotalInterestAmount,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Loan Details",
            modalSectionName: this.isSectionAvaliable(),
            // modalSectionName: "LoanDetails",
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.DisbursalDate == 'NA' && this.TotalInstallmentAmount == 'NA' && this.RepaymentStartDate == 'NA' && this.Disbursals == 'NA' && this.RepaymentFrequency == 'NA' && this.FeesAndCharges == 'NA' && this.AmortizationAmount == 'NA' && this.MarginMoney == 'NA' && this.TotalInterestAmount == 'NA') {
            return ""
        } else {
            return "LoanDetails";
        }
    }

    getFrequencyNames(keys) {
        switch (keys) {
            case 'D':
                return 'Daily';
                break;
            case 'W':
                return 'Weekly';
                break;
            case 'BW':
                return 'Bi-Weekly';
                break;
            case 'M':
                return 'Monthly';
                break;
            case 'Q':
                return 'Quaterly';
                break;
            case 'A':
                return 'Annually';
                break;
            default:
                return 'NA'
                break;
        }
    }

    checkDisbursals() {
        if (this.Disbursals != 'NA' && this.Disbursals != "0") {
            return "DisbursementDetails"
        }
        else {
            return '';
        }
    }

    checkFeesAndCharges() {
        if (this.FeesAndCharges != 'NA' && this.FeesAndCharges != "0") {
            return "FeesAndChargesDetails"
        }
        else {
            return '';
        }
    }
}

export class VehicalDetails implements IDeserializable {
    public VehicalCategory: string = "NA";
    public AssetType: string = "NA";
    public Manufacturer: string = "NA";
    public Make: string = "NA";
    public TotalCost: string = "NA";
    public common: Common;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Vehical Category",
                subTitle: this.VehicalCategory,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Asset Type",
                subTitle: this.AssetType,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Manufacturer",
                subTitle: this.Manufacturer,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Make",
                subTitle: this.Make,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Total Cost",
                subTitle: this.TotalCost,
                type: "basic",
                modalSectionName: ""
            }
        ];

        const returnObj: IGeneralCardData = {
            name: "Vehical Details",
            modalSectionName: "",
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }
}

export class CardDetails implements IDeserializable {
    public Branch: string = "NA";
    public FrontPageCategory: string = "NA";
    public MaxCardLimit: string = "NA";
    public ApprovedLimit: string = "NA";

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            // {
            //     title: "Branch",
            //     subTitle: this.Branch,
            //     type: "basic",
            //     modalSectionName: ""
            // },
            // {
            //     title: "Category on the front page",
            //     subTitle: this.FrontPageCategory.length ? this.FrontPageCategory : "NA"
            //     ,
            //     type: "basic",
            //     modalSectionName: ""
            // },
            {
                title: "Maximum Card Limit",
                subTitle: this.MaxCardLimit,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "Approved Limit",
                subTitle: this.ApprovedLimit,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Card Details",
            modalSectionName: this.isSectionAvaliable(),
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.FrontPageCategory == 'NA' && this.MaxCardLimit == 'NA' && this.ApprovedLimit == 'NA') {
            return ""
        } else {
            return "CreditCardDetails";
        }
    }
}

export class GoldDetails implements IDeserializable {
    public TotalWeight: string = "NA";
    public TotalValue: string = "NA";
    public common: Common;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Total Weight",
                subTitle: this.TotalWeight,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Total Value",
                subTitle: this.TotalValue,
                type: "basic",
                modalSectionName: ""
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Gold Details",
            modalSectionName: "",
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }
}

export class EducationDetails implements IDeserializable {
    public NameOfInstitute: string = "NA";
    public AdmissionStatus: string = "NA";
    public AppliedFor: string = "NA";
    public CourseType: string = "NA";
    public CourseName: string = "NA";
    public CostOfCourse: string = "NA";
    public FundsAvaliable: string = "NA";
    public common: Common;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Name of Institute/University",
                subTitle: this.NameOfInstitute,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Admission Status",
                subTitle: this.AdmissionStatus,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Course applied for",
                subTitle: this.AppliedFor,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Course Type",
                subTitle: this.CourseType,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Course Name",
                subTitle: this.CourseName,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Total Cost of the Course",
                subTitle: this.CostOfCourse,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Total Funds Avaliable",
                subTitle: this.FundsAvaliable,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            }

        ];
        const returnObj: IGeneralCardData = {
            name: "Education Details",
            modalSectionName: "",
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }
}

export class GoNoGoDetails implements IDeserializable {
    public goNoGoDetails: any = [];
    public common: Common;

    deserialize(input: any): this {
        this.goNoGoDetails = input;
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Master Parameters",
                subTitle: this.getStatusAndCount(),
                type: "statusCount",
                modalSectionName: ""
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Go/ No-Go Results",
            modalSectionName: this.goNoGoDetails.length ? "GoNoGoDetails" : "",
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }

    getStatusAndCount() {
        let data = {
            success: 0,
            failure: 0
        }

        if (this.goNoGoDetails.length) {
            this.goNoGoDetails.forEach(element => {
                if (element.QuestionnaireCategory == "go_no_go") {
                    if (element.DeviationLevel != undefined) {
                        if (element.DeviationLevel.length) {
                            data.failure += 1;
                        } else {
                            data.success += 1;
                        }
                    }
                    else {
                        data.success += 1;
                    }
                }
            });
        }

        return data;
    }
}

export class ReferalDetails implements IDeserializable {
    public referalDetailsList: any = [];

    deserialize(input: any): this {
        this.referalDetailsList = input;
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            name: `Referral Details (${this.referalDetailsList.length})`,
            modalSectionName: this.referalDetailsList.length ? "ReferrerDetails" : "",
            data: "",
            canShowModal: true
        };
        return returnObj;
    }
}

export class Notes implements IDeserializable {
    public notesList: any = [];

    deserialize(input: any): this {
        this.notesList = input;
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            name: `Notes (${this.notesList.length})`,
            modalSectionName: this.notesList.length ? "Notes" : "",
            data: "",
            canShowModal: true
        };
        return returnObj;
    }
}

export class PropertyDetails implements IDeserializable {
    public PropertyType: string = "NA";
    public BuilderName: string = "NA";
    public ProjectName: string = "NA";
    public NameOfSeller: string = "NA";
    public CostOfProperty: string = "NA";
    public DownPaymentAmount: string = "NA";

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Property Type",
                subTitle: this.getFullName(this.PropertyType),
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Builder Name",
                subTitle: this.BuilderName,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Project Name",
                subTitle: this.ProjectName,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Name of Seller",
                subTitle: this.NameOfSeller,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Cost of Property",
                subTitle: this.CostOfProperty,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "Down Payment Amount",
                subTitle: this.DownPaymentAmount,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Property Details",
            modalSectionName: this.isSectionAvaliable(),
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.PropertyType == 'NA' && this.BuilderName == 'NA' && this.ProjectName == 'NA' && this.NameOfSeller == 'NA' && this.CostOfProperty == 'NA' && this.DownPaymentAmount == 'NA') {
            return ""
        } else {
            return "PropertyDetails";
        }
    }

    getFullName(type) {
        switch (type) {
            case "B":
                return "Bungalow";
                break;

            case "F":
                return "Flat";
                break;

            case "T":
                return "Township";
                break;

            default:
                return "NA";
                break;
        }
    }
}

export class InterfaceResults implements IDeserializable {
    public interfaceList: any = [];

    deserialize(input: any): this {
        this.interfaceList = input;
        return Object.assign(this, input);
    }
    getCardData() {
        const returnObj: IGeneralCardData = {
            name: "Interface Results",
            modalSectionName: this.interfaceList.length ? "InterfaceResults" : "",
            interfaceDataList: this.interfaceList,
            canShowModal: true
        };
        return returnObj;
    }
}


export class CustomerDetails implements IDeserializable {
    public BorrowerSeq: number;
    public FinancialSummary: FinancialSummary;
    public CollateralDetails: CollateralDetails;
    public AddressDetails: AddressDetails;
    public FinancialDetails: FinancialDetails;
    //blank data
    public FamilyDetails: FamilyDetails;
    public PersonalInterview: PersonalInterview;
    public RmVisitDetails: RmVisitDetails;
    public AccountDetails: AccountDetails;//Relationship details table

    public FullName: string = "NA";
    public ExistingCustomer: string = "NA";
    public DOB: string = "NA";
    public CustomerType: string = "NA";
    public CIF: string = "NA";
    public CustomerId: string = "NA";
    public CustomerSince: string = "NA";

    deserialize(input: any): this {
        Object.assign(this, input);
        console.error(input);
        // arrayList 
        if (input.hasOwnProperty("UWFamily")) {
            this.FamilyDetails = new FamilyDetails().deserialize(input.UWFamily);
        }
        else {
            this.FamilyDetails = new FamilyDetails().deserialize([]);
        }

        if (input.hasOwnProperty("UWAddress")) {
            this.AddressDetails = new AddressDetails().deserialize(input.UWAddress)
        }
        else {
            this.AddressDetails = new AddressDetails().deserialize([]);
        }

        if (input.hasOwnProperty("UWRMVisit")) {
            this.RmVisitDetails = new RmVisitDetails().deserialize(input.UWRMVisit);
        }
        else {
            this.RmVisitDetails = new RmVisitDetails().deserialize([]);
        }

        if (input.hasOwnProperty("UWPersonalInterview")) {
            this.PersonalInterview = new PersonalInterview().deserialize(input.UWPersonalInterview);//this 'UWPersonalInterview' obj is manually created in Master 
        } else {
            this.PersonalInterview = new PersonalInterview().deserialize([]);
        }

        if (input.hasOwnProperty("UWAccountDetails")) {
            this.AccountDetails = new AccountDetails().deserialize(input.UWAccountDetails);
        }
        else {
            this.AccountDetails = new AccountDetails().deserialize([]);
        }

        //obj
        this.FinancialSummary = new FinancialSummary().deserialize(input.UWIncomeSummary);

        let assetAmt = 0;
        if (input.hasOwnProperty("UWAsset")) {
            let assetsList = input["UWAsset"];
            assetsList.forEach(element => {
                if (element.hasOwnProperty("EquivalentAmt"))
                    assetAmt += element.EquivalentAmt;
            });
        }
        this.FinancialSummary.TotalAssetValue = !assetAmt ? "NA" : assetAmt;

        this.CollateralDetails = new CollateralDetails().deserialize(input.UWCollateralDetails);
        this.FinancialDetails = new FinancialDetails().deserialize(input.UWIncomeDetails);

        return this;
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Full Name",
                subTitle: this.FullName,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Existing Customer",
                subTitle: this.getFormattedExistance(this.ExistingCustomer),
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Date of Birth",
                subTitle: this.DOB,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Customer Type",
                subTitle: this.getCustomerType(this.CustomerType),
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "CIF",
                subTitle: this.CIF,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "CID",
                subTitle: this.CustomerId,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Customer Since",
                subTitle: this.CustomerSince,
                type: "basic",
                modalSectionName: ""
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Customer 360 degrees",
            modalSectionName: "CustomerDetails",
            //modalSectionName: this.isSectionAvaliable(),
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.FullName == 'NA' && this.ExistingCustomer == 'NA' && this.DOB == 'NA' && this.CIF == 'NA' && this.CustomerType == 'NA' && this.CustomerSince == 'NA') {
            return ""
        } else {
            return "CustomerDetails";
        }
    }

    getCustomerType(type: string) {
        switch (type) {
            case "B":
                return "Borrower"
                break;

            case "CB":
                return "Co-Borrower"
                break;

            case "G":
                return "Guarantor"
                break;

            case "OP":
                return "Other Party"
                break;

            case "A":
                return "Add On"
                break;
            default:
                break;
        }
    }

    getFormattedExistance(val) {
        if (val != 'NA') {
            return val == 'Y' ? 'Yes' : 'No';
        } else {
            return val
        }
    }
}

export class ApplicationDetails implements IDeserializable {
    public LoanDetails: LoanDetails;
    public InterfaceResults: InterfaceResults;
    public VehicalDetails: VehicalDetails;
    public CardDetails: CardDetails;
    public GoldDetails: GoldDetails;
    public EducationDetails: EducationDetails;
    public GoNoGoDetails: GoNoGoDetails;
    public PropertyDetails: PropertyDetails;
    //blank data
    public ReferalDetails: ReferalDetails;
    public Notes: Notes;

    public PhysicalFormNumber: string = "NA";
    public DateOfReceipt: string = "NA";
    public SourcingChannel: string = "NA";
    public DSAId: string = "NA";
    public Branch: string = "NA";

    public Common: Common = new Common();

    deserialize(input: any): this {
        Object.assign(this, input);

        this.PhysicalFormNumber = input.UWApplicationInfo.PhysicalFormNo == undefined ? "NA" : input.UWApplicationInfo.PhysicalFormNo;
        this.DateOfReceipt = input.UWApplicationInfo.DateOfReceipt == undefined ? "NA" : this.Common.getDateFormated(input.UWApplicationInfo.DateOfReceipt)

        if (input.hasOwnProperty("UWNotepad")) {
            this.Notes = new Notes().deserialize(input.UWNotepad);
        }
        else {
            this.Notes = new Notes().deserialize([]);
        }

        if (input.hasOwnProperty("UWReferrrer")) {
            this.ReferalDetails = new ReferalDetails().deserialize(input.UWReferrrer);
        }
        else {
            this.ReferalDetails = new ReferalDetails().deserialize([]);
        }

        if (input.hasOwnProperty("UWQuestionnaire")) {
            this.GoNoGoDetails = new GoNoGoDetails().deserialize(input.UWQuestionnaire);
        }
        else {
            this.GoNoGoDetails = new GoNoGoDetails().deserialize([]);
        }

        //obj
        this.LoanDetails = new LoanDetails().deserialize(input.UWLoan);

        if (input.UWLoan != undefined && input.UWLoan.DisbursalDate != undefined) {
            this.LoanDetails.DisbursalDate = input.UWLoan.DisbursalDate;
        }
        else {
            this.LoanDetails.DisbursalDate = "NA";
        }

        if (input.UWLoan != undefined && input.UWLoan.TotalInstallmentAmount != undefined) {
            this.LoanDetails.TotalInstallmentAmount = input.UWLoan.TotalInstallmentAmount;
        }
        else {
            this.LoanDetails.TotalInstallmentAmount = "NA";
        }

        if (input.UWLoan != undefined && input.UWLoan.RepaymentStartDate != undefined) {
            this.LoanDetails.RepaymentStartDate = input.UWLoan.RepaymentStartDate
        }
        else {
            this.LoanDetails.RepaymentStartDate = "NA";
        }

        if (input.UWLoan != undefined && input.UWLoan.RepaymentFrequency != undefined) {
            this.LoanDetails.RepaymentFrequency = input.UWLoan.RepaymentFrequency
        }
        else {
            this.LoanDetails.RepaymentFrequency = "NA";
        }

        if (input.UWLoan != undefined && input.UWLoan.AmortizationAmount != undefined) {
            this.LoanDetails.AmortizationAmount = input.UWLoan.AmortizationAmount
        }
        else {
            this.LoanDetails.AmortizationAmount = "NA";
        }

        if (input.UWLoan != undefined && input.UWLoan.MargineMoney != undefined) {
            this.LoanDetails.MarginMoney = input.UWLoan.MargineMoney
        }
        else {
            this.LoanDetails.MarginMoney = "NA";
        }

        if (input.UWLoan != undefined) {
            let CollectedUpfront = 0;
            let AdjWithDisb = 0;
            if (input.UWLoan.TotalFeeCollectedUpfront != undefined) {
                CollectedUpfront = input.UWLoan.TotalFeeCollectedUpfront;
            }
            if (input.UWLoan.TotalFeeAdjWithDisb != undefined) {
                AdjWithDisb = input.UWLoan.TotalFeeAdjWithDisb;
            }
            this.LoanDetails.FeesAndCharges = (CollectedUpfront + AdjWithDisb).toString();
            // if (input.UWFeeCharges.length) {
            //     if (input.UWFeeCharges[0].EffectiveAmt == undefined) {
            //         this.LoanDetails.FeesAndCharges = input.UWFeeCharges[0].ChargeAmt;
            //     }
            //     else {
            //         this.LoanDetails.FeesAndCharges = input.UWFeeCharges[0].EffectiveAmt;
            //     }
            // }
            // else {
            //     this.LoanDetails.FeesAndCharges = "NA";
            // }
        }
        else {
            this.LoanDetails.FeesAndCharges = "NA";
        }

        if (input.UWDisbursal != undefined) {
            this.LoanDetails.Disbursals = input.UWDisbursal.length;
        }
        else {
            this.LoanDetails.Disbursals = "NA";
        }

        // this.InterfaceResults = new InterfaceResults().deserialize(input.UWInterfaceResult);

        if (input.hasOwnProperty("UWInterfaceResult")) {
            this.InterfaceResults = new InterfaceResults().deserialize(input.UWInterfaceResult);
        }
        else {
            this.InterfaceResults = new InterfaceResults().deserialize([]);
        }

        this.VehicalDetails = new VehicalDetails().deserialize(input.UWIncomeSummary);
        this.PropertyDetails = new PropertyDetails().deserialize(input.UWProperty);

        this.CardDetails = new CardDetails().deserialize(input.UWCreditCard);
        this.CardDetails.Branch = this.Branch;

        this.GoldDetails = new GoldDetails().deserialize(input.UWIncomeSummary);
        this.EducationDetails = new EducationDetails().deserialize(input.UWIncomeSummary);

        return this;
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Physical Form No.",
                subTitle: this.PhysicalFormNumber.length ? this.PhysicalFormNumber : "NA",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Date Of Receipt",
                subTitle: this.DateOfReceipt,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Sourcing Channel",
                subTitle: this.getSourcingChannel(this.SourcingChannel),
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "DSA ID",
                subTitle: this.DSAId,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Branch",
                subTitle: this.Branch,
                type: "basic",
                modalSectionName: ""
            },
        ];

        const returnObj: IGeneralCardData = {
            name: "Application Details",
            modalSectionName: this.isSectionAvaliable(),
            data: fieldList,
            canShowModal: true
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.PhysicalFormNumber == 'NA' && this.DateOfReceipt == 'NA' && this.SourcingChannel == 'NA' && this.DSAId == 'NA' && this.Branch == 'NA') {
            return ""
        } else {
            return "ApplicationDetails";
        }
    }

    getSourcingChannel(SourcingChannel) {
        if (SourcingChannel != undefined) {
            switch (SourcingChannel) {
                case "BRANCH":
                    return "Branch";
                    break;

                case "OL":
                    return "Online";
                    break;

                case "PORTFOLIO_PURSE":
                    return "Portfolio Purchase";
                    break;

                default:
                    return SourcingChannel
                    break;
            }
        }
        else {
            return "NA";
        }
    }
}

//creates list of Customer class with the below classes as objects
export class Master implements IDeserializable {
    public borrowerSeq: number;
    public productCategory: string;

    public CustomerDetails: CustomerDetails;
    public ApplicationDetails: ApplicationDetails;

    public FinancialSummary: FinancialSummary;
    public CollateralDetails: CollateralDetails;
    public AddressDetails: AddressDetails;
    public FinancialDetails: FinancialDetails;

    //blank data
    public FamilyDetails: FamilyDetails;
    public PersonalInterview: PersonalInterview;
    public RmVisitDetails: RmVisitDetails;

    deserialize(input: any): this {
        let customerList = input["UWCustomerDetails"];
        let questionnaireList = input["UWQuestionnaire"];
        let personalInterviewQuestionsList;

        console.log(customerList, questionnaireList);

        if (questionnaireList != undefined) {
            personalInterviewQuestionsList = questionnaireList.filter(q => q.QuestionnaireCategory == 'per_int');

            customerList.forEach(element => {
                if (element.CustomerType != 'R') {
                    //if (element.UWPersonalInterview != undefined) {
                    element.UWPersonalInterview = questionnaireList.filter(q => q.BorrowerSeq == element.BorrowerSeq);
                    //}
                }
            });
        }

        this.CustomerDetails = input["UWCustomerDetails"].map(jsonData => new CustomerDetails().deserialize(jsonData));

        delete input["UWCustomerDetails"];// IMP:deleting the key coz it was getting added in ApplicationDetails Class Obj
        this.ApplicationDetails = new ApplicationDetails().deserialize(input);
        this.productCategory = input["UWLoan"].ProductCategory;
        return this;
    }
}
