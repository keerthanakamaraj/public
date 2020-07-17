import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// import { FieldComponent } from '../field/field.component';
import { ServiceStock } from '../service-stock.service';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { FormComponent } from '../form/form.component';
import { FieldComponent } from '../field/field.component';
import { IDeserializable, IGeneralCardData, ICardListData } from "../Interface/masterInterface";
import { reduce } from 'rxjs/operators';
import { isContext } from 'vm';
import { SelectControlValueAccessor } from '@angular/forms';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

@Component({
  selector: 'rlo-ui-card-field',
  templateUrl: './rlo-ui-card-field.component.html',
  styleUrls: ['./rlo-ui-card-field.component.css']
})
export class RloUiCardFieldComponent extends FieldComponent implements OnInit {
  @Input() type: string;
  @Output() onIconClick = new EventEmitter<any>();
  subTitle: string = "";

  @Input('cardFieldMetaData') cardFieldMetaData: ICardListData;
  @Input('parentCardName') parentCardName: string;

  myIcon: boolean;

  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.subTitle = this.cardFieldMetaData.subTitle;
  }

  onClickButton(event) {
    this.onIconClick.emit(event);
  }

  onButtonClick() {
    let inputMap = new Map();
    inputMap.set('component', 'FamilyDetailsForm');
    const modalRef = this.services.modal.open(PopupModalComponent, { windowClass: 'modal-width-lg' });
    var onModalClose = async (reason) => {
      (reason == 0 || reason == 1) ? await this.services.routing.removeOutlet() : undefined;
    }
    modalRef.result.then(onModalClose, onModalClose);
    modalRef.componentInstance.rotueToComponent(inputMap);
    this.services.dataStore.setModalReference(this.services.routing.currModal, modalRef);
  }
  // onButtonClick() {
  //   let inputMap = new Map();
  //   inputMap.set('component', 'FamilyDetailsForm');
  //   const modalRef = this.services.modal.open(PopupModalComponent, { windowClass: 'modal-width-lg' });
  //   var onModalClose = async (reason) => {
  //     (reason == 0 || reason == 1) ? await this.services.routing.removeOutlet() : undefined;
  //   }
  //   modalRef.result.then(onModalClose, onModalClose);
  //   modalRef.componentInstance.rotueToComponent(inputMap);
  //   this.services.dataStore.setModalReference(this.services.routing.currModal, modalRef);
  // }
}
