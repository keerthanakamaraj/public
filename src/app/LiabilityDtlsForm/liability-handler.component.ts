import { Component, OnInit, Input } from '@angular/core';
import { LiabilityDtlsFormComponent} from './LiabilityDtlsForm.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-liability-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class LiabilityHandlerComponent implements OnInit {
	@Input() MainComponent: LiabilityDtlsFormComponent;
	
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Liability .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

