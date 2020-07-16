import { Component, OnInit, Input } from '@angular/core';
import { IGeneralCardData } from '../Interface/masterInterface';

@Component({
  selector: 'app-blank-card',
  templateUrl: './blank-card.component.html',
  styleUrls: ['./blank-card.component.css']
})
export class BlankCardComponent implements OnInit {
  @Input('cardMetaData') cardMetaData: IGeneralCardData;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    
  }

}
