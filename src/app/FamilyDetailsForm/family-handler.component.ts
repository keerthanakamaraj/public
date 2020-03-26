import { Component, OnInit, Input } from '@angular/core';
import { FamilyDetailsFormComponent} from './FamilyDetailsForm.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-family-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class FamilyHandlerComponent implements OnInit {
	@Input() MainComponent: FamilyDetailsFormComponent;
	
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("family .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

