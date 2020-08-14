import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormCommonComponent } from '../../form-common/form-common.component';
import { UtilityService } from '../../services/utility.service';
import { Collateral } from './collateral-details.model';
import { IGCBMinMaxOffsetModel } from '../../igcb-datepicker/igcb-datepicker.component';
import { SpecificInformation } from './specific-detail.model';
import { GenerateUdfFieldsComponent } from '../generate-udf-fields/generate-udf-fields.component';
// import { UserAccessEntitlement } from 'src/app/services/user-access-entitlement.service';
// import { LoadSecuredFacilitiesComponent } from '../../load-secured-facilities/load-secured-facilities.component';
import { ServiceStock } from 'src/app/service-stock.service';


declare var $: any;

@Component({
  selector: 'app-collateral-details',
  templateUrl: './collateral-details.component.html'
})
export class CollateralDetailsComponent extends FormCommonComponent implements OnInit {
  @ViewChild('udfFields', { static: false }) udfFields!: GenerateUdfFieldsComponent;
  collateralTypes: any;
  // @ViewChild('facilityLinkage', { read: LoadSecuredFacilitiesComponent, static: false }) facilityLinkage: LoadSecuredFacilitiesComponent;
  collateralsDtlsType: any;
  config: any;
  collateralCommonFields = new Collateral();
  custId = '';
  collType: any;
  lookupVariables = ['Currency'];
  maxInputDate = new IGCBMinMaxOffsetModel(new Date(), 0);
  minExpDate = new IGCBMinMaxOffsetModel(new Date(), 1);
  selectedItemId: any;
  specificInfo: any;
  currencyRates = [];
  conversionRates = new Array<Object>();
  proposalId: any;
  dependentcol = {
    'issuingInstitution': 'COL_14',
    'branch': 'COL_13',
    'primaryAccountName': 'COL_6',
    'amountCeded': 'COL_3',
    'lienMarkingDetails': 'COL_11',
    'maturityDate': 'COL_2',
    'lienDate': 'COL_5',
    'depositAccountNumber': '',
    'depositContractNumber': '',
    'businessDate': '',
    'currency': 'COL_4',
    'internalDepositAccNum': ''
  };
  allowedUdfTypes = ['D', 'N', 'T', 'L'];
  depositAccount = {};
  @Output() loadColl: EventEmitter<object> = new EventEmitter<object>();
  @Output() loadgrid: EventEmitter<object> = new EventEmitter<object>();

  constructor(public utility: UtilityService, services: ServiceStock) {
    super(utility, services);
    this.collateralCommonFields = new Collateral();
    this.listenCollateralChanges();
  }

  ngOnInit() {
    this.getFormMetadata('saveCollateralDetails');
    this.onReloadForm();
    this.utility.getActivatedRoute().queryParams.subscribe(
      params => {
        // @CLO-RLO-Merge - App Service and UAM not integrated
        // this.utility.getAppService().appRefNumber = params['appRefNum'];
        // this.proposalId = params['ProposalId'];
        // this.taskName = params['taskName'];
        // this.userAccessEntitle = UserAccessEntitlement.getInstance(this.taskName);
      }
    );
  }
  onReloadForm() {
    this.collateralCommonFields.clear();
    this.clearMappedFacilities();
    this.getCollateralDetail();
    this.getUDFDetails();
    $('#common-section').scrollTop(0);
    $(window).scrollTop(0);
  }
  getCollateralDetail() {
    // to get all the collateral types
    this.utility.getEnrichmentService().getCollateralDetail().subscribe(
      data => {
        if (data) {
          this.collateralsDtlsType = data['results'];
          this.showPanel(this.collateralsDtlsType[0]);
        }
      }
    );
  }
  clearCollateraldetails(obj) {
    // @CLO-RLO-Merge - Use RLO Error Handling
    // this.tooltipError.tooltipdestroy();
    this.collateralCommonFields.clear();
    this.clearMappedFacilities();
    this.specificInfo = null;
  }

