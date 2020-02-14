import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { ProvidehttpService } from '../providehttp.service';
import { ServiceStock } from '../service-stock.service';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent extends FieldComponent implements OnInit {
  @Input('imagePath') imagePath: string;
  @Input('fieldName') fieldName: string;
  @Input('iconClass') iconClass: string='fa fa-image';

  @Input('loadingCustomClass') loadingCustomClass: string;
  @Input('loadingIconClass') loadingIconClass: string = "fa fa-spinner fa-spin";
  @Input('loadingText') loadingText: string = "Loading...";

  @Input('type') type: number = 1;

  loading: boolean = false;
  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() {
    if (this.type == 1 || this.type == 3) {
      if (this.customClass == "" || this.customClass == undefined) {
        this.customClass = "btn btn-outline-primary btn-sm";
      }
      if (this.loadingCustomClass == "" || this.loadingCustomClass == undefined) {
        this.loadingCustomClass = "btn btn-outline-primary btn-sm";
      }
    } else if (this.type == 2) {
      if (this.customClass == "" || this.customClass == undefined) {
        this.customClass = "default-btn-img";
      }
      if (this.loadingCustomClass == "" || this.loadingCustomClass == undefined) {
        this.loadingCustomClass = "img-loading-default";
      }
    } else if (this.type == 4) {

      if (this.customClass == "" || this.customClass == undefined) {
        this.customClass = "icon-btton-default";
      }
      if (this.loadingCustomClass == "" || this.loadingCustomClass == undefined) {
        this.loadingCustomClass = "icon-btton-default";
      }
    }
  }

  setDisabled(disable: boolean) {
    this.readOnly = disable;
  }

  isDisabled() {
    return this.readOnly;
  }


  timer: any;
  delay = 250;
  preventSingleClick = false;

  @Output('buttonClick') buttonClick = new EventEmitter<string>();
  @Output('buttonDblclick') buttonDblclick = new EventEmitter<string>();
  @Input('doubleClickReq') doubleClickReq: boolean = false;

  onClick(event) {
    if (!this.doubleClickReq) {
      this.buttonClick.emit(event);
    } else {
      this.timer = setTimeout(() => {
        if (!this.preventSingleClick) {
          this.buttonClick.emit(event);
        }
        this.preventSingleClick = false;
      }, this.delay);
    }
  }

  onDoubleClick(event) {
    if (this.doubleClickReq) {
      clearTimeout(this.timer);
      this.preventSingleClick = true;
      this.buttonDblclick.emit(event);
    }
  }

  isLoading() {
    return this.loading;
  }

  showLoading(loading: boolean) {
    this.loading = loading;
  }
}
