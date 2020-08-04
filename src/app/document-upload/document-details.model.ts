
export class DocumentDetails {
    id: string;
    DocUploadId: string;
    CfsInvNum: string;
    DocName: string;
    DocType: string;
    entityDocumentId: string;
    
    public clear() {
        this.id = '';
        this.DocUploadId = '';
        this.DocName = '';
        this.CfsInvNum = '';
        this.DocType = '';
        this.entityDocumentId = '';

    }   
}
