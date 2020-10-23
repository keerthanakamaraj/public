import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

  //@ViewChild('custSearchFields', { read: CustomerSearchFieldsComponent, static: true }) custSearchFields: CustomerSearchFieldsComponent;
  //@Output() customerDetails: EventEmitter<ProposalInitiation> = new EventEmitter();
  //@Output() customerEnrichDetails: EventEmitter<ProposalInitiation> = new EventEmitter();
  @Output() saveSuccess = new EventEmitter<void>();
  @Output() subTypeChange = new EventEmitter<string>();
  @Output() searchSelected = new EventEmitter<any>();
  taskName: any;
  proposalId: any;
  proceedToSearch = true;
  custSubType: any;
  searchType = '';
  customerName: any;
  custType: any;
  backTo: any;
  constructor(public utility: UtilityService) {
    //super(utility);
  }

  ngOnInit() {
    // this.getFormMetadata('saveCustomerDemographicDtls');
    // this.utility.getActivatedRoute().queryParams.subscribe(
    //   params => {
    //     this.utility.getAppService().appRefNumber = params['appRefNum'],
    //       this.taskName = params['taskName'];
    //     this.proposalId = params['ProposalId'];
    //     this.customerName = params['custName'];
    //   }
    // );
  }
  openCustSearchModal() {
    // opens the customer search popup in case of desktop/navigates to new screen in tablet
    // if (this.isTabletEnv()) {
    //   this.searchSelected.emit();
    //   this.custSearchFields.fieldData = [];
    //   this.custSearchFields.groupedFields = [];
    //   this.custSearchFields.rowData = [];
    //   if (this.proceedToSearch) {
    //     //this.appService.backTo = null;
    //     this.utility.getRouter().navigate(['/customer-search'], { queryParams: { 'custType': this.custType, 'backTo': this.backTo } });
    //   }
    // } else {
    //   this.searchSelected.emit();
    //   this.custSearchFields.clearFields();
    //   this.custSearchFields.fieldData = [];
    //   this.custSearchFields.groupedFields = [];
    //   if (this.proceedToSearch) {
    //     jQuery('#CustomerSearchModal').modal('show');
    //   }
    // }
  }

  returnData(event) {
    // to return the data to the calling component from customer search
    //jQuery('#CustomerSearchModal').modal('hide');
    //this.customerDetails.emit(event);
  }
}
