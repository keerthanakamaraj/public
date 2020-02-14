import { Component, OnInit, Input } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { ProvidehttpService } from '../providehttp.service';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent extends FieldComponent implements OnInit {
  // @Input('fieldName') fieldName : string;
  // @Input('labelAlign') labelAlign : string = 'right';
  // @Input('labelReq') labelReq : boolean = true;

  @Input('checkedValue') checkedValue : any = true;
  @Input('uncheckedValue') uncheckedValue : any = false;
  constructor(services : ServiceStock) { 
    super(services);
    this.value = false;
  }

  getFieldInfo() {
    return (this.value==true)?"Yes":"No";
  }

  getFieldValue(){
    return (this.value==true)?this.checkedValue:this.uncheckedValue;
  }

  onBlur(){
    this.isOnFocus=false;
    this.blur.emit(this.getFieldValue());
  }

  setValue(value, additionalInfo = undefined) {
    this.value = (value==this.checkedValue);
    this.additionalInfo = additionalInfo;
    this.passNewValue(value);
  }

  ngOnInit() {}
}
