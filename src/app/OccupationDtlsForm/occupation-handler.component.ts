import { Component, OnInit, Input } from '@angular/core';
import { OccupationDtlsFormComponent} from './OccupationDtlsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-occupation-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class OccupationHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: OccupationDtlsFormComponent;
	formName: string = "OccupationDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Occupation .. On form load");
    super.onFormLoad({});
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

