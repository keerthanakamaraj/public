import { ChartDataIn } from "./chartDataIn";
import { ChartParticularsModel } from "../chartParticulars";

export class GetAllChartData{

    public static imCountryWiseChartInfo={
        ChartRep: {
            Description: "Country Wise Imports in INR",
            FilterFormCode: "",
            ChartCode: "CWIMDATA",
            ServiceCode: "",
            LinkedChartCode: "",
            FilterAllowed: 0,
            ChartType: "horizontalBar", 
            DownloadAllowed: 1
        }
    }

    public static exCountryWiseChartInfo={
        ChartRep: {
            Description: "Country Wise Exports in INR",
            FilterFormCode: "",
            ChartCode: "CWEXDATA",
            ServiceCode: "",
            LinkedChartCode: "",//
            FilterAllowed: 0,
            ChartType: "bar",
            DownloadAllowed: 1
        }
    }

    public static imCountryWiseChartData: ChartDataIn = {
        datasets: [
            {
                datasetName: "Import",
                data: [
                    {
                        value: 250000,
                        label: "Dubai"
                    },
                    {
                        value: 200000,
                        label: "Qatar"
                    },
                    {
                        value: 150000,
                        label: "USA"
                    },
                    {
                        value: 130000,
                        label: "Canada"
                    },
                    {
                        value: 170000,
                        label: "Japan"
                    },
                    {
                        value: 100000,
                        label: "China"
                    }
                ]
            }
        ]
    }

    public static exCountryWiseChartData: ChartDataIn = {
        datasets: [
            {
                datasetName: "Export",
                data: [
                    {
                        value: 400000,
                        label: "Dubai"
                    },
                    {
                        value: 200300,
                        label: "Qatar"
                    },
                    {
                        value: 500000,
                        label: "USA"
                    },
                    {
                        value: 300000,
                        label: "Canada"
                    },
                    {
                        value: 370000,
                        label: "Japan"
                    },
                    {
                        value: 230000,
                        label: "China"
                    }
                ]
            }
        ]
    }

    public static importExportChartInfo={
        ChartRep: {
            Description: "Imports/Exports in INR For Last 1 Year",
            FilterFormCode: "",
            ChartCode: "IMEXDATA",
            ServiceCode: "",
            LinkedChartCode: "",//
            FilterAllowed: 0,
            ChartType: "doughnut",
            DownloadAllowed: 1
        }
    }

    public static importExportChartData: ChartDataIn = {
        datasets: [
            {
                datasetName: "Import/Export",
                data: [
                    {
                        value: 1000000,
                        label: "Total Imports"
                    },
                    {
                        value: 2000300,
                        label: "Total Exports"
                    }
                ]
            }
        ]
    }

    public static chartParticularData: ChartParticularsModel = {
        Types: [{
            Description: "Line",
            Identifier: "line",
            SingleDatasetSupported: 1,
            MultiDatasetSupported: 1
        }, {
            Description: "Horizontal Bar",
            Identifier: "horizontalBar",
            SingleDatasetSupported: 1,
            MultiDatasetSupported: 1
        }, {
            Description: "Radar",
            Identifier: "radar",
            SingleDatasetSupported: 0,
            MultiDatasetSupported: 1
        }, {
            Description: "Doughnut",
            Identifier: "doughnut",
            SingleDatasetSupported: 1,
            MultiDatasetSupported: 0
        }, {
            Description: "Polar Area",
            Identifier: "polarArea",
            SingleDatasetSupported: 1,
            MultiDatasetSupported: 0
        }, {
            Description: "Pie",
            Identifier: "pie",
            SingleDatasetSupported: 1,
            MultiDatasetSupported: 0
        }, {
            Description: "Bar",
            Identifier: "bar",
            SingleDatasetSupported: 1,
            MultiDatasetSupported: 1
        }],
        Colors: [{
            ColorHex: "#FFC800"
        }, {
            ColorHex: "#B94A4B"
        }, {
            ColorHex: "#0F81CE"
        }, {
            ColorHex: "#29CAC0"
        }]
    }
 }