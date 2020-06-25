export interface IModalData {
  title?: string;
  mainMessage: string;
  buttons: Array<IButtonObj>;
  modalSize: string;
}

export interface IButtonObj {
  text: string,
  type: string,
  class: string,
  id: number,
}