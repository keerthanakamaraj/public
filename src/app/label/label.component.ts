import { Component, OnInit, Input } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent extends FieldComponent implements OnInit {

  @Input('parentCompCode') parentCompCode: string;
  @Input('fontSize') fontSize: string = 'null';
  @Input('fontColor') fontColor: string = 'null';
  @Input('fontFamily') fontFamily: string = 'null';

  @Input('fontStyle') fontStyle: string = 'null';
  @Input('fontWeight') fontWeight: string = 'null';
  @Input('legendAlign') legendAlign: string = '';
  @Input('underlineReq') underlineReq: boolean = false;

  @Input('type') type: number = 1;
  
  constructor(services : ServiceStock) {
    super(services);
  }

  ngOnInit() {
  }

}
