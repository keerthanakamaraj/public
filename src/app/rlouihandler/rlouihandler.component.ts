import { Component, OnInit } from '@angular/core';
import { RlouiService } from '../rlo-services/rloui.service';

@Component({
  selector: 'app-rlouihandler',
  template: `
    <span>rlouihandler works!</span>
  `,
  styles: []
})
export class RLOUIHandlerComponent implements OnInit {
  MainComponent: any;
  formName: string;

  constructor(public rloui: RlouiService) {
    // console.log("RLOUIHandlerComponent Constructor ...", this.rloui);

  }

  ngOnInit() {
    // console.log("RLOUIHandlerComponent On NG INIT ", this.rloui);

  }

  onFormLoad(arg0: {}) {
    if(!this.formName) return;
    if(!this.MainComponent) return;

    console.log("Form Name ", this.formName);
    console.log("MainComponent ", this.MainComponent);

    var formFields = this.rloui.getFormFields(this.formName);

    // console.log("field ", formFields.length);
    if(formFields.length !== undefined && formFields.length > 0){

     formFields.forEach(field => {
    // console.log("field ", field);
    if(this.MainComponent[field["ID"]]){ // Check if field is available in form - ignore if not
      if(field["M"] && field["M"] == "1") { // Set Mandatory - Currently not checking type
        this.MainComponent[field["ID"]].mandatory = true;
      }

      if(field["D"] && field["D"] == "1") { // Set Readonly - Currently not checking type
        this.MainComponent[field["ID"]].setReadOnly(true);
      }

      if(field["H"] && field["H"] == "1") { // Set Hidden - Currently not checking type
        this.MainComponent[field["ID"]].setHidden(true);
      }

      if(field["V"]) { // Check Validations
        let validation = this.rloui.getValidation(field["V"]);
        // console.log("Validation ", validation);

        if(validation) { // TODO: Check Type and set appropriate Validations
          if(field["T"] == undefined || field["T"] == "S" ){ // String type -- Treat null / undefined as string
            var placeholder = '';
            if(validation["MX"]) { // MaxLength
              this.MainComponent[field["ID"]].maxLength = validation["MX"];
              placeholder = "Max " + validation["MX"] + " chars";
            }
            if(validation["MI"]) { // Minlength
              this.MainComponent[field["ID"]].minLength = validation["MI"];

              placeholder = "Min " + validation["MI"] + ( placeholder == '' ? '' : '/' + placeholder ) ;
            }

            if(validation["P"]) { // Pattern
              this.MainComponent[field["ID"]].regex = validation["P"];
            }

            // Add Placeholder as Min / Max
            this.MainComponent[field["ID"]].placeholder = placeholder;

          } else if(field["T"] == "N"){ // Number
            if(validation["MX"]) { // MaxLength
              this.MainComponent[field["ID"]].maxValue = validation["MX"];
            }
            if(validation["MI"]) { // Minlength
              this.MainComponent[field["ID"]].minValue = validation["MI"];
            }
          } else if (field["T"] == "D"){ // Date - Need customizations

          }
        }
      }
    }

  });
}

  }

}
