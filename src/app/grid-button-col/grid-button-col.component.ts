import { Component, OnInit, NgZone } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-button-col',
  templateUrl: './grid-button-col.component.html',
  styleUrls: ['./grid-button-col.component.css']
})
export class GridButtonColComponent implements ICellRendererAngularComp {

 
  params;
  label: string;
  gridComponentCode: string;
  buttonColId: string;
  Type='';
  CustomClass='btn btn-outline-primary btn-xs';
  IconClass='fa fa-image';

  constructor(public ngZone: NgZone){}

  agInit(params): void {
    this.params = params;
    // this.label = this.params.label!=undefined?this.params.label :'';
    this.gridComponentCode = this.params.gridCode;
    this.buttonColId = this.params.columnId;
    this.Type =  this.params.Type!=undefined?this.params.Type :'1';
    this.CustomClass =  this.params.CustomClass!=undefined?this.params.CustomClass :'btn btn-outline-primary btn-xs';
    this.IconClass =  this.params.IconClass!=undefined?this.params.IconClass :'fa fa-image';
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if ( this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      // const params = {
      //   event: $event,
      //   rowData: this.params.node.data
      //   // ...something
      // }
      this.ngZone.run(()=>{this.params.onClick(this.params.node.data);});
    }
  }

}
