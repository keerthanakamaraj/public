export interface ChartDataIn{
    datasets:{
            datasetName: String,
            data:{
                    label: String,
                    value: Number
                }[]
        }[]
}