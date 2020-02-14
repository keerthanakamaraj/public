import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { ProvidehttpService } from '../providehttp.service';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent extends FieldComponent implements OnInit {
  @Input('rows') rows : any;
  @Input('cols') cols : any;
  @Input('maxLength') maxLength:any;

  constructor(services: ServiceStock) {
    super(services);
   }

  ngOnInit() {
  }

  getFieldInfo() {
    return (this.value==undefined)?"":this.value;
  }
}
