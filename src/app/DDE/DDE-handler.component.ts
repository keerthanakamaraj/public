import { Component, OnInit, Input } from '@angular/core';
import { DDEComponent } from './DDE.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-dde-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class DDEHandlerComponent implements OnInit {
	@Input() MainComponent: DDEComponent;
  
  constructor() { }

  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("DDE .. On form load");
    // this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}
 

}

