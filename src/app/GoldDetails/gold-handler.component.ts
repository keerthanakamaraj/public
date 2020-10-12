import { Component, OnInit, Input } from '@angular/core';
import { GoldDetailsComponent} from './GoldDetails.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-gold-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class GoldDetailsHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: GoldDetailsComponent;
  formName: string = "GoldDetails";
  
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Gold .. On form load");
    super.onFormLoad({});
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }
 

 }
 

