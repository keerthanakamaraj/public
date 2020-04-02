import { Component, OnInit, Input } from '@angular/core';
import { AssetDetailsFormComponent } from './AssetDetailsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-assets-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class AssetsHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: AssetDetailsFormComponent;
  formName: string = "AssetDetails";

  ngOnInit() {
   
  }
	
	onFormLoad(arg0: {}) {
    console.log("Assets Details Load ");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
    super.onFormLoad({});
	}
  }

