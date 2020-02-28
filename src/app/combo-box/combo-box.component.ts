import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { DropDown } from '../DropDownOptions';
import { FieldComponent } from '../field/field.component';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ServiceStock } from '../service-stock.service';
import { NgSelectComponent } from '@ng-select/ng-select';
//import { dependentValues, DependentValuesService } from '../DependentValues.service';
//import { FormService } from '../FormService';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent extends FieldComponent implements OnInit {
  // @Input('domainObjectCode') domainObjectCode: string;
  @Input('category') category: string;
  // @Input('formCode') formCode : string;

  // @Input('formCode') private comboBoxConfig: {
  //   category: string,
  // };

  // setComboBoxConfig(comboBoxConfig){
  //   this.comboBoxConfig
  // }

  // getComboBoxConfig(){
  //   return this.comboBoxConfig;
  // }

  // @Output() onChange = new EventEmitter<string>();

  dropDownOptions: DropDown = new DropDown();
  paginating = false;

  @ViewChild('select', { static: false }) select: NgSelectComponent;

  private searchText$ = new Subject<string>();

  constructor(services: ServiceStock, private cdRef: ChangeDetectorRef) {
    super(services);
  }

  setDependency(key, value) {
    if(this.dependencyMap.get(key)==undefined){return;}
    var previousVal = this.getDependency(key);
    this.dependencyMap.get(key).value = value;
    if (this.category == '1' && previousVal!=value) {
      this.loadOptions();
    }
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      if (this.category == '1') {
        this.loadOptions();
      }
    });
  }

  ngOnInit() {
    if (this.category != '1') {
      this.searchText$.pipe(
        debounceTime(500),
        // distinctUntilChanged(),
        switchMap(async searchText => {
          this.dropDownOptions.loading = true;
          this.dropDownOptions.Options = [];
          this.dropDownOptions.pageNo = 0;
          this.dropDownOptions.term = searchText;
          this.paginating = false;

          if(this.doCustomScript){
            await this.doCustomScript(event);
          }
          
          return this.services.http.loadLookup(this.domainObjectUrl, this.dependencyMap, this.dropDownOptions.pageNo, this.dropDownOptions.term, 20, this.doServerUrl);
        }
        )).subscribe(
          data => {
            //this.http.checkForSession(data);
            // if (data && data['Status'] == 'S') {

            if (data) {
              this.dropDownOptions.Options = this.dropDownOptions.Options.concat([{ id: undefined, text: '' }]);
              if (data['Data']) {
                this.dropDownOptions.Options = this.dropDownOptions.Options.concat(data['Data']);
              }
            }
            this.paginating = false;
            this.dropDownOptions.loading = false;
          },
          err => {
            this.paginating = false;
            this.dropDownOptions.loading = false;
          }
        );
    }
  }

  scroll() {
    this.dropDownOptions.pageNo++;
    this.paginating = true;
    this.loadOptions();
  }

  async loadOptions() {
    this.dropDownOptions.loading = true;
    let count = 0;
    if (this.category != '1') {
      count = 20;
    }else{
      this.dropDownOptions.Options = [{ id: undefined, text: 'Loading...' }];
      //In static combo-box, There will be always one element in option to show the placeholder
    }

    if(this.doCustomScript){
      await this.doCustomScript(event);
    }

    // this.services.http.loadlookup(this.formCode, this.domainObjectCode, this.dropDownOptions.pageNo, this.dropDownOptions.term, this.dependencyMap, count).subscribe(
    this.services.http.loadLookup(this.domainObjectUrl, this.dependencyMap, this.dropDownOptions.pageNo, this.dropDownOptions.term, count, this.doServerUrl).subscribe(
      data => {
        if (data) {
          let result = data['Data'];
          if (this.category != '1' && !this.paginating)
            this.dropDownOptions.Options = this.dropDownOptions.Options.concat([{ id: undefined, text: '' }]);
          if (result) {
            this.dropDownOptions.Options = this.dropDownOptions.Options.concat(result);
          }
        }
      },
      err => { },
      () => {

        if (this.category == '1' && ((this.value === undefined) 
            || (this.dropDownOptions.Options.find(opt => opt.id === this.value) == undefined))){
            this.value = undefined;
            this.dropDownOptions.Options[0].text = this.placeholder;
        }

        if(this.category == '1' && this.value !=undefined){
          this.dropDownOptions.Options[0].text = '';
        }

        this.paginating = false;
        this.dropDownOptions.loading = false;
      });
  }

  setFocus(setFocus) {
    if (this.category == '2' || this.category == '3') {
      setFocus ? this.select.focus() : this.select.close();
    }
    else {
      setFocus ? document.getElementById(this.fieldID).focus() : document.getElementById(this.fieldID).blur();
    }
  }

  search(term) {
    this.dropDownOptions.term = term;
    this.dropDownOptions.pageNo = 0;
    this.dropDownOptions.Options = [];
    //this.loadOptions();
    this.searchText$.next(term);
  }

  open() {
    this.dropDownOptions.Options = [];
    this.dropDownOptions.pageNo = 0;
    this.loadOptions();
  }

  comboBlur() {
    this.dropDownOptions.term = this.value;
    super.onBlur();
  }
  onChange(event) {
    if(event==undefined){return;}
    if (this.category == '3') {
      this.additionalInfo = [];
      for (var i in event) {
        let obj = event[i];
        this.additionalInfo[i] = obj['text'];
      }
    } else if (this.category == '2') {
      this.dropDownOptions.selectedOption = {};
      this.dropDownOptions.selectedOption['id'] = event['id'];
      this.dropDownOptions.selectedOption['text'] = event['text'];
      this.additionalInfo = event['text'];
    } else {
      if (event === "undefined" || event === undefined) {
        this.dropDownOptions.Options[0].text = this.placeholder;
        this.value = undefined;
      } else {
        this.dropDownOptions.Options[0].text = '';
        this.value = event;
      }
    }
    this.change.emit();
  }

  fieldReset() {
    if (this.category == '2') {
      this.dropDownOptions.Options = [];
      this.dropDownOptions.pageNo = 0;
      this.dropDownOptions.term = undefined;
    }
  }

  async getDescription(value){
    var description: any = (this.category=="3")?[]:"";

    if(this.doCustomScript){
      await this.doCustomScript(event);
    }

    await this.services.http.loadLookup(this.domainObjectUrl, this.dependencyMap, this.dropDownOptions.pageNo, this.dropDownOptions.term, 20, this.doServerUrl).toPromise().then(
      data => {
        // this.http.checkForSession(data);
        if (data) {
          let result = data['Data'];
          if(this.category=="3"){
            for (let i = 0; i < value.length; i++) {
              var opt = result.find((opt)=>{return (opt.id == value[i])});
              if (opt) {
                description.push(opt['text']);
              }
            }
          }else{
            for (let i = 0; i < result.length; i++) {
              if (result[i]["id"] == value) {
                description = result[i]['text'];
                break;
              }
            }
          }
        }
      });
      return description;
  }

  setValue(value, description = undefined) {
    if (this.category == '3') {
      if(description==undefined){
        this.getDescription(value).then(
          (desc)=>{
            this.value = [];
            this.dropDownOptions.Options = [];
            for (var i = 0; i < value.length; i++) {
              let json = {};
              json['id'] = value[i];
              json['text'] = desc[i];
              this.dropDownOptions.Options.push(json);
            }
            this.additionalInfo = desc;
          }
        );
      }else{
        this.value = [];
        this.dropDownOptions.Options = [];
        for (var i = 0; i < value.length; i++) {
          let json = {};
          json['id'] = value[i];
          json['text'] = description[i];
          this.dropDownOptions.Options.push(json);
        }
        this.additionalInfo = description;
      }
    } else {
      if(description==undefined){
        this.getDescription(value).then(
          (desc)=>{
            if(this.category=="2"){
              this.dropDownOptions.Options = [{ 'id': value, 'text': desc }];
            }
            this.additionalInfo = desc;
          }
        );
      }else{
        if(this.category=="2"){
          this.dropDownOptions.Options = [{ 'id': value, 'text': description }];
        }
        this.additionalInfo = description;
      }
    }
    this.value = value;
    // if (description == undefined) {
    //   this.dropDownOptions.loading = true;
    //   this.getDescription(value).then(
    //     (desc)=>{
    //       if(this.category=="3"){
    //         for (let i = 0; i < value.length; i++) {
    //           var opt = this.dropDownOptions.Options.find((opt)=>{return (opt.id == value[i])});
    //           if(opt){
    //             opt['text'] = desc[i];
    //           }
    //         }
    //       }else{
    //         var opt = this.dropDownOptions.Options.find((opt)=>{return (opt.id == value)});
    //         if(opt){
    //           opt['text'] = desc;
    //         }
    //       }
    //       this.dropDownOptions.loading = false;
    //       this.additionalInfo = description;
    //       this.cdRef.detectChanges();
    //     }
    //   );
    // }
    this.passNewValue(value);
  }

  setValues(value, description = undefined) {
    this.setValue(value, description);
  }
}