  async showPanel(collDtls, editMode?: boolean) {
    // to show the panel on the right based on the collateral type selected
    if (!editMode) {
      this.collateralCommonFields.clear();
      this.clearMappedFacilities();
      this.specificInfo = null;
      this.collateralCommonFields.collateralStatus = 'FRE';
    }
    this.collateralCommonFields.specificFieldInformation = new Array();
    this.collateralCommonFields.collateralType = (collDtls['typeCode']);
    this.collateralCommonFields.collateralTypeDesc = (collDtls['typeDescription']);
    this.collateralCommonFields.collateralSubtype = (collDtls['subTypeCode']);
    this.collateralCommonFields.collateralSubtypeDesc = (collDtls['subTypeDescription']);
    this.collateralCommonFields.customerNumber = this.custId;
    this.selectedItemId = this.collateralCommonFields.collateralSubtype;
    // @CLO-RLO-Merge - Use Class Lavel Variable for CollType - As discussed with Kalpesh
    this.appService.setCollateral(this.collateralCommonFields.collateralType);
    this.collType = this.appService.getCollateral().getValue();
    // @CLO-RLO-Merge - Use RLO Date Formatter
    // this.collateralCommonFields.inputDate = this.utility.formatDateObject(new Date());
    await this.getUDFDetails();
    // @CLO-RLO-Merge - Use RLO Error Handling
    // this.tooltipError.tooltipdestroy();
  }

  onSubmit() {
    // on save of collateral to persist the data
    this.flag = 0;
    // @CLO-RLO-Merge - Use RLO Date Formatter
    // this.collateralCommonFields.expiryDate = this.utility.formatDate(this.collateralCommonFields.expiryDate,
      // this.utility.getTenant().getMomentDateFormat());
    // this.collateralCommonFields.inputDate = this.utility.formatDate(this.collateralCommonFields.inputDate,
      // this.utility.getTenant().getMomentDateFormat());
    this.collateralCommonFields.validateFields(this);
    let fieldDataFiltered: any;
    this.config.forEach(fieldConfig => {
      fieldDataFiltered = this.collateralCommonFields.specificFieldInformation.find(fieldData => {
        return fieldConfig.tagName === fieldData['tagName'];
      });
      if (fieldDataFiltered && this.allowedUdfTypes.includes(fieldConfig['fieldType'])) {
        if (fieldConfig['mandatoryFlag'] === 'Y' && (!fieldDataFiltered || !fieldDataFiltered.columnValue)) {
          this.flag = 1;
          // @CLO-RLO-Merge - Use RLO Error Handling
          //this.tooltipError.tooltiperrorshow(fieldConfig['tagName'], this.defaultErrorRequired());
          return;
        }
        if (fieldConfig['fieldType'] === 'D' && (fieldDataFiltered || fieldDataFiltered.columnValue)) {
          // @CLO-RLO-Merge - Use RLO Date Formatter
          // fieldDataFiltered.columnValue = this.utility.formatDate(fieldDataFiltered.columnValue,
            // this.utility.getTenant().getMomentDateFormat());
        }
      }
    });
    if (this.flag === 1) {
      return;
    }
    this.collateralCommonFields.trnProposalId = this.proposalId;
    this.collateralCommonFields.customerNumber = this.custId;
    this.collateralCommonFields['facilityLinkage'] = {};
    // @CLO-RLO-Merge - FAcilities not used for RLO
    // this.collateralCommonFields['facilityLinkage']['Facilities'] = this.facilityLinkage.TRNDetailsArray;
    this.utility.getEnrichmentService().saveCollateralDetails(this.collateralCommonFields,
      this.collateralCommonFields.customerNumber).subscribe(
      () => {
        // @CLO-RLO-Merge - Use RLO Error Handling
        // this.appService.success(this.getLabel('COLL_SAVED_SUCCESSFULLY'));
        this.collateralCommonFields.clear();
        this.clearMappedFacilities();
        this.loadColl.emit();
      }, error => {
        if (error['error']['ErrorCode'] && error['error']['ErrorCode'] === 'PRD_ERR_035') {
          if (error['error']['ErrorDesc']) {
            const errorJson = JSON.parse(error['error']['ErrorDesc']);
            const errorMessage = errorJson['errorMessage'];
            const collateralCode = errorJson['collateralCode'];
            // @CLO-RLO-Merge - Use RLO Error Handling
            // this.appService.error(errorMessage);
            this.collateralCommonFields.collateralCode = collateralCode;
            this.loadgrid.emit();
          }
        }
        if (error.error.ErrorCode.charAt(0) === 'I') {
          // @CLO-RLO-Merge - Use RLO Error Handling
          // this.appService.error(error.error.ErrorDesc);
          if (error.error.ErrorCode && error.error.ErrorCode === 'IPRD_ERR_035') {
            this.collateralCommonFields.clear();
            this.clearMappedFacilities();
            this.loadColl.emit();
          }
        }
      }
    );
  }

  getCustomerId() {
    // return this.appService.getCustomer().getValue()['customerId'];
    return this.custId;
  }

  editCollateralDetail(collDtls) {
    // on edit of collateral this is called to populate data in the section
    const collateralCode = collDtls.collateralCode;
    const customerNumber = collDtls.customerNumber;
    this.utility.getEnrichmentService().getCollGenericAndSpecDetails(customerNumber, collateralCode).subscribe(async data => {
      if (data) {
        if (data && data['collateralInfo']) {
          this.collateralCommonFields.clear();
          this.clearMappedFacilities();
          Object.assign(this.collateralCommonFields, data['collateralInfo']);
          this.specificInfo = new Array();
          this.depositAccount = {};
          if (data['collateralInfo']['specificInfo']) {
            const specificInfo = data['collateralInfo']['specificInfo'];
            specificInfo.forEach(info => {
              const spec = new SpecificInformation();
              if (this.collType === 'CTIMEDEP' && (info.tagName === 'COL_2' || info.tagName === 'COL_5')) {
                if (info.columnValue) {
                  info.columnValue = new Date(info.columnValue);
                  // @CLO-RLO-Merge - Use RLO Date Formatter
                  // info.columnValue = this.utility.formatDate(info.columnValue);
                }
              } else if (this.collType === 'CTIMEDEP' && info.tagName === 'COL_1') {
                Object.assign(this.depositAccount, info);
              }
              Object.assign(spec, info);
              this.specificInfo.push(spec);
            });
          }
        } else {
          this.collateralCommonFields = new Collateral();
        }
        this.showPanel(this.collateralCommonFields, true);
        const linkedFacilities = await this.utility.getEnrichmentService().getLinkedFacilities(collateralCode).toPromise();
        // @CLO-RLO-Merge - Facilities not used for RLO
        // Object.assign(this.facilityLinkage.TRNDetailsArray, linkedFacilities['LinkedFacilities']);
        // this.facilityLinkage.emitSelFac.emit(this.facilityLinkage.TRNDetailsArray);
      }
    }, error => {
      // @CLO-RLO-Merge - use RLO ErrorHandling
      // this.appService.error(error.error.ErrorDesc);
    });
  }
  listenCollateralChanges() {
    // called on collateral type changes and changes the udf fields
    // @CLO-RLO-Merge - Use Class Lavel Variable for CollType - As discussed with Kalpesh
    this.appService.getCollateral().subscribe(() => {
      this.collType = this.appService.getCollateral().getValue();
      this.getUDFDetails();
    });
  }

  async getUDFDetails() {
    // get specific info/ udf fields for a particular collateral type
    this.config = [];
    if (this.collType) {
      await this.utility.getEnrichmentService().getCollateralUDFDetails(this.collType).subscribe(
        data => {
          if (data) {
            if ((data['errorMessage'] != null || data['errorMessage'] !== undefined) && data['errorCode'] !== '0') {
              // @CLO-RLO-Merge - Use RLO Error Handling
              // this.appService.error(data['errorMessage']);
            } else {
              if (data['specificInformation'] && data['specificInformation']['tabInformation'] &&
                data['specificInformation']['tabInformation'].length > 0) {
                const fieldInfo = data['specificInformation']['tabInformation'][0]['fieldInformation'];
                this.config = fieldInfo.sort();
                this.collateralCommonFields.specificFieldInformation = new Array();
                const modelObject = this.collateralCommonFields.specificFieldInformation;
                if (this.specificInfo && this.specificInfo.length > 0) {
                  this.collateralCommonFields.specificFieldInformation = this.specificInfo;
                }
                if (this.config && this.config.length > modelObject) {
                  this.config.forEach(conf => {
                    const mod = modelObject.find(model => {
                      return model.tagName === conf.tagName;
                    });
                    if (!mod) {
                      const model = new SpecificInformation();
                      model.columnName = conf.columnId;
                      model.tagName = conf.tagName;
                      modelObject.push(model);
                    }
                  });
                }
              }
            }
          }
        }
      );
    }
  }

  // @CLO-RLO-Merge - Facilities not used for RLO
  clearMappedFacilities() {
    // clear the facilities mapped on click of clear button and on refresh of collateral section
    // if (this.facilityLinkage) {
    //   this.facilityLinkage.TRNDetailsArray = [];
    //   for (let i = 0; i < this.facilityLinkage.FacilitiesDetails.length; i++) {
    //     this.deHighlightFacility(this.facilityLinkage.FacilitiesDetails[i]);
    //   }
    // }
  }

  deHighlightFacility(selectedVal) {
    // to de-highlight the mapped facility button
    selectedVal['checked'] = false;
  }
}
