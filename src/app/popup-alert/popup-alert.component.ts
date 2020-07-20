import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalData, IButtonObj } from './popup-interface'
import { AnyNaptrRecord } from 'dns';
import { AddSpecificComponent } from './popup-alert.model';
 import { NotepadDetailsFormComponent } from '../NotepadDetailsForm/NotepadDetailsForm.component';
import { AmortizationScheduleComponent } from '../amortization-schedule/AmortizationSchedule.component'

@Component({
  selector: 'app-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.css']
})
export class PopupAlertComponent implements OnInit {

  @ViewChild('appDDEFormDirective', { static: true, read: ViewContainerRef }) FormHost: ViewContainerRef;

  modalObject: IModalData;

  constructor(public activeModal: NgbActiveModal, private services: ServiceStock, private componentFactoryResolver: ComponentFactoryResolver,private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.modalObject = this.services.rloui.modalObject;
    console.error(this.modalObject);
    console.warn(this.modalObject.buttons, this.modalObject.componentName);
  }

  async onClick(buttonObj: AnyNaptrRecord): Promise<any> {
    this.activeModal.close(buttonObj);
    //on click of modal button send the button obj eg: {id: 1, text: 'Save';, type: "success", class: "btn-primary"}. Depending on which btn click(id); perform actions. Respnse snt where the component/ngModal is invoked 
  }

  ngAfterViewInit() {
    if (this.modalObject.hasOwnProperty('componentName')) {
      this.injectDynamicComponent();
    }
    this.cdRef.detectChanges();
  }

  injectDynamicComponent() {
    const componentRef = this.getComponentClassRef('AmortizationScheduleComponent');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef.component);

    const viewContainerRef = this.FormHost;
    viewContainerRef.clear();

    const dynamicComponent = viewContainerRef.createComponent(componentFactory);
    var componentInstance = dynamicComponent.instance;
  }

  getComponentClassRef(componentId: string): AddSpecificComponent {
    switch (componentId) {
      case 'Notes':
        return new AddSpecificComponent(NotepadDetailsFormComponent);
        break;
      case 'AmortizationScheduleComponent':
        return new AddSpecificComponent(AmortizationScheduleComponent);
        break;
    }
  }

}
