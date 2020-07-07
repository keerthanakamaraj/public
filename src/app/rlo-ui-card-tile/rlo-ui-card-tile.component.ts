import { Component, OnInit,Input } from '@angular/core';
// import { FieldComponent } from '../field/field.component';
import { ServiceStock } from '../service-stock.service';

@Component({
  selector: 'rlo-ui-card-tile',
  templateUrl: './rlo-ui-card-tile.component.html',
  styleUrls: ['./rlo-ui-card-tile.component.css']
})
export class RloUiCardTileComponent  implements OnInit {
  @Input('type') type: number = 1;
  constructor(services: ServiceStock) {
   }

  ngOnInit() {
  }

}
