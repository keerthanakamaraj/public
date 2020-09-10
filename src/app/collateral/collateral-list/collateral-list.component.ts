import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormCommonComponent } from '../../form-common/form-common.component';
import { UtilityService } from '../../services/utility.service';
// import { UserAccessEntitlement } from 'src/app/services/user-access-entitlement.service';
import { ServiceStock } from 'src/app/service-stock.service';

@Component({
  selector: 'app-collateral-list',
  templateUrl: './collateral-list.component.html',
  styleUrls: ['./collateral-list.component.css']
})
export class CollateralListComponent extends FormCommonComponent implements OnInit {

  collateralList: any;
  custId: any;
  @Output() editColl: EventEmitter<object> = new EventEmitter<object>();
  @Input() selectedBorrowerSeq: any;//used to get current selected borrowerSeq in DDE

  constructor(public utility: UtilityService, services: ServiceStock) {
    super(utility, services);

  }

  ngOnInit() {
    // @CLO-RLO-Merge - Commented User Access Management
    // this.utility.getActivatedRoute().queryParams.subscribe(params => {
    //   this.taskName = params['taskName'];
    //   this.userAccessEntitle = UserAccessEntitlement.getInstance(this.taskName);
    // });
  }

  async loadCollateralDetails() {

    console.log('---------------------------- loadCollateralDetails');

    // to get the collateral details and the mapped facilities to each collateral based on customer number
    // const facColLinkDtls = await this.utility.getEnrichmentService().getLinkedfacilities(this.custId).toPromise();

    this.utility.getEnrichmentService().getCustomerCollateralDetails(this.custId).subscribe(
      data => {
        this.collateralList = (data && data['collateralDetails']) ? data['collateralDetails'] : [];
        // @CLO-RLO-Merge - linked facilities not required
        // const linkedFacilities = facColLinkDtls ? facColLinkDtls['linkedFacilities'] : [];
        const linkedFacilities = [];
        if (linkedFacilities && linkedFacilities.length > 0) {
          for (let j = 0; j < linkedFacilities.length; j++) {
            const index = this.collateralList.findIndex(obj => obj.collateralCode === linkedFacilities[j]['collateralCode']);
            if (index >= 0) {
              if (this.collateralList[index]['taggedFacilities']) {
                this.collateralList[index]['taggedFacilities'] = this.collateralList[index]['taggedFacilities']
                  + ', ' + linkedFacilities[j]['FacilityDesc'];
              } else {
                this.collateralList[index]['taggedFacilities'] = linkedFacilities[j]['FacilityDesc'];
              }
            }
          }
        }
        this.collateralList = this.collateralList.filter(coll => coll.customerNumber === this.custId);

        let obj = {
          "name": "CollateralDetails",
          "data": this.collateralList,
          "BorrowerSeq": this.selectedBorrowerSeq
        }
        this.services.rloCommonData.globalComponentLvlDataHandler(obj);
      });
  }
  updateTaggedFac(collDetails, collateralList, facDesc) {
    // used to return the tagged facilities for the collateral
    for (let j = 0; j < collDetails.length; j++) {
      const index = collateralList.findIndex(obj => obj.collateralCode === collDetails[j]['collateralCode']);
      if (index >= 0) {
        if (collateralList[index]['taggedFacilities']) {
          collateralList[index]['taggedFacilities'] = collateralList[index]['taggedFacilities'] + ', ' + facDesc;
        } else {
          collateralList[index]['taggedFacilities'] = facDesc;
        }
      }
    }
    return collateralList;
  }
  setCustID(custId) {
    this.custId = custId;
    // call get service
  }

  editCollateral(collDtl) {
    // on edit of collateral emits the collateralcode to parent component to reload
    // @CLO-RLO-Merge - app Service Integration Pending
    if (collDtl.collateralStatus === 'REL') {
      // this.appService.error(this.getLabel('COLL_MARKED_FOR_EXECUTION'));
      console.log('COLL_MARKED_FOR_EXECUTION ');
      return;
    } else {
      this.appService.setCollateral((collDtl['collateralType']['typeCode']).trim());
      this.editColl.emit(collDtl);
    }
  }

  formatAmount(amt) {
    return this.services.rloui.formatAmount(amt);
  }
}
