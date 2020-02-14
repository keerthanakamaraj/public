import { Component, OnInit } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { ProvidehttpService } from '../providehttp.service';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'app-hidden',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.css']
})
export class HiddenComponent extends FieldComponent implements OnInit {

  constructor(services: ServiceStock) {
    super(services);
   }

  ngOnInit() {
  }

}
