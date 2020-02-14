import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Data } from '../DataService';
import { ProvidehttpService } from '../providehttp.service';
import { RoutingService } from '../routing-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TextBoxComponent } from '../text-box/text-box.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-draft-form',
  templateUrl: './draft-form.component.html',
  styleUrls: ['./draft-form.component.css']
})
export class DraftFormComponent implements OnInit {
  @ViewChild('Remarks', {static: false}) Remarks: TextBoxComponent;

  public remark;
  public errors;
  public mainFrom = false;
  public SuccessFrom = true;
  public FailFrom = true;
  constructor(public dataService: ProvidehttpService, public dataStore: Data, public routing: RoutingService, public activeModal: NgbActiveModal) { }

  Approve_click() {
    this.Remarks_onblur(this.remark);
    if (this.errors == 0) {
      this.dataService.showSpinner();
      let map = this.dataStore.getData(this.routing.currModal);
      let elemThis = this;
      this.dataService.saveAsDraft(map.get('formCode'), 'SSGW', 'DRAFT', map.get('formData'), map.get('RefNo'), this.remark).subscribe(data => {
        //elemThis.dataService.checkForSession(data);
        if (data["result"] == "1") {
          this.mainFrom = true;
          this.SuccessFrom = false;
          this.dataStore.draftNo = data["OUT_REF_NO"];
          this.dataStore.draftRemarks = this.remark;
          this.dataService.hideSpinner();
          // var modalButton = document.getElementById("closeButton");
          // modalButton.click();
        } else {
          this.mainFrom = true;
          this.FailFrom = false;
          this.dataStore.draftNo = map.get('RefNo');
          this.dataStore.draftRemarks = map.get('remarks');
          this.dataService.hideSpinner();
        }
      });
    }

  }

  Remarks_onblur(event) {
    this.errors = 0;
    this.Remarks.clearError();
    this.remark = event;
    if (!this.remark) {
      this.Remarks.setError("Value cannot be empty");
      this.errors++;
      return;
    }
    let data = this.dataStore.getData(this.routing.currModal);
    data.set('remarks', this.remark);
  }
  ngOnInit() {
    if (this.dataStore.getData(this.routing.currModal)) {
      let data = this.dataStore.getData(this.routing.currModal);
      if (data.get('remarks')) {
        this.Remarks.setValue(data.get('remarks'));
        this.remark = data.get('remarks');
      }
    }
  }

}
