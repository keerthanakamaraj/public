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
    data: ICardListData[];
    borrowerSeq?: number;
    applicationId?:number;
}

export interface ICardListData {
    title: string;
    subTitle: any;
    type: "basic" | "icon" | "iconStatus" | "statusCount";
    modalSectionName?: string;//name of the section to be opened IN MODAL.
}

export interface IDeserializable {
    deserialize(input: any): this;
}