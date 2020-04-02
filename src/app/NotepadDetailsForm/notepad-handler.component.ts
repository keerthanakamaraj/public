import { Component, OnInit, Input } from '@angular/core';
import { NotepadDetailsFormComponent} from './NotepadDetailsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-notepad-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class NotepadHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: NotepadDetailsFormComponent;
	formName: string = "NotepadDetails";
	  ngOnInit() {
    // ngOnInit
  }

  
  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Notepad .. On form load");
    super.onFormLoad({});
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

