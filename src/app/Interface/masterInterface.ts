export interface ICardMetaData {
    type: string;
    id: string;
    displayName: string;
    data: any;
}

export interface IGeneralCardData {
    isEnabled: boolean;
    name: string;
    modalSectionName: string;
    data?: ICardListData[] | any;
    borrowerSeq?: number;
    applicationId?: number;
}

export interface ICardListData {
    title: string;
    subTitle: any; //completed|pending|deviation-> in case of type != basic AND text if type == basic
    type: "basic" | "icon" | "iconStatus" | "statusCount";
    modalSectionName?: string;//name of the section to be opened IN MODAL.
}

export interface IUwCustomerTab {
    BorrowerSeq: number,
    CD_CUSTOMER_NAME: string;
    CD_CUSTOMER_TYPE: string;
}

export interface IDeserializable {
    deserialize(input: any): this;
}