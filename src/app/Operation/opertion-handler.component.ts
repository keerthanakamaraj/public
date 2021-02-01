import { Component, OnInit, Input } from '@angular/core';
import { OperationComponent } from './Operation.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from '../rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-operation-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class OperationFormHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: OperationComponent;
	formName: string = "Operation";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Operation  .. On form load");
    super.onFormLoad({});
	}

 }

