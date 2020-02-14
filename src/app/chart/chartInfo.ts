export interface ChartInfo{
    ChartRep: {
		Description?: String,
		ChartCode?: String,
		LinkedChartCode?: String,
		ChartType?: String,
		FilterAllowed?: boolean,
		DownloadAllowed?: boolean,
		ToolbarAllowed?: boolean,
		TypeChangeAllowed?: boolean,
		ExportSourceAllowed?: boolean
	},
	ApiRepository?: {
		AccessType?: String,
		Description?: String,
		ServiceCode?: String,
		ApiGatewayCode?: String,
	}
}