import { Component, OnInit, Input } from '@angular/core';
import { BPMData } from './workflow-viewer.model';
import { UtilityService } from '../services/utility.service';
import { ServiceStock } from '../service-stock.service';

declare let $: any;
window['$'] = $;
window['jQuery'] = $;


@Component({
  selector: 'app-workflow-viewer',
  templateUrl: './workflow-viewer.component.html',
})
export class WorkflowViewerComponent implements OnInit {

  processId: Number;
  taskId: Number;
  stage: String;

  constructor(public utility: UtilityService, public services: ServiceStock) {
    let pid = 37925;
    let tid = 37945;
    let stage = 'QDE';
    // this.utility.getActivatedRoute().queryParams.subscribe(
    //   params => {
    //     console.log('params ', params);
        
    //     pid = params['processID'];
    //     tid = params['taskID'];
    //     stage = params['stage'];
    //   }
    // );



    this.processId = pid;
    this.taskId = tid;
    this.stage = stage;

    this.stage = 'QDE';
  }

  currentBpmData: BPMData;
  flowBpmData: BPMData;

  ngOnInit() {

    this.stage = this.services.dataStore.getRouteParam(this.services.routing.currModal, 'stage');

    console.log("stage ", this.stage);

    this.addCssToDiv(this.getCoordinates(this.stage));
    this.blinkContinuous();

    // this.getCurrentBPMCordinates().subscribe(
    //   (bpmd) => { this.currentBpmData = bpmd as any },
    //   (err) => { console.log(err) },
    //   () => {
    //     this.addCssToDiv(this.currentBpmData.BPMNMetadata[0]);
    //     this.blinkContinuous();
    //   }
    // );

  }

  getCoordinates(stageId){
    let coordinates = {};
    switch ( stageId) {
      case 'QDE': coordinates = {x: 90, y: 145, height: 50, width: 110}; break;
      case 'DDE': coordinates = {x: 360, y: 245, height: 50, width: 110}; break;
      case 'Underwriter': coordinates = {x: 350, y: 780, height: 50, width: 110}; break;
      case 'Operation': coordinates = {x: 410, y: 1010, height: 50, width: 110}; break;
      default: coordinates = {x: 0, y: 0, height: 0, width: 0}; break;
    }
    return coordinates;
  }

  async blinkFor2s() {
    $('#active-div').show();
    await this.delay(2000);
    $('#active-div').hide();
  }

  blinkContinuous() {
    $('#active-div').show();
  }

  backToTray() {
    this.utility.getRouter().navigate(['/home'], { queryParams: { filterFlag: 'true' } });
  }

  async onDivClick() {
    if (this.flowBpmData == null && this.flowBpmData == undefined) {
      this.getBPMCoordinates().subscribe(
        (bpmd) => { this.flowBpmData = bpmd as any },
        (err) => { console.log() },
        () => {
          this.blinkFlow();
        }
      );
    } else if (this.flowBpmData['Status'] == 'S') {
      this.blinkFlow();
    }

  }

  async blinkFlow() {
    if (this.flowBpmData != null || this.flowBpmData != undefined) {
      var i;
      $('#active-div').hide();
      for (i = 0; i < this.flowBpmData.BPMNMetadata.length; i++) {
        this.addCssToDiv(this.flowBpmData.BPMNMetadata[i]);
        await this.blinkFor2s();
      }
      if (this.currentBpmData != null && this.currentBpmData != undefined) {
        this.addCssToDiv(this.currentBpmData.BPMNMetadata[0]);
      }
      this.blinkContinuous();
    }

  }
  getCurrentBPMCordinates() {
    const url = 'https://rlfc.intellectseecapps.com/los-wf/rest/';
    const headers = { 'ServiceCode': 'getCurrentTaskBPMNCoordinates', 'ProcessId': 'RLO_Process', 'TENANT_ID': 'SB1'};
    const body = { 'TaskId': this.taskId, 'ProcessId': this.processId, 'TENANT_ID': 'SB1'};
    return this.utility.getHttpClient().post(url, body, { headers });
  }

  getBPMCoordinates() {
    const url = 'https://rlfc.intellectseecapps.com/los-wf/rest/';
    const headers = { 'ServiceCode': 'getBPMNCoordinates', 'ProcessId': 'RLO_Process'};
    const body = { 'TaskId': this.taskId, 'ProcessId': this.processId};
    return this.utility.getHttpClient().post(url, body, { headers });
  }

  addCssToDiv(divCss: any) {

    $('#active-div').css({
      'top': divCss.y + 'px',
      'left': divCss.x + 'px',
      'height': divCss.height + 'px',
      'width': divCss.width + 'px',
      'border-radius': ''
    });

    if (divCss.width == divCss.height) {
      $('#active-div').css({ 'border-radius': '50%' });
    }

  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onBackPressed() {
    this.utility.getRouter().navigate(['/home']);
  }

  goBack(){
    this.services.router.navigate(['home', 'LANDING']);
  }
}
