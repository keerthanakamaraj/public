import { IDeserializable } from "../Interface/masterInterface";

export class FinancialSummary implements IDeserializable {
    public NetIncomeMonthly: number;
    public IncomeSummarySeq: number;
    public BorrowerSeq: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    getBorrowerSeq() {
        return this.BorrowerSeq;
    }
}

export class FamilyDetails implements IDeserializable {
    public DOB: string;
    public FullName: string;
    public Relationship: string;
    public BorrowerSeq: number;
    public CustomerRelated: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}

export class AddressDetails implements IDeserializable {
    public State: string;
    public City: string;
    public Pincode: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}

export class CollateralDetails implements IDeserializable {
    public name: number;
    public IncomeSummarySeq: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}

export class Customer implements IDeserializable {
    public BorrowerSeq: number;
    public FamilyDetails: FamilyDetails;
    public FinancialSummary: FinancialSummary;
    public CollateralDetails: CollateralDetails;
    public AddressDetails: AddressDetails;

    deserialize(input: any): this {
        Object.assign(this, input);
        console.error(input);
        //arrayList UWAddress
        if (input.hasOwnProperty("UWFamily")){
            this.FamilyDetails = input.UWFamily.map(familyDetails => new FamilyDetails().deserialize(familyDetails));
        }

        if (input.hasOwnProperty("UWAddress")) {
            this.AddressDetails = input.UWAddress.map(addresses => new AddressDetails().deserialize(addresses));
        }

        //obj
        this.FinancialSummary = new FinancialSummary().deserialize(input.UWIncomeSummary);
        this.CollateralDetails = new CollateralDetails().deserialize(input.UWCollateralDetails);

        return this;
    }
}