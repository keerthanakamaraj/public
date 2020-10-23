import { Component, OnInit, Input } from '@angular/core';
import { VehicleDetailsComponent} from './VehicleDetails.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-vehicle-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class VehicleDetailsHandlerComponent implements OnInit {
	@Input() MainComponent: VehicleDetailsComponent;

  formName: string = "VehicleDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("vehicle .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }
 

