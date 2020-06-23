import { Component, OnInit, Input } from '@angular/core';
import { VisitReportFormComponent } from './VisitReportForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-visitreport-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class VisitReportHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: VisitReportFormComponent;
  formName: string = "VisitReport";
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("VisitReport.. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
  }
}


