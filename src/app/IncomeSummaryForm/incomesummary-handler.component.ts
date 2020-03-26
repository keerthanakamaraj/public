import { Component, OnInit, Input } from '@angular/core';
import { IncomeSummaryFormComponent} from './IncomeSummaryForm.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-incomesummary-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class IncomeSummaryHandlerComponent implements OnInit {
	@Input() MainComponent: IncomeSummaryFormComponent;
	
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Income Summary .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

