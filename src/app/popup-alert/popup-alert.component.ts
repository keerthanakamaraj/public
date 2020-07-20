import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalData, IButtonObj } from './popup-interface'
import { AnyNaptrRecord } from 'dns';
import { AddSpecificComponent } from './popup-alert.model';
import { PersonalInterviewComponent } from '../PersonalInterview/personal-interview.component';
import { NotepadDetailsFormComponent } from '../NotepadDetailsForm/NotepadDetailsForm.component';


@Component({
  selector: 'app-popup-alert',
  templateUrl: './popup-alert.component.html',
  styleUrls: ['./popup-alert.component.css']
})
export class PopupAlertComponent implements OnInit {

  @ViewChild('appDDEFormDirective', { static: true, read: ViewContainerRef }) FormHost: ViewContainerRef;

  modalObject: IModalData;

  constructor(public activeModal: NgbActiveModal, private services: ServiceStock, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.modalObject = this.services.rloui.modalObject;
    console.error(this.modalObject);
    console.warn(this.modalObject.buttons);
  }

  async onClick(buttonObj: AnyNaptrRecord): Promise<any> {
    this.activeModal.close(buttonObj);
    //on click of modal button send the button obj eg: {id: 1, text: 'Save';, type: "success", class: "btn-primary"}. Depending on which btn click(id); perform actions. Respnse snt where the component/ngModal is invoked 
  }

  ngAfterViewInit() {
    this.injectDynamicComponent()
  }

  injectDynamicComponent() {
    const componentRef = this.getComponentClassRef('PersonalInterviewDetails');
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentRef.component);

    const viewContainerRef = this.FormHost;
    viewContainerRef.clear();

    const dynamicComponent = viewContainerRef.createComponent(componentFactory);
    var componentInstance = dynamicComponent.instance;
  }

  getComponentClassRef(componentId: string): AddSpecificComponent {
    switch (componentId) {
      case 'PersonalInterviewDetails':
        return new AddSpecificComponent(PersonalInterviewComponent);
        break;
      case 'Notes':
        return new AddSpecificComponent(NotepadDetailsFormComponent);
        break;

    }
  }

}
