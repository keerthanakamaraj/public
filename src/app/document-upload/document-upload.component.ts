import { PlatformLocation } from '@angular/common';
import { Component, ElementRef, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormCommonComponent } from '../form-common/form-common.component';
import { UtilityService } from '../services/utility.service';
// import { UserAccessEntitlement } from '../services/user-access-entitlement.service';
import { DocumentDetails } from './document-details.model';
import { DocumentUpload } from './document-upload.model';
import { FileDetails } from './file-details.model';
import { ServiceStock } from '../service-stock.service';
declare var jQuery: any;


@Component({
    selector: 'app-document-upload',
    templateUrl: './document-upload.component.html',
    styleUrls: ['./document-upload.component.scss']
})

export class DocumentUploadComponent extends FormCommonComponent implements OnInit {
    lookupVariables = ['IMG_DOCUMENT_TYPE', 'RELATION_BORROWER', 'STATUS'];
    @ViewChild('myModal', { static: false }) myModal: ElementRef;
    @ViewChild('uploadModal', { static: false }) uploadModal: ElementRef;
    ownersName = [];
    customer = [];
    documents = [];
    docTypes = [];
    documentTypeGrid = [];
    borrDoc = [];
    count: any;
    modalMessage: any;
    fileUploadErrorFlag: boolean;
    fileUploadErrorMsg: string;
    fileName: any;
    taskName: any;
    UserId: any;
    checkUserId: any;
    mom: any;
    proposalId: any;
    public uploader: FileUploader;
    documentUploadObject: DocumentUpload = new DocumentUpload();
    docUploadObject: FileDetails = new FileDetails();
    docDetailsObject: DocumentDetails = new DocumentDetails();
    @Output() uploaded = new EventEmitter<Map<string, string>>();
    cfsNum: any;
    checkStatus: boolean;
    public showMessage(msg) {
        this.modalMessage = msg;
        jQuery(this.myModal.nativeElement).modal('show');
    }
    // This method is to initialize the variables coming from parent component
    initializeValues(paramMap) {
        this.UserId = paramMap.get('userId');
        this.checkUserId = this.UserId;

        console.log(this.lookupVariableOptions);
    }

    constructor(private location: PlatformLocation, public utility: UtilityService, services: ServiceStock) {
    // constructor(private location: PlatformLocation, services: ServiceStock) {
        // super(utility);
        super(utility, services);

        // Create FileUploader in common service
        this.uploader = this.utility.getCommonService().getUploader((item: any, response: any, status: any, headers: any) => {
            const resp = JSON.parse(response);
            this.cfsNum = resp['id'];
            const map = new Map();
            map.set('CFS_Num', this.cfsNum);
            this.uploaded.emit(map);
            this.docDetailsObject.CfsInvNum = resp['id'].toString();

            if (this.docDetailsObject.CfsInvNum) {
                this.saveImageDetails();
            } else {
                this.fileUploadErrorFlag = true;
                this.fileUploadErrorMsg = this.getLabel('UNABLE_TO_UPLOAD_FILE');
            }
        });
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    }

    ngOnInit() {
        this.getFormMetadata('saveDocumentUploadDetails');
        this.location.onPopState(() => {
        });
        this.fileUploadErrorFlag = false;
        this.count = 0;
        this.fileUploadErrorMsg = '';
        this.documentUploadObject.InputterId = sessionStorage.getItem('USERID');

        // @CLO-RLO-Merge - Inputter Id 
        // if (!this.documentUploadObject.InputterId) {
        //     this.documentUploadObject.InputterId = this.utility.getAppService().userId;
        // }

        // @CLO-RLO-Merge - Query Params
        // this.utility.getActivatedRoute().queryParams.subscribe(
        //     params => {
        //         this.documentUploadObject.AppRefNumber = params['appRefNum'];
        //         this.documentUploadObject.ProposalId = params['ProposalId'];
        //         this.taskName = params['taskName'];
        //     }
        // );

        // @CLO-RLO-Merge - Borrower/ Co-Borrower ?
        // Add RLO Code for Borrower Co-Borrower
        // this.utility.getCommonService().getOwnerNamesDetails(this.documentUploadObject.ProposalId).subscribe(
        //     data => {
        //         this.ownersName = data['OwnerNames'];
        //     });

        // @CLO-RLO-Merge Access Entitlement
        // this.userAccessEntitle = UserAccessEntitlement.getInstance(this.taskName);

        // this.tooltipError.tooltipdestroy();
        this.reLodeGrid();
    }
    // This method is to get the document types
    getDocumentTypes(demographicId) {
        this.docDetailsObject.DocType='';
        this.docDetailsObject.entityDocumentId='';
        if (this.ownersName) {
            this.customer = this.ownersName.filter(customerData => {
                if (customerData.ID === demographicId) {
                    return customerData.customerType;
                }
            });

            // @CLO-RLO-Merge - Get Document Type Service
            // this.utility.getCommonService().getDocumentTypesDetail(this.customer[0]['customerType']).subscribe(
            //     data => {
            //         this.docTypes = data['docTypes'];
            //         this.mom = data['MOM'];
            //         if (this.taskName === 'CommitteApproval' && this.mom) {
            //             this.docTypes.push(data['MOM']);
            //         }
            //     });
        }
    }
    // This methos is to get the documents
    getDocuments() {
        this.docDetailsObject.entityDocumentId='';
        const formData = new Map<string, string>();
        formData.set('proposalId', this.documentUploadObject.ProposalId);
        formData.set('docType', this.docDetailsObject.DocType);

        // @CLO-RLO-Merge - Service to Get Document List
        // this.utility.getCommonService().getDocumentsDetail(formData).subscribe(
        //     data => {
        //         if (this.docDetailsObject.DocType === 'MOM') {
        //             this.documents = [];

        //             this.documents.push(data['MOMDoc']);
        //         } else {
        //             this.documents = [];

        //             this.documents = data['Documents'];
        //         }
        //     });
    }

    // This methos is to revalidate all fields before submit
    revalidation() {
        this.flag = 0;
        this.validateField(this.docDetailsObject.entityDocumentId, 'entityDocumentId');
        this.validateField(this.docUploadObject.trnDemographicId, 'trnDemographicId');
        this.validateField(this.docDetailsObject.DocType, 'DocType');
        this.validateField(this.docDetailsObject.DocName, 'DocName');
        this.validateField(this.docUploadObject.status, 'status');
    }
    // This methos is to submit the documents
    async onSubmit() {
        this.fileUploadErrorFlag = false;
        this.fileUploadErrorMsg = '';
        this.revalidation();
        if (this.flag === 1) {
            return;
        } else {
            this.processUplaodImage();
        }
    }
    addNewComment() {
        this.checkStatus = false;
        this.clearform();
    }
    // This method is to upload file
    processUplaodImage() {
        this.uploader.uploadAll();
    }
    // This method is to save document details in table
    saveImageDetails() {
        this.documentUploadObject.DocDetail = [];
        this.documentUploadObject.DocUploadDetails = [];
        this.documentUploadObject.DocDetail.push(this.docDetailsObject);
        this.documentUploadObject.DocUploadDetails.push(this.docUploadObject);

        // @CLO-RLO-Merge - Update Application with document reference
        // this.utility.getCommonService().saveDocumentUploadDetails(this.documentUploadObject).subscribe(
        //     data => {
        //         if (data['status'] === 'F' || data['Status_Cd'] === 'F') {
        //             this.fileUploadErrorFlag = true;
        //             this.fileUploadErrorMsg = this.getLabel('UNABLE_TO_SAVE_FILE');
        //         } else {
        //             this.clearform();
        //             this.tooltipError.tooltipdestroy();
        //             this.utility.getAppService().success(this.getLabel('FILE_UPLOADED_SUCCESSFULLY'));
        //             this.reLodeGrid();


        //         }
        //     });
    }
    // This method is to validate file before uploading
    validateFile(fileInput): void {
        this.docDetailsObject.DocName = '';
        this.fileName = '';
        if (this.uploader.queue.length > 1) {
            this.uploader.queue.splice(0, 1);
        }
        let actualFileName = '';
        const validLength = true;
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'tiff', 'bmp', 'gif', 'pdf', 'xls', 'xlsx', 'doc', 'docx', 'msg',
            'JPG', 'JPEG', 'PNG', 'TIFF', 'BMP', 'GIF', 'PDF', 'XLS', 'XLSX', 'DOC', 'DOCX', 'MSG'];

        const file = fileInput.target.files[0];
        const sizeInKB = Math.round(file.size / 1024);
        if (Number(sizeInKB) > 5120) {

            this.uploader.queue[0].remove();
            // @CLO-RLO-Merge - 
            // this.tooltipError.tooltiperrorshow('DocName', this.getLabel('FILE_SIZE_EXCEEDS_5MB'));
            return;
        } else if (Number(file.name.length) > 100) {
            this.uploader.queue[0].remove();
            // @CLO-RLO-Merge - 
            // this.tooltipError.tooltiperrorshow('DocName', this.getLabel('FILE_NAME_EXCEEDS_100_CHARS'));
            return;
        }

        if (validLength) {
            const fileExtensions = file.name.split('.').pop().toLowerCase();
            let isValidfile = true;
            for (let i = 0; i < allowedExtensions.length; i++) {
                if (allowedExtensions[i] === fileExtensions) {
                    actualFileName = file.name;
                    isValidfile = true;
                    break;
                } else {
                    isValidfile = false;

                }
            }
            if (!isValidfile) {
              // @CLO-RLO-Merge - 
                // this.tooltipError.tooltiperrorshow('DocName', this.getLabel('INVALID_FILE_FORMAT'));
                return;
            } else {
              // @CLO-RLO-Merge - 
                // this.tooltipError.tooltiperrorhide('DocName');
            }
        }
        fileInput.srcElement.value = '';
        this.docDetailsObject.DocName = actualFileName;
        this.fileName = actualFileName;
    }
    // This methos is to clear variables
    clearform() {
        // @CLO-RLO-Merge - 
        // this.tooltipError.tooltipdestroy();
        // this.tooltipError.tooltiperrorhide('DocName');
        this.checkUserId = this.UserId;
        this.documents = [];
        this.docTypes = [];
        this.docDetailsObject.clear();
        this.docUploadObject.clear();
        this.fileName = '';
        this.cfsNum = '';

        // @CLO-RLO-Merge - 
        // if (this.uploader.queue.length >= 1) {
        //     this.uploader.queue[0].remove();
        // }
    }
    // This method is to delete document  by Id
    deleteImage(id) {
        const deleteById = {
            'id': id
        };
        // @CLO-RLO-Merge - Delete File Service Call
        // this.utility.getCommonService().deleteDocUploadDetails(deleteById).subscribe(
        //     data => {
        //         if (data['status'] === 'F') {
        //             this.utility.getAppService().error(this.getLabel('UNABLE_TO_DELETE_FILE'));
        //         } else {
        //             this.clearform();
        //             this.tooltipError.tooltipdestroy();
        //             this.utility.getAppService().success(this.getLabel('FILE_DELETED_SUCCESSFULLY'));
        //             this.reLodeGrid();
        //         }
        //     });
    }
    // This methos is to populate the date in the fields on click of edit button in grid
    editDocumentDetails(docDetail) {
        this.docUploadObject.id = docDetail['id'];
        this.docUploadObject.trnDemographicId = docDetail['demographicId'];
        this.checkUserId = docDetail['InputterId'];
        this.getDocumentTypes(this.docUploadObject.trnDemographicId);
        this.docDetailsObject.DocType = docDetail['docType'];
        this.getDocuments();
        this.docDetailsObject.entityDocumentId = docDetail['entityDocumentId'];
        this.docUploadObject.relationshipToBorrower = docDetail['relationId'];
        this.docUploadObject.status = docDetail['status'];
        this.docUploadObject.deferredUntil = docDetail['deferredUntil'];
        this.docUploadObject.collectionDate = docDetail['collectionDate'];
        this.docUploadObject.remarks = docDetail['remarks'];
        if (this.UserId !== this.checkUserId) {
            this.checkStatus = true;
        }
    }
    // This method is to refresh document grid
    reLodeGrid() {
        this.clearform();
        // @CLO-RLO-Merge - 
        // this.tooltipError.tooltipdestroy();
        // @CLO-RLO-Merge - Reload Grid After Change
        this.utility.getCommonService().getDocumentUploadDtls(this.documentUploadObject.ProposalId).subscribe(
            data => {
                if (data['status'] === 'F' || data['Status_Cd'] === 'F') {
                    // this.utility.getAppService().error(this.getLabel('ERROR_DOCUMENT_UPLOAD'));
                } else {
                    if (data['DocList']) {
                        this.documentTypeGrid = data['DocList'];
                        this.count = this.documentTypeGrid.length;
                    } else {
                        this.documentTypeGrid = data['DocList'];
                        this.count = 0;
                    }
                }
            });

    }
    // This method is to download file
    downloadFile(inventoryNumber) {
      // @CLO-RLO-Merge - Download Document
        // this.utility.getCommonService().download(inventoryNumber);
    }
    // This method is called when we click on delete icon
    confirmDelete(id) {
      // @CLO-RLO-Merge - 
        // Alert Service - Confirmation
        // this.utility.getAppService().delete(this.getLabel('WARNING_DELETE'),
        //     () => this.onDeleteConfirm(id));
    }
    // This methos is to clear fields which depends on status
    clearDependentfields() {
        this.docUploadObject.deferredUntil = '';
        this.docUploadObject.remarks = '';
        this.docUploadObject.collectionDate = '';
    }
    // This method is called when we click yes in delete popup
    onDeleteConfirm(id) {
        this.deleteImage(id);
    }
}
