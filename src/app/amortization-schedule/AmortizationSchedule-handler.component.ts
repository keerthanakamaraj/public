import { Component, OnInit, Input } from '@angular/core';
import { AmortizationScheduleComponent } from './AmortizationSchedule.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-amortization-schedule-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class AmortizationScheduleHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: AmortizationScheduleComponent;
	formName: string = "AmortizationSchedule";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("amortization  .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
	}

 }

