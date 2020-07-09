export interface ICardMetaData {
    type: string;
    id: string;
    displayName: string;
    data: any;
}

export interface IDeserializable {
    deserialize(input: any): this;
}