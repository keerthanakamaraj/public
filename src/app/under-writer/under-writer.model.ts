
import { IDeserializable, IGeneralCardData, ICardListData } from "../Interface/masterInterface";

export class Common {
    getFieldValueFromObj(data: any, propertyName: string, returnBlank: boolean = false) {
        return data[propertyName] == undefined ? returnBlank ? "" : "NA" : data[propertyName];
    }

    getSingleFieldValue(propertyName: string) {
        return propertyName == undefined;
    }
}

//customer section
export class FinancialSummary implements IDeserializable {
    public NetIncomeMonthly: string = "NA";
    public IncomeSummarySeq: string = "NA";
    public BorrowerSeq: string = "NA";
    public TotalIncome: string = "NA";
    public TotalLiabiity: any = "NA";
    public TotalObligation: any = "NA";
    public TotalAssetValue: any = "NA";
    public DBR: any = "NA";

    public common: Common;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Total Income (Annual)",
                subTitle: this.TotalIncome,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Total Liability (Annual)",
                subTitle: this.TotalLiabiity,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Total Asset Value (Annuall)",
                subTitle: this.TotalAssetValue,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
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
            isEnabled: true,
            name: "Financial Summary",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
    }

    getBorrowerSeq() {
        return this.BorrowerSeq + 1000;
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
                subTitle: "false",
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
                    fieldList[3].subTitle = false;
                }
            });
        }

        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "Address Details",
            modalSectionName: "",
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
                txt += " ,";
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
            isEnabled: true,
            name: "Collateral Details",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
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
                subTitle: this.Common.getSingleFieldValue(this.GrossIncome),
                type: "iconStatus",
                modalSectionName: ""
            },
            {
                title: "Existing Liabilities",
                subTitle: this.Common.getSingleFieldValue(this.ExistingLiabilities),
                type: "iconStatus",
                modalSectionName: ""
            },
            {
                title: "Income Verification",
                subTitle: this.Common.getSingleFieldValue(this.IncomeVerification),
                type: "iconStatus",
                modalSectionName: ""
            },
            {
                title: "PAN Verification",
                subTitle: this.Common.getSingleFieldValue(this.PANVerification),
                type: "iconStatus",
                modalSectionName: ""
            }
        ];

        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "Financial Details",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
    }
}

export class FamilyDetails implements IDeserializable {
    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "Family Details",
            modalSectionName: "",
            data: ""
        };
        return returnObj;
    }
}

export class PersonalInterview implements IDeserializable {
    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "Personal Interview",
            modalSectionName: "",
            data: ""
        };
        return returnObj;
    }
}

export class RmVisitDetails implements IDeserializable {
    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "RM Visit Details",
            modalSectionName: "",
            data: ""
        };
        return returnObj;
    }
}

//APPLICATION SECTION CLASSES

export class LoanDetails implements IDeserializable {
    public DisbursementDate: string = "NA";
    public TotalInvestmentAmount: string = "NA";
    public RepaymentDate: string = "NA";
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
                title: "Total Investment Amount",
                subTitle: this.TotalInvestmentAmount,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Repayment Start Date",
                subTitle: this.RepaymentDate,
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
                modalSectionName: ""
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
            isEnabled: true,
            name: "Loan Details",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
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
            isEnabled: true,
            name: "Vehical Details",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
    }
}

export class CardDetails implements IDeserializable {
    public Branch: string = "NA";
    public Category: string = "NA";
    public MaxCardLimit: string = "NA";
    public ApprovedLimit: string = "NA";
    public common: Common;

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
                subTitle: this.Category,
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
            isEnabled: true,
            name: "Card Details",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
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
            isEnabled: true,
            name: "Financial Summary",
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
            isEnabled: true,
            name: "Education Details",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
    }
}

export class GoNoGoDetails implements IDeserializable {
    public PolicyDeviations: string = "NA";
    public MasterParameters: string = "NA";
    public common: Common;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Policy Deviations",
                subTitle: this.PolicyDeviations,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            },
            {
                title: "Master Parameters",
                subTitle: this.MasterParameters,
                type: "basic",
                modalSectionName: "FamilyDetailsForm"
            }
        ];
        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "Go/ No-Go Results",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
    }
}

export class ReferalDetails implements IDeserializable {
    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "Referal Details",
            modalSectionName: "",
            data: ""
        };
        return returnObj;
    }
}

export class Notes implements IDeserializable {
    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "Notes",
            modalSectionName: "",
            data: ""
        };
        return returnObj;
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
            isEnabled: true,
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

        //obj
        this.FinancialSummary = new FinancialSummary().deserialize(input.UWIncomeSummary);
        this.CollateralDetails = new CollateralDetails().deserialize(input.UWCollateralDetails);
        this.FinancialDetails = new FinancialDetails().deserialize(input.UWIncomeDetails);

        this.PersonalInterview = new PersonalInterview().deserialize(input.UWPersonalInterview);
        this.RmVisitDetails = new RmVisitDetails().deserialize(input.UWRmVisitDetails);
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
            isEnabled: true,
            name: "Customer 360 degrees",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
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
    // public DateOfReceipt: string = "NA";
    // public SourcingChannel: string = "NA";
    // public DSAID: string = "NA";
    // public Branch: string = "NA";

    deserialize(input: any): this {
        Object.assign(this, input);

        //obj
        this.LoanDetails = new LoanDetails().deserialize(input.UWIncomeSummary);
        this.InterfaceResults = new InterfaceResults().deserialize(input.UWInterface);
        this.VehicalDetails = new VehicalDetails().deserialize(input.UWIncomeSummary);
        this.CardDetails = new CardDetails().deserialize(input.UWIncomeSummary);
        this.GoldDetails = new GoldDetails().deserialize(input.UWIncomeSummary);
        this.EducationDetails = new EducationDetails().deserialize(input.UWIncomeSummary);
        this.GoNoGoDetails = new GoNoGoDetails().deserialize(input.UWIncomeSummary);

        this.ReferalDetails = new ReferalDetails().deserialize(input.UWIncomeSummary);
        this.Notes = new Notes().deserialize(input.UWIncomeSummary);
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
                subTitle: "NA",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Sourcing Channel",
                subTitle: "NA",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "DSA ID",
                subTitle: "NA",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Branch",
                subTitle: "NA",
                type: "basic",
                modalSectionName: ""
            },
        ];

        const returnObj: IGeneralCardData = {
            isEnabled: true,
            name: "Application Details",
            modalSectionName: "",
            data: fieldList
        };
        return returnObj;
    }
}

//creates list of Customer class with the below classes as objects
export class Master implements IDeserializable {
    public BorrowerSeq: number;
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
        return this;
    }
}