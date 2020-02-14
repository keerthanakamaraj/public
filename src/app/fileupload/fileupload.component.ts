import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FieldComponent } from '../field/field.component';
import { ActivatedRoute } from '@angular/router';
import { ProvidehttpService } from '../providehttp.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent extends FieldComponent implements OnInit {
  @Output('uploaded') uploaded = new EventEmitter<string>();
  @ViewChild('fileInput', {static: false}) fileInput: any;
  uploader: FileUploader;
  showIcon = false;

  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() {
    let fileTypes = [];
    let mimeTypes = [];
    let fileTypesString = '';
    if (sessionStorage.getItem("AllowedFileTypes")) {
      //fileTypes = JSON.parse(sessionStorage.getItem("AllowedFileTypes"));
      let files = JSON.parse(sessionStorage.getItem("AllowedFileTypes"));
      fileTypes = files['TYPES'];
      mimeTypes = files['MIME_TYPES'];
      fileTypesString = JSON.stringify(fileTypes);
    }
    this.uploader = new FileUploader({ itemAlias: 'myfile', allowedMimeType: mimeTypes });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = true; this.clearError(); };
    this.uploader.onBeforeUploadItem = (item) => {
      this.services.http.showSpinner();
      this.uploader.setOptions({ url: this.services.http.baseURL + 'servlet/FileUploadProcessor?serviceCode=' + this.formCode, });
    };
    this.uploader.onWhenAddingFileFailed = (item) => {      
      this.setError('Allowed File Types are ' + fileTypesString.substring(1, fileTypesString.length - 1));
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.services.http.hideSpinner();
      var resp = JSON.parse(response);
      if (resp['CFS_INV_NUM']) {
        this.value = resp['CFS_INV_NUM'];
        this.uploaded.emit(this.value);
        this.fileUploaded = true;
        this.downloadURL = this.services.http.baseURL + 'servlet/FileDownloadProcessor?CFS_INV_NUM=' + this.value;
      } else {
        this.setError(resp['jquery-upload-file-error']);
      }
    };
  }

  //  fileName: any;
  fileUploaded = false;
  downloadURL: string;

  fileEvent(fileInput) {
    let file = fileInput.target.files[0];
    //  this.fileName = file.name;
    this.additionalInfo = file.name;
  }

  onDelete() {
    this.uploaded.emit(undefined);
    this.fileUploaded = false;
    //this.fileName = undefined;
    this.additionalInfo = undefined;
    this.uploader.cancelAll();
    this.fileInput.nativeElement.value = '';
  }

  setReadOnly(readOnly) {
    this.readOnly = readOnly;
    this.showIcon = readOnly;
    /*if(readOnly){
      this.fileUploaded = false;
    }else{
      this.fileUploaded = true;
    }*/
  }

  setValue(cfsNumber:number, fileName:string = undefined) {

    if (cfsNumber) {
      this.value = cfsNumber;
      //this.fileName = cfsNumber;
      this.showIcon = true;
      this.fileUploaded = true;
      this.downloadURL = this.services.http.baseURL + 'servlet/FileDownloadProcessor?CFS_INV_NUM=' + cfsNumber;
      if (fileName) {
        this.additionalInfo = fileName
      } else {
        this.services.http.getFileName(cfsNumber).subscribe(
          (data) => {
            //this.fileName = data['fileName'];
            this.additionalInfo = data['fileName'];
          }
        );
      }
    }else{
      this.value = undefined;
      this.showIcon = false;
      this.fileUploaded = false;
      this.downloadURL = '';
      this.additionalInfo = '';
    }

    this.passNewValue(this.value);
  }

  fieldReset() {
    this.uploaded.emit(undefined);
    this.fileUploaded = false;
    //this.fileName = undefined;
    this.uploader.cancelAll();
    this.fileInput.nativeElement.value = '';
  }

  showFile() {
    let fileExtension = this.additionalInfo.substring(this.additionalInfo.indexOf('.') + 1);
    fileExtension = fileExtension.toLowerCase();

    let isFormatKnown: boolean = false;

    let inputMap = new Map();
    inputMap.set('cfsNumber', this.value);

    switch (fileExtension) {
      case "png": case "jpg": case "jpeg": case "gif": case "apng": case "svg": case "bmp": case "ico":
        isFormatKnown = true;
        inputMap.set('component', 'VIEWIMG');
        break;
      case "pdf":
        isFormatKnown = true;
        inputMap.set('component', 'VIEWPDF');
        break;
    }

    if (isFormatKnown) {
      const modalRef = this.services.modal.open(PopupModalComponent, { size: 'lg' });
      modalRef.componentInstance.rotueToComponent(inputMap);
    } else {
      this.services.http.downloadFile(this.value, this.additionalInfo);

      // let el: HTMLElement = this.downloadAnchor.nativeElement as HTMLElement;
      // el.click();
      // this.services.httpServiceService.getFile(this.value)
      //   .subscribe(fileData => {
      //     let b: any = new Blob([fileData]);
      //     var url = window.URL.createObjectURL(b);
      //     window.open(url);
      //   }
      //   );
    }

  }

}
