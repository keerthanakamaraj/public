import { Component, OnInit, Input } from '@angular/core';
import { IncomeSummaryFormComponent} from './IncomeSummaryForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-incomesummary-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class IncomeSummaryHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: IncomeSummaryFormComponent;
	formName: string = "IncomeSummary";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Income Summary .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
	}

 }

