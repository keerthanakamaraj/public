import { Component, OnInit, Input } from '@angular/core';
import { ApplicationDtlsComponent } from './ApplicationDtls.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-application-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class ApplicationHandlerComponent extends RLOUIHandlerComponent implements OnInit {
  @Input() MainComponent: ApplicationDtlsComponent;
  formName : string = 'ApplicationDetails';
  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Application on Form Load");
    super.onFormLoad({});
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}



 }

