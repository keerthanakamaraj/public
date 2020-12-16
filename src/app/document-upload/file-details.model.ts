export class FileDetails {
    id: string;
    trnDemographicId: string;
    DocId: string;
    relationshipToBorrower: string;
    NameofRelParty: string;
    deferredUntil: string;
    remarks: string;
    Document: string;
    status: string;
    enforcementStageId: string;
    mandatory: string;
    collectionDate: string;
    Udf1: string;
    Udf2: string;
    Udf3: string;
    Udf4: string;
    Udf5: string;
    Udf6: string;
    Udf7: string;
    Udf8: string;
    Udf9: string;
    Udf10: string;

    public clear() {
        this.id = '';
        this.DocId = '';
        this.mandatory = '';
        this.trnDemographicId = '';
        this.enforcementStageId = '';
        this.collectionDate = '';
        this.deferredUntil = '';
        this.remarks = '';
        this.Document = '';
        this.NameofRelParty = '';
        this.relationshipToBorrower = '';
        this.status = '';
        this.Udf1 = '';
        this.Udf2 = '';
        this.Udf3 = '';
        this.Udf4 = '';
        this.Udf5 = '';
        this.Udf6 = '';
        this.Udf7 = '';
        this.Udf8 = '';
        this.Udf9 = '';
        this.Udf10 = '';
    }
}