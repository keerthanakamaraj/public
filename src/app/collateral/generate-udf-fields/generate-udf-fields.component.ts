import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { FieldConfig } from './field-config';
import { FormCommonComponent } from '../../form-common/form-common.component';
import { SpecificInformation } from '../collateral-details/specific-detail.model';
// import { ToolTipError } from '../../tooltip-error';
import { IGCBMinMaxDateModel } from '../../igcb-datepicker/igcb-datepicker.component';
import { ServiceStock } from 'src/app/service-stock.service';


@Component({
  selector: 'app-generate-udf-fields',
  templateUrl: './generate-udf-fields.component.html',
  styleUrls: ['./generate-udf-fields.component.css']
})
export class GenerateUdfFieldsComponent extends FormCommonComponent implements OnInit, OnChanges {

  @Input() collateralType = '';
  @Input() config: FieldConfig[];
  @Input() modelObject: Array<SpecificInformation>;
  @Output() modelObjectChange = new EventEmitter();
  @Output() depositNumChange = new EventEmitter();
  @Input() readOnly: boolean = false;

  udfData = new Array<SpecificInformation>();
  items1: any;
  lovData = new Object();
  collType: any;
  allDepositNumber = [];
  depoNum = [];
  dnByCon = [];
  depNumDetail = [];
  conNum = [];
  dependentcol = {
    'issuingInstitution': 'COL_14',
    'branch': 'COL_13',
    'primaryAccountName': 'COL_6',
    'lienMarkingDetails': 'COL_11',
    'maturityDate': 'COL_2',
    'lienDate': 'COL_5',
    'depositAccountNumber': '',
    'depositContractNumber': '',
    'businessDate': '',
    'currency': 'COL_4',
    'internalDepositAccNum': '',
    'unassignedAmount': 'COL_7',
    'amountCeded': 'COL_3',
    'totalDepositAmount': 'COL_8'
  };
  disabledDepositFields = [];
  businessDate: any;
  constructor(public utility: UtilityService, services: ServiceStock) {
    super(utility, services);
    this.listenCollateralChanges();
  }

  ngOnInit() {

  }

  listenCollateralChanges() {
    // @CLO-RLO-Merge - Use Class Lavel Variable for CollType - As discussed with Kalpesh
    // this.appService.getCollateral().subscribe(() => {
    //   this.collType = this.appService.getCollateral().getValue();
    // });
  }

  fieldValueCheck(val: string) {
    // to check if the field is mandatory or not
    if (val.toLowerCase() === 'y') {
      return true;
    } else {
      return false;
    }
  }

  getUdfConfig() {
    return this.config && this.modelObject && this.modelObject.length >= this.config.length ? this.config : [];
  }

  loadLovData(tagName: string, collType: string) {
    // loads the lov values for a particular tagname and a collateral type
    const formData = new Map<string, string>();
    formData.set('collateralType', collType);
    formData.set('tagName', tagName);
    this.utility.getEnrichmentService().getCollateralAttributesDataDetail(formData).subscribe(data => {
      if (data['errorCode'] === '0') {
        if (data['specificDataDetails'] && data['specificDataDetails']['queryRecords']) {
          this.lovData[data['specificDataDetails']['targetTagName']] = data['specificDataDetails']['queryRecords'];
        }
      }
    });
  }

  ngOnChanges(changes) {
    // on changes in parent component binds the data to this component
    if (changes && changes['config'] && changes['config']['currentValue']
      && changes['modelObject'] && changes['modelObject']['currentValue']) {
      this.updateModelData();
    } else if (changes['modelObject'] && changes['modelObject']['currentValue'] && this.udfData) {
      const newModData = changes['modelObject']['currentValue'];
      this.udfData.forEach(data => {
        const modData = newModData.find(mod => {
          return mod.tagName === data.tagName;
        });
        if (modData) {
          data.columnValue = modData.columnValue;
        }
      });
    }
  }
  updateModelData() {
    // updates the model object based
    this.udfData = new Array();
    if (this.modelObject) {
      this.modelObject.forEach(model => {
        const conf = this.config.find(con => {
          return con.tagName === model.tagName;
        });
        if (conf) {
          const obj = new SpecificInformation();
          Object.assign(obj, model);
          Object.assign(obj, conf);
          if (this.collType === 'CTIMEDEP' && this.disabledDepositFields.includes(conf['tagName'])) {
            obj['displayField'] = 'Y';
          }
          this.udfData.push(obj);
          this.lovData[conf.tagName] = new Array();
          if (conf.fieldType === 'L') {
            this.loadLovData(conf.tagName, this.collType);
          }
        }
      });
    }
  }

