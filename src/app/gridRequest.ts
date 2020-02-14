export interface GridRequest{
Offset : Number,
Count : Number,
FilterCriteria?:
{
columnName : String,
columnType : String,
conditions : {
searchType : String,
searchText : String,
dateFrom?: String,
dateTo?:String
}
}[]
OrderCriteria? :
{
columnName :String,
orderType : String
}[]
}
