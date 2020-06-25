import { Component, OnInit } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalData, IButtonObj } from './popup-interface'
import { AnyNaptrRecord } from 'dns';


@Component({
  selector: 'app-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.css']
})
export class PopupAlertComponent implements OnInit {

  modalObject: IModalData;

  constructor(public activeModal: NgbActiveModal, private services: ServiceStock) { }

  ngOnInit() {
    this.modalObject = this.services.rloui.modalObject;
    console.error(this.modalObject);
  }

  async onClick(buttonObj: AnyNaptrRecord): Promise<any> {
    this.activeModal.close(buttonObj);
  }

}
