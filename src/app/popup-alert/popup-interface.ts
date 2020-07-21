export interface IModalData {
  title?: string;
  mainMessage: string;
  buttons: Array<IButtonObj>;//contains list of buttons to be shown @ footer. Send [] array if no btns required
  modalSize: string;
  componentName?: string;
  data?:any;
}

export interface IButtonObj {
  text: string,//text to be displayed in the button
  type: string,// can be success | failure
  class: string,//classes used for buttons in the project i.e btn-primary | btn-warning-outline
  id: number,
}
