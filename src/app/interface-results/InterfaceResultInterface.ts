
export interface IInterfaceResultCustomer {
  CustomerType?: any;
  FullName?: any;
  CustomerId?: any;
  InterfaceResultDataMap?: Map<string, IInterfaceResultData>;
}

export interface IInterfaceResultData {
  InterfaceResultId?: any,
  ResponseStatus?: any,
  ResponseDate?: any,
  InterfaceId?: any,
  TriggerDate?: any,
  TriggerStage?: any,
}
