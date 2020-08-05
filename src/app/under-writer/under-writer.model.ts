
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
                modalSectionName: "OccupationDetails"
            },
            {
                title: "Total Liability (Annual)",
                subTitle: this.TotalLiabiity,
                type: "basic",
                modalSectionName: this.TotalLiabiity != 'NA' ? "LiabilityDetails" : ""
            },
            {
                title: "Total Asset Value",
                subTitle: this.TotalAssetValue,
                type: "basic",
                modalSectionName: this.TotalAssetValue != 'NA' ? "AssetDetails" : ""
            },
            {
                title: "Total Obligation (Annual)",
                subTitle: this.TotalObligation,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Net Income Monthly (Annual)",
                subTitle: this.NetIncomeMonthly,
                type: "basic",
                modalSectionName: ""
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
            data: fieldList
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
                    fieldList[2].subTitle = this.Common.getFieldValueFromObj(element, "OccupationType")
                    fieldList[3].subTitle = "pending";
                }
            });
        }

        const returnObj: IGeneralCardData = {
            name: "Address Details",
            modalSectionName: this.addressesList.length ? "AddressDetails" : "",
            data: fieldList
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
            data: fieldList
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
            data: fieldList
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
            data: ""
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
            data: ""
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
            data: ""
        };
        return returnObj;
    }
}

//APPLICATION SECTION CLASSES

export class LoanDetails implements IDeserializable {
    public DisbursementDate: string = "NA";
    public TotalInstallmentAmount: string = "NA";
    public RepaymentStartDate: string = "NA";
    public Disbursals: string = "NA";
    public RepaymentFrequency: string = "NA";
    public FeesAndCharges: string = "NA";
    public AmoritizationAmount: string = "NA";
    public MarginMoney: string = "NA";
    public TotalInterestAmount: string = "NA";
    public common: Common;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Disbursement Date",
                subTitle: this.DisbursementDate,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Total Installment Amount",
                subTitle: this.TotalInstallmentAmount,
                type: "basic",
                modalSectionName: this.TotalInstallmentAmount == 'NA' ? '' : 'AmortizationScheduleComponent'
                //modalSectionName: "AmortizationScheduleComponent"
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
                modalSectionName: ""
            },
            {
                title: "Repayment Frequency",
                subTitle: this.RepaymentFrequency,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Total Fees & Charges",
                subTitle: this.FeesAndCharges,
                type: "basic",
                modalSectionName: this.FeesAndCharges == 'NA' ? '' : 'FeesAndCharges'
                //modalSectionName: 'FeesAndCharges'
            },
            {
                title: "Amoritization Amount",
                subTitle: this.AmoritizationAmount,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Margin Money",
                subTitle: this.MarginMoney,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Total Interest Amount",
                subTitle: this.TotalInterestAmount,
                type: "basic",
                modalSectionName: ""
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Loan Details",
            modalSectionName: this.isSectionAvaliable(),
            // modalSectionName: "LoanDetails",
            data: fieldList
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.DisbursementDate == 'NA' && this.TotalInstallmentAmount == 'NA' && this.RepaymentStartDate == 'NA' && this.Disbursals == 'NA' && this.RepaymentFrequency == 'NA' && this.FeesAndCharges == 'NA' && this.AmoritizationAmount == 'NA' && this.MarginMoney == 'NA' && this.TotalInterestAmount == 'NA') {
            return ""
        } else {
            return "LoanDetails";
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
            data: fieldList
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
            {
                title: "Branch",
                subTitle: this.Branch,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Category on the front page",
                subTitle: this.FrontPageCategory,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Maximum Card Limit",
                subTitle: this.MaxCardLimit,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Approved Limit",
                subTitle: this.ApprovedLimit,
                type: "basic",
                modalSectionName: ""
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Card Details",
            modalSectionName: this.isSectionAvaliable(),
            data: fieldList
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.Branch == 'NA' && this.FrontPageCategory == 'NA' && this.MaxCardLimit == 'NA' && this.ApprovedLimit == 'NA') {
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
            data: fieldList
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
            data: fieldList
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
            data: fieldList
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
                    if (element.hasOwnProperty('DeviationLevel')) {
                        data.failure += 1;
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
            data: ""
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
            data: ""
        };
        return returnObj;
    }
}

export class PropertyDetails implements IDeserializable {
    public propertType: string = "NA";
    public builderName: string = "NA";
    public projectName: string = "NA";
    public nameOfSeller: string = "NA";
    public costOfProperty: string = "NA";
    public downPaymentAmount: string = "NA";

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Property Type",
                subTitle: this.propertType,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Builder Name",
                subTitle: this.builderName,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Project Name",
                subTitle: this.projectName,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Name of Seller",
                subTitle: this.nameOfSeller,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Cost of Property",
                subTitle: this.costOfProperty,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Down Payment Amount",
                subTitle: this.downPaymentAmount,
                type: "basic",
                modalSectionName: ""
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Card Details",
            modalSectionName: this.isSectionAvaliable(),
            data: fieldList
        };
        return returnObj;
    }

    isSectionAvaliable() {
        if (this.propertType == 'NA' && this.builderName == 'NA' && this.projectName == 'NA' && this.nameOfSeller == 'NA' && this.costOfProperty == 'NA' && this.downPaymentAmount == 'NA') {
            return ""
        } else {
            return "";
        }
    }
}

export class InterfaceResults implements IDeserializable {
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
            name: "Interface Results",
            modalSectionName: "",
            data: []
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

    public FullName: string = "NA";
    public ExistingCustomer: string = "NA";
    public DOB: string = "NA";
    public CustomerType: string = "NA";
    public CIF: string = "NA";
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

        if (input.hasOwnProperty("UWRmVisitDetails")) {
            this.RmVisitDetails = new RmVisitDetails().deserialize(input.UWRmVisitDetails);
        }
        else {
            this.RmVisitDetails = new RmVisitDetails().deserialize([]);
        }

        if (input.hasOwnProperty("UWPersonalInterview")) {
            this.PersonalInterview = new PersonalInterview().deserialize(input.UWPersonalInterview);
        } else {
            this.PersonalInterview = new PersonalInterview().deserialize([]);
        }

        //obj
        this.FinancialSummary = new FinancialSummary().deserialize(input.UWIncomeSummary);
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
                subTitle: this.ExistingCustomer,
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
                title: "CIF",
                subTitle: this.CIF,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Customer Type",
                subTitle: this.CustomerType,
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
            data: fieldList
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
}

export class ApplicationDetails implements IDeserializable {
    public LoanDetails: LoanDetails;
    public InterfaceResults: InterfaceResults;
    public VehicalDetails: VehicalDetails;
    public CardDetails: CardDetails;
    public GoldDetails: GoldDetails;
    public EducationDetails: EducationDetails;
    public GoNoGoDetails: GoNoGoDetails;
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

        if (input.hasOwnProperty("UWReferalDetails")) {
            this.ReferalDetails = new ReferalDetails().deserialize(input.UWReferalDetails);
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
        this.LoanDetails = new LoanDetails().deserialize(input.UWIncomeSummary);

        if (input.UWDisbursal != undefined && input.UWDisbursal.DisbursalDate != undefined) {
            this.LoanDetails.DisbursementDate = input.UWDisbursal.DisbursalDate;
        }
        else {
            this.LoanDetails.DisbursementDate = "NA";
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

        if (input.UWLoan != undefined && input.UWLoan.AmoritizationAmount != undefined) {
            this.LoanDetails.AmoritizationAmount = input.UWLoan.AmoritizationAmount
        }
        else {
            this.LoanDetails.AmoritizationAmount = "NA";
        }

        if (input.UWLoan != undefined && input.UWLoan.MargineMoney != undefined) {
            this.LoanDetails.MarginMoney = input.UWLoan.MargineMoney
        }
        else {
            this.LoanDetails.MarginMoney = "NA";
        }

        this.LoanDetails.Disbursals = "NA";
        this.LoanDetails.FeesAndCharges = "NA";

        this.InterfaceResults = new InterfaceResults().deserialize(input.UWInterface);
        this.VehicalDetails = new VehicalDetails().deserialize(input.UWIncomeSummary);

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
                subTitle: this.PhysicalFormNumber,
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
                subTitle: this.SourcingChannel,
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
            data: fieldList
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
        this.CustomerDetails = input["UWCustomerDetails"].map(jsonData => new CustomerDetails().deserialize(jsonData));

        delete input["UWCustomerDetails"];// IMP:deleting the key coz it was getting added in ApplicationDetails Class Obj
        this.ApplicationDetails = new ApplicationDetails().deserialize(input);
        this.productCategory = input["UWLoan"].ProductCategory;
        return this;
    }
}
