export interface BPMData {
    Status: String,
    BPMNMetadata: {
        UniqueId: String,
        elementname: String,
        x: Number,
        width: Number,
        y: Number,
        height: Number,
        DataInputs: String,
        DataOutputs: String
    }[]
}