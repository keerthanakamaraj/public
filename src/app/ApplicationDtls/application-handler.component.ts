import { Component, OnInit, Input } from '@angular/core';
import { ApplicationDtlsComponent } from './ApplicationDtls.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-application-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class ApplicationHandlerComponent implements OnInit {
	@Input() MainComponent: ApplicationDtlsComponent;
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Application on Form Load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}



 }

