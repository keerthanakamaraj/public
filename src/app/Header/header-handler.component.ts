import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent} from './Header.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'app-header-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class HeaderHandlerComponent implements OnInit {
	@Input() MainComponent: HeaderComponent;
	
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Header .. On form load");
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

