import { FieldConfig } from "../generate-udf-fields/field-config";

export class SpecificInformation extends FieldConfig {
    columnValue: string;
    columnName: number;
    tagName: string;
    clear() {
        this.columnValue = '';
    }
}
