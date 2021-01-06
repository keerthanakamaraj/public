export interface IModalData {
  title?: string;//title to be displayed for modal
  mainMessage?: string; //set main msg as undefined while showing component in modal
  rawHtml?: string; // operation (convert html)
  buttons: Array<IButtonObj>;//contains list of buttons to be shown @ footer. Send [] array if no btns required
  modalSize: string;//bootstap classes modal-width-sm|modal-width-md|modal-width-lg 
  componentName?: string;
  data?: any;
  iconClass?: any;
  applicationId?: number;//while passing to modal(cards)
  borrowerSeq?: number;//while passing to modal(cards)
  componentCode?: string;
  customerList?: any;//used to send list of customer to interface results from UW
  hideModalHeader?: boolean;
  sectionName? : string; // used for addon details in credit card section
}

export interface IButtonObj {
  text: string,//text to be displayed in the button
  type: string,// can be success | failure
  class: string,//classes used for buttons in the project i.e btn-primary | btn-warning-outline
  id: number,
}

