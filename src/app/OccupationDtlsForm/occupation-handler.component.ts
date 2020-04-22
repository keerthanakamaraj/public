import { Component, OnInit, Input } from '@angular/core';
import { OccupationDtlsFormComponent} from './OccupationDtlsForm.component';
import { FieldComponent } from '../field/field.component';
import { RLOUIHandlerComponent } from 'src/app/rlouihandler/rlouihandler.component';

@Component({
  selector: 'app-occupation-handler',
  template: `<div style="display:none;"></div>`,
  styles: []
})
export class OccupationHandlerComponent extends RLOUIHandlerComponent implements OnInit {
	@Input() MainComponent: OccupationDtlsFormComponent;
	formName: string = "OccupationDetails";
	  ngOnInit() {
    // ngOnInit
  }

  // OnFormLoad
  onFormLoad(arg0: {}) {
    console.log("Occupation .. On form load");
    super.onFormLoad({});
    //this.MainComponent.CD_THIRD_NAME.setHidden(true);
  }
  
  occupationOnchange(){
   if (this.MainComponent.OD_OCCUPATION.getFieldValue() == 'SL'){
     this.MainComponent.OD_EMPLT_TYPE.mandatory = true;
   }
   else{
     this.MainComponent.OD_EMPLT_TYPE.mandatory = false;
   }

   if (this.MainComponent.OD_OCCUPATION.getFieldValue() == 'SE'){
    this.MainComponent.OD_SELF_EMPLD_TYPE.mandatory = true;
  }
    else{
    this.MainComponent.OD_SELF_EMPLD_TYPE.mandatory = false;
  }



  }

 }

