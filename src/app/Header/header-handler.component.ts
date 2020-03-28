import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent} from './Header.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-header-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class HeaderHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: HeaderComponent;
	formName: string = "Header";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Header .. On form load");
    super.onFormLoad({});
        //this.MainComponent.CD_THIRD_NAME.setHidden(true);
	}

 }

