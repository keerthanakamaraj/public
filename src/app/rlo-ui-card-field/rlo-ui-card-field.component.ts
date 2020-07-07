import { Component, OnInit, Input } from '@angular/core';
// import { FieldComponent } from '../field/field.component';
import { ServiceStock } from '../service-stock.service';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { FormComponent } from '../form/form.component';
import { FieldComponent } from '../field/field.component';

@Component({
  selector: 'rlo-ui-card-field',
  templateUrl: './rlo-ui-card-field.component.html',
  styleUrls: ['./rlo-ui-card-field.component.css']
})
export class RloUiCardFieldComponent extends FieldComponent implements OnInit {
  @Input('type') type: number = 1;
  isShow: boolean;
  constructor(services: ServiceStock) {
    super(services);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.isShow = true;
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
}
