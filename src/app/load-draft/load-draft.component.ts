import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-load-draft',
  templateUrl: './load-draft.component.html',
  styleUrls: ['./load-draft.component.css']
})
export class LoadDraftComponent implements OnInit {
  @Input('formCode') formCode: string;

  @Output('loadDraft') loadDraft = new EventEmitter<string>();

  public openDraft = false;
  public message = '---No Data Found ---';
  public messageShow = true;
  public myStyle = { 'text-align': 'center', 'color': 'crimson' }; //    
  constructor(private services: ServiceStock) { }
  draftData = [];
  public deleteDraft: string[] = [];
  ngOnInit() {
  }

  LoadDraft(RefNo, remarks) {
    this.loadDraft.emit(RefNo + '|' + remarks);
  }

  delectDraft(event, RefNo) {
    // event.stopPropagation();
    // let elemThis = this;
    // this.services.http.deleteDarft(this.formCode, 'SSGW', 'DRAFT', RefNo).subscribe(data => {
    //   elemThis.services.http.checkForSession(data);
    // });
    // for (let i = 0; i < this.draftData.length; i++) {
    //   if (this.draftData[i]["RefNo"] == RefNo) {
    //     this.draftData.splice(i, 1);
    //     break;
    //   }
    // }
  }


  getDrafts() {
    // let elemThis = this;
    // this.messageShow = true;
    // this.myStyle = { 'text-align': 'center', 'color': '#0ea50e' };
    // this.message = 'Loading...';
    // this.draftData = [];
    // this.services.http.loadAllDarfts(this.formCode, 'SSGW', 'DRAFT').subscribe(data => {
    //   elemThis.services.http.checkForSession(data);
    //   let map: Map<string, string> = JSON.parse(JSON.stringify(data));

    //   if (map['draftData']) {
    //     this.draftData = map['draftData'];
    //   }

    //   if (this.draftData.length < 1) {
    //     this.myStyle = { 'text-align': 'center', 'color': 'crimson' }
    //     this.message = '---No saved drafts to show---';
    //   } else {
    //     this.messageShow = false;
    //   }

    // });
  }
  closeDraft(event, RefNo) {
    event.stopPropagation();
    this.deleteDraft.push(RefNo);
  }

  openClass(event) {
    event.stopPropagation();
    if (this.openDraft == false) {
      this.openDraft = true;
      this.getDrafts();
    }
    else {
      this.openDraft = false;
    }
  }
  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.openDraft = false;
  }
}
