import { Component, OnInit, Input } from '@angular/core';
import { FDDetailsComponent } from './FDDetails.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-FD-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class FDDetailsHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: FDDetailsComponent;
	formName: string = "FDDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("FD  .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
	}

 }

