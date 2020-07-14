
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
    public TotalLiabiity: any = 0;
    public TotalObligation: any = 0;
    public DBR: any = 0;

    public common: Common;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Total Income (Annual)",
                subTitle: this.TotalIncome,
                type: "icon",
                modalSectionName: "OccupationDetails"
            },
            {
                title: "Total Liability (Annual)",
                subTitle: this.TotalLiabiity,
                type: "icon",
                modalSectionName: "LiabilityDetails"
            },
            {
                title: "Total Asset Value (Annual)",
                subTitle: this.TotalIncome,
                type: "icon",
                modalSectionName: "AssetDetails"
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

export class FamilyDetails implements IDeserializable {
    public DOB: string;
    public FullName: string;
    public Relationship: string;
    public BorrowerSeq: number;
    public CustomerRelated: number;
    public FamilyDataList: any

    public common: Common;

    getFullName() {
        return this.FullName + "**********************";
    }

    deserialize(input: any): this {
        this.FamilyDataList = input;
        return this;
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
                subTitle: "",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Mailing Address",
                subTitle: "",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Occupancy Type",
                subTitle: "",
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Verification",
                subTitle: "completed",
                type: "iconStatus",
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
            modalSectionName: "AddressDetails",
            data: fieldList
        };
        return returnObj;
    }

    getFullAddress(element) {
        let address = this.Common.getFieldValueFromObj(element, "Address1", true) + this.Common.getFieldValueFromObj(element, "City", true) + this.Common.getFieldValueFromObj(element, "State", true) + this.Common.getFieldValueFromObj(element, "Pincode", true);
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

export class CustomerDetails implements IDeserializable {
    public BorrowerSeq: number;
    public FamilyDetails: FamilyDetails;
    public FinancialSummary: FinancialSummary;
    public CollateralDetails: CollateralDetails;
    public AddressDetails: AddressDetails;
    public FinancialDetails: FinancialDetails;

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
        return this;
    }
}

//creates list of Customer class with the below classes as objects
export class Master implements IDeserializable {
    public BorrowerSeq: number;
    public CustomerDetails: CustomerDetails;
    public FamilyDetails: FamilyDetails;
    public FinancialSummary: FinancialSummary;
    public CollateralDetails: CollateralDetails;
    public AddressDetails: AddressDetails;
    public FinancialDetails: FinancialDetails;

    deserialize(input: any): this {
        this.CustomerDetails = input.map(jsonData => new CustomerDetails().deserialize(jsonData));
        return this;
    }
}