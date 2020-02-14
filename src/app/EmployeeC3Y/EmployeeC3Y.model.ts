export class EmployeeC3YModel {
    FieldId_1: string;
    FieldId_10: string;
    FieldId_3: string;
    FieldId_4: string;
    setValue(res) {
        if (res) {
            if (res['FieldId_1']) { this.FieldId_1 = res['FieldId_1']; }
            if (res['FieldId_10']) { this.FieldId_10 = res['FieldId_10']; }
            if (res['FieldId_3']) { this.FieldId_3 = res['FieldId_3']; }
            if (res['FieldId_4']) { this.FieldId_4 = res['FieldId_4']; }
        }
    }
}
