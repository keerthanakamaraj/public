import { Component, OnInit, Input } from '@angular/core';
import { OccupationDtlsFormComponent} from './OccupationDtlsForm.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-occupation-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class OccupationHandlerComponent implements OnInit {
	@Input() MainComponent: OccupationDtlsFormComponent;
	
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Occupation .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

