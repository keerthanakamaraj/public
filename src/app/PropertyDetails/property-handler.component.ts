import { Component, OnInit, Input } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { PropertyDetailsComponent } from '../PropertyDetails/PropertyDetails.component';

@Component({
  selector: 'app-property-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class PropertyHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: PropertyDetailsComponent;
  formName: string = "PropertyDetails";

  ngOnInit() {
   
  }
	
	onFormLoad(arg0: {}) {
    console.log("Property Details Load ");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
  }
  }

