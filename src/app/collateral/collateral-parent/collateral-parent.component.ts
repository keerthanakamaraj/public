import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CollateralDetailsComponent } from '../collateral-details/collateral-details.component';
import { CollateralListComponent } from '../collateral-list/collateral-list.component';
import { UtilityService } from '../../services/utility.service';
import { FormCommonComponent } from '../../form-common/form-common.component';
import { ServiceStock } from 'src/app/service-stock.service';

@Component({
  selector: 'app-collateral-parent',
  templateUrl: './collateral-parent.component.html',
  styleUrls: ['./collateral-parent.component.css']
})
export class CollateralParentComponent extends FormCommonComponent implements OnInit, AfterViewInit {

  @ViewChild('collateralDetails', { static: false }) collateralDetails: CollateralDetailsComponent;
  @ViewChild('collateralList', { static: false }) collateralList: CollateralListComponent;
  custID: any;

  readOnly: boolean = false;

  constructor(public utility: UtilityService, services: ServiceStock) {
    super(utility, services);
  }

  ngOnInit() {
  }
  clearAll() {

  }
  setCustID(custID) {
    this.custID = custID;
    if (this.collateralList) {
      this.collateralList.setCustID(this.custID);
    }
  }
  editCollateralDetails(collDtls) {
    if (this.collateralDetails) {
      this.collateralDetails.editCollateralDetail(collDtls);
    }
  }
  async loadCollateralDetails() {
    // gets the customer number and calls child components get functions
    let custNumber = '';
    const dat = await this.utility.getEnrichmentService().getDemographicDetail(this.trnProposalId).toPromise();
    let demographicDetail = new Array<any>();
    if (dat['DemographicCorporateDetails']) {
      demographicDetail = demographicDetail.concat(dat['DemographicCorporateDetails']);
    }
    if (dat['DemographicIndividualDetails']) {
      demographicDetail = demographicDetail.concat(dat['DemographicIndividualDetails']);
    }
    // const borrowerDetail = demographicDetail.find(customerData => customerData['CustomerType'] === '001');
    const borrowerDetail = demographicDetail.find(customerData => customerData['CUSTOMERTYPE'] === 'B');
    if (borrowerDetail && borrowerDetail['CORECUSTID']) {
      custNumber = this.utility.padLeft(borrowerDetail['CORECUSTID'], '0', 10);
    } else if (borrowerDetail && borrowerDetail['ICIFNUMBER']) {
      custNumber = this.utility.padLeft(borrowerDetail['ICIFNUMBER'], '0', 10);
    }
    if (this.collateralList) {
      this.collateralList.custId = custNumber;
      this.collateralList.loadCollateralDetails();
    }
    // if (this.relationshipLink) { this.relationshipLink.loadData(); }
    if (this.collateralDetails) {
      this.collateralDetails.custId = custNumber;
      this.collateralDetails.onReloadForm();
    }
  }

  ngAfterViewInit() {
    // used to call the get api after the child components are all loaded
    this.loadCollateralDetails();
  }

  loadCollateralGrid() {
    if (this.collateralList) { this.collateralList.loadCollateralDetails(); }
  }
}
