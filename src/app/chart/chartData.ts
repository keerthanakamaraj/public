export interface ChartData{
    labels: String[],
    datasets: {
        label?: String,
        data?: Number[],
        backgroundColor?: any,
        borderColor?: any,
        // backgroundColor?: String[]|String,
        // borderColor?: String[]|String,
        // borderWidth: Number[]|Number,
        fill?: boolean
    }[]
}