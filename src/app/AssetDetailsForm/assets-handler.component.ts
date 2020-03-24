import { Component, OnInit, Input } from '@angular/core';
import { AssetDetailsFormComponent } from './AssetDetailsForm.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-assets-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class AssetsHandlerComponent implements OnInit {
  @Input() MainComponent: AssetDetailsFormComponent;
  
  ngOnInit() {
   
  }
	
	onFormLoad(arg0: {}) {
    console.log("Assets Details Load ");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}
  }

