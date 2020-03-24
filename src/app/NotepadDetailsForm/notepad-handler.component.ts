import { Component, OnInit, Input } from '@angular/core';
import { NotepadDetailsFormComponent} from './NotepadDetailsForm.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-notepad-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class NotepadHandlerComponent implements OnInit {
	@Input() MainComponent: NotepadDetailsFormComponent;
	
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Notepad .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

