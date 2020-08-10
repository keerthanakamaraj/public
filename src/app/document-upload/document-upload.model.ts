import { FileDetails } from './file-details.model';
import { DocumentDetails } from './document-details.model';

export class DocumentUpload {
    AppRefNumber: string;
    Id: string;
    InputterId: string;
    ProposalId: string;

    DocUploadDetails = new Array<FileDetails>();
    DocDetail = new Array<DocumentDetails>();
}
