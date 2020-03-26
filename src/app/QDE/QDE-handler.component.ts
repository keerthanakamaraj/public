import { Component, OnInit, Input } from '@angular/core';
import { QDEComponent } from './QDE.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { RlouiService } from '../rlo-services/rloui.service';

@Component({
  selector: 'app-qde-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class QDEHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: QDEComponent;

  constructor(rloui: RlouiService) {
    super(rloui);
  }

  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("QDE .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}


}



