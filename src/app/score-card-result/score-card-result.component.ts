import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ServiceStock } from '../service-stock.service';
import { ComboBoxComponent } from '../combo-box/combo-box.component';

@Component({
  selector: 'app-score-card-result',
  templateUrl: './score-card-result.component.html',
 // styleUrls: ['./score-card-result.component.css']
})

export class ScoreCardResultComponent implements OnInit {

  @ViewChild('SCR_Filter', { static: false }) SCR_Filter: ComboBoxComponent;
  @Input() ApplicationId: string = undefined;

  FilterOptions=[];
  showExpanded: boolean = false;
  scoreCards = [
    {
      type: "Final DBR",
      score: 90,
    },
    {
      type: "Fire Policy",
      score: 36,
    },
    {
      type: "Application Score",
      score: 75,
    }
  ];

  constructor(public services: ServiceStock) { }

  ngOnInit() {
    let tempCustomerList=this.services.rloCommonData.getCustomerList();
    console.log("shweta :: in score section",tempCustomerList);
    this.setFilterbyOptions(tempCustomerList);
   // questionParam.radioOptionFormatList.push({ id: eachElement["AnswerSeq"], text: eachElement["AnswerText"] });
   }

   setFilterbyOptions(tempCustomerList){
     this.FilterOptions=[];
     this.FilterOptions.push({ id:'AP_'+this.ApplicationId , text:'Application' });
     tempCustomerList.forEach(element => {
      this.FilterOptions.push({ id:'B_'+element , text: element["AnswerText"] });
     });

   }

  headerChanges(data) {
    console.log(data);
    if (data.scrollExceded) {
      this.showExpanded = data.scrollExceded;
    }
    else {
      this.showExpanded = false;
    }
  }
}