  udfChanges(udfField: SpecificInformation) {
    // called on changes in udf fields
    if (this.modelObject) {
      const model = this.modelObject.find(mod => {
        return mod.tagName === udfField.tagName;
      });
      if (model) {
        model.columnValue = udfField.columnValue;
        // console.log('emitting');
        this.modelObjectChange.emit(this.modelObject);
      }
      if (this.collType === 'CTIMEDEP' && udfField.tagName === 'COL_1') {
        this.getDepositDetails(udfField);
      }
    }
  }
  setMatchingValue(modelObj, tagName, val) {
    if (tagName && tagName !== null) {
      const index = modelObj.findIndex(x => x.tagName === tagName);
      if (this.collType === 'CTIMEDEP' && (tagName === 'COL_2' || tagName === 'COL_5')) {
        if (val) {
          val = new Date(val);
          // @CLO-RLO-Merge - Use RLO Date Formatter
          // val = this.utility.formatDate(val);
        }
      }
      modelObj[index].columnValue = val;
    }
  }

  getPlaceholder(field: FieldConfig) {
    // to set the placeholder for the fields in specific information
    const maxLabel = this.getLabel('MAX_PLACEHOLDER_LABEL');
    if (field.fieldLength) {
      return this.utility.format(maxLabel, field.fieldLength);
    }
    return '';
  }

  validateField(fieldValue, fieldName, minDate?: IGCBMinMaxDateModel,
    maxDate?: IGCBMinMaxDateModel, uiFieldName?: string, isDate?: boolean) {
    // @CLO-RLO-Merge - Use RLO Error Handler
    // const tooltip = new ToolTipError();
    // tooltip.tooltiperrorhide(fieldName);
    // if (!tooltip.isFieldVisible(fieldName)) {
    //   return;
    // }
    // const fieldConfig = this.getConfiguration(fieldName);
    // if (fieldConfig.mandatoryFlag === 'Y' && !fieldValue) {
    //   this.flag = 1;
    //   tooltip.tooltiperrorshow(fieldName, this.getLabel('error.' +
    //     this.serviceName + '.' + fieldName + '.required', this.getLabel('error.default.required')));
    //   return;
    // }
    // if (fieldValue && isDate) {
    //   const valid = this.validateDate(fieldValue, minDate, maxDate);
    //   if (!valid) {
    //     this.flag = 1;
    //     tooltip.tooltiperrorshow(fieldName, this.getLabel('error.' +
    //       this.serviceName + '.' + fieldName + '.invalid', this.getLabel('error.default.invalid')));
    //     return;
    //   }
    // }
  }

  getConfiguration(fieldName: string): FieldConfig {
    // return the field configuration based on the field name
    if (this.config) {
      const con = this.config.find(conf => {
        return conf.tagName === fieldName;
      });
      if (con) { return con; }
    }
    return new FieldConfig();
  }

  getDepositDetails(udfField) {
    const val = udfField.columnValue.split('-');
    const allDepNum = [];
    Object.assign(allDepNum, this.allDepositNumber);
    this.depNumDetail = allDepNum.filter(v => {
      return v.internalDepositAccNum === val[0] && v.depositContractNumber === val[1];
    });
    console.log(this.depNumDetail);
    const dtl = this.depNumDetail[0];
    for (const key of Object.keys(dtl)) {
      console.log(key);
      if (key === 'businessDate') {
        this.businessDate = dtl[key];
      }
      this.setMatchingValue(this.modelObject, this.dependentcol[key], dtl[key]);
    }
    this.updateModelData();
  }
}
