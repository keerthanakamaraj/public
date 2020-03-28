import { Component, OnInit, Input } from '@angular/core';
import { ChargeDtlsFormComponent} from './ChargeDtlsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-charge-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class ChargeHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: ChargeDtlsFormComponent;
	formName : string = 'ChargeDetails';
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("ChargeDetails .. On form load");
    super.onFormLoad({})
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

