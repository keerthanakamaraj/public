import { Component, OnInit, Input } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';
import { BusinessDtlsFormComponent } from '../BusinessDtlsForm/BusinessDtlsForm.component';

@Component({
  selector: 'app-business-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class BusinessHandlerComponent extends RLOUIHandlerComponent implements OnInit {

  @Input() MainComponent: BusinessDtlsFormComponent;
  formName: string = "BusinessDtls";

  ngOnInit() {
   
  }
  
  

	onFormLoad(arg0: {}) {
    console.log("Business Details Load ");
    super.onFormLoad({});
  }

 
  }

