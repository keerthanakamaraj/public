import { ICardListData, IDeserializable, IGeneralCardData } from "../Interface/masterInterface";

export class CustomerDetails implements IDeserializable {
    public FullName: string = "NA";
    public ExistingCustomer: string = "NA";
    public DOB: string = "NA";
    public CustomerType: string = "NA";
    public CIF: string = "NA";
    public CustomerId: string = "NA";
    public CustomerSince: string = "NA";

    deserialize(input: any): this {
        console.error(input);
        input.FullName = input.FullName.length ? input.FullName : 'NA';
        input.DOB = input.DOB.length ? input.DOB : 'NA';
        return Object.assign(this, input);
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
                subTitle: 225,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "CID",
                subTitle: this.CustomerId.length ? this.CustomerId : "NA",
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

export class ExistingLoanDetails implements IDeserializable {
    public Product: any = "NA";
    public SubProduct: string = "NA";
    public Scheme: string = "NA";
    public Promotion: any = "NA";
    public LoanAccountNumber: any = "NA";
    public LoanDisbursementDate: any = "NA";
    public OutstandingLoanBalance: any = "NA";
    public EMIAmount: any = "NA";
    public NetInterestRate: any = "NA";
    public Tenure: any = "NA";
    public UDF2: any = "NA";

    deserialize(input: any): this {
        console.log(input);
        const moment = require('moment');
        if (input == undefined) {
            return Object.assign(this, input);
        }
        // input.Scheme = input.Scheme.length ? input.Scheme : 'NA';
        input.LoanAccountNumber = input.LoanAccountNumber.length ? input.LoanAccountNumber : 'NA';
        input.LoanDisbursementDate = input.LoanDisbursementDate.length ? moment(input.LoanDisbursementDate, 'DD-MM-YYYY').format("DD-MMM-YYYY") : 'NA';

        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Product",
                subTitle: this.Product,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Sub Product",
                subTitle: this.SubProduct,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Scheme",
                subTitle: this.Scheme,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Promotion",
                subTitle: this.Promotion,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Loan Account Number",
                subTitle: '0111005900779',
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Loan Disbursement Date",
                subTitle: this.LoanDisbursementDate,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Outstanding Loan Balance",
                subTitle: 1168.95,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "EMI Amount",
                subTitle: this.EMIAmount,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "Net Interest Rate",
                subTitle: this.NetInterestRate,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Tenure",
                subTitle: this.Tenure + ' Months',
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Disbursal Account",
                subTitle: this.UDF2,
                type: "basic",
                modalSectionName: ""
            },
        ];
        const returnObj: IGeneralCardData = {
            name: "Existing Loan Details",
            modalSectionName: "AmortizationListDetails",
            data: fieldList
        };
        return returnObj;
    }

}

export class TopUpLoanDetails implements IDeserializable {
    public TopupAmount: any = "NA";
    public RevisedAmount: string = "NA";
    public TopupNetInstRate: string = "NA";
    public LD_TENURE: any = "NA";
    public DisbursalDate: any = "NA";
    public RepaymentFreq: any = "NA";
    public RepaymentDate: any = "NA";
    public RequiredEMIAmt: any = "NA";
    public UDF1: any = "NA";
    public fieldList: ICardListData[];


    deserialize(input: any): this {
        const moment = require('moment');
        console.log(input);
        if (input == undefined) {
            return Object.assign(this, input);
        }
        input.DisbursalDate = input.DisbursalDate.length ? moment(input.DisbursalDate, 'DD-MM-YYYY').format("DD-MMM-YYYY") : 'NA';
        input.RepaymentDate = input.RepaymentDate.length ? moment(input.RepaymentDate, 'DD-MM-YYYY').format("DD-MMM-YYYY") : 'NA';
        return Object.assign(this, input);
    }

    getCardData() {
        const moment = require('moment');
        this.fieldList = [
            {
                title: "Top Up Disbursal",
                subTitle: this.getDisbursalAccount(this.UDF1),
                type: "basic",
                modalSectionName: "",
                // formatToCurrency: true
            },
            {
                title: "Top Up Amount",
                subTitle: this.TopupAmount,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "Revised Loan Amount",
                subTitle: this.RevisedAmount,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            },
            {
                title: "Net Interest Rate",
                subTitle: this.TopupNetInstRate,
                type: "basic",
                modalSectionName: "",
            },
            {
                title: "Tenure",
                subTitle: this.LD_TENURE.length ? this.LD_TENURE : "NA",
                type: "basic",
                modalSectionName: "",
            },
            {
                title: "Disbursal Date",
                subTitle: this.DisbursalDate,
                //subTitle: moment(new Date(this.DisbursalDate)).format("DD-MM-YYYY"),
                type: "basic",
                modalSectionName: "",
            },
            {
                title: "Repayment Frequency",
                subTitle: this.RepaymentFreq.text,
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "Repayment Date",
                subTitle: this.RepaymentDate,
                //subTitle: moment(new Date(this.RepaymentDate)).format("DD-MM-YYYY"),
                type: "basic",
                modalSectionName: ""
            },
            {
                title: "EMI Amount",
                subTitle: this.RequiredEMIAmt,
                type: "basic",
                modalSectionName: "",
                formatToCurrency: true
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "Top Up Loan Details",
            modalSectionName: "AmortizationListDetails",
            data: this.fieldList
        };
        return returnObj;
    }
    getDisbursalAccount(type: string) {
        switch (type) {
            case "LoanRollover":
                return "Exisiting Loan Rollover"
                break;

            case "NewLoan":
                return "New Loan"
                break;

            case "G":
                return "Guarantor"
                break;

            default:
                return "NA"
                break;
        }
    }
}

export class BreDetails implements IDeserializable {
    public BreDetails: any = [];

    deserialize(input: any): this {
        this.BreDetails = input;
        return Object.assign(this, input);
    }

    getCardData() {
        let fieldList: ICardListData[] = [
            {
                title: "Policy Check Parameters",
                subTitle: this.getStatusAndCount(),
                type: "statusCount",
                modalSectionName: ""
            }
        ];
        const returnObj: IGeneralCardData = {
            name: "BRE Details",
            modalSectionName: this.BreDetails.length ? "BreDetails" : "",
            //modalSectionName: "",
            data: fieldList
        };
        return returnObj;
    }

    getStatusAndCount() {
        let data = {
            success: 0,
            failure: 0
        }

        if (this.BreDetails.length) {
            this.BreDetails.forEach(element => {
                if (element.RuleResult == "Fail") {
                    data.failure += 1;
                }
                else {
                    data.success += 1;
                }
            });
        }

        return data;
    }
}

//creates list of Customer class with the below classes as objects
export class Master implements IDeserializable {
    public borrowerSeq: number;
    public productCategory: string;

    public CustomerDetails: CustomerDetails;
    public ExistingLoanDetails: ExistingLoanDetails;
    public TopUpLoanDetails: TopUpLoanDetails;
    public BreDetails: BreDetails;

    deserialize(input: any): this {
        this.CustomerDetails = input["UWCustomerDetails"].map(jsonData => new CustomerDetails().deserialize(jsonData));

        ///////
        //this.CustomerDetails = new CustomerDetails().deserialize(input.UWCustomerDetails);
        this.ExistingLoanDetails = new ExistingLoanDetails().deserialize(input.UWLoan);
        this.ExistingLoanDetails.UDF2 = input.LoanTopupDetails.UDF2;
        this.TopUpLoanDetails = new TopUpLoanDetails().deserialize(input.LoanTopupDetails);
        this.BreDetails = new BreDetails().deserialize(input.PolicyCheck);

        return this;
    }
}
