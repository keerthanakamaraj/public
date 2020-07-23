import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProvidehttpService } from '../providehttp.service';
import { DropDown } from '../DropDownOptions';
import { FieldComponent } from '../field/field.component';
import { Subject, Observable, empty } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ServiceStock } from '../service-stock.service';
import { NgSelectComponent } from '@ng-select/ng-select';//import { dependentValues, DependentValuesService } from '../DependentValues.service';
//import { FormService } from '../FormService';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent extends FieldComponent implements OnInit {
  // @Input('domainObjectCode') domainObjectCode: string;
  @Input('category') category: string;
  @Input('emittedOptions') emittedOptions: any[] = [];
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
    if (this.dependencyMap.get(key) == undefined) { return; }
    var previousVal = this.getDependency(key);
    this.dependencyMap.get(key).value = value;
    if (this.category == '1' && previousVal != value) {
      setTimeout(async () => {
        if (this.doCustomScript) {
          await this.doCustomScript();
        }
        this.loadOptions();
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(async () => {
      if (this.emittedOptions.length > 0) {
        //  console.log("shweta :: onetimeoption : ", this.emittedOptions);
        this.dropDownOptions.Options = this.emittedOptions;
        // this.isOptionsLoaded = true;
        if (this.defaultValue != undefined) {
          this.setValue(this.defaultValue);
        }
      }
      else if (this.category == '1') {
        if (this.doCustomScript) {
          await this.doCustomScript();
        }
        this.loadOptions();
      }
    });
  }

  async ngOnInit() {
    this.error = false
    if (this.emittedOptions && this.emittedOptions.length > 0) {
      //  console.log("shweta :: onetimeoption : ", this.emittedOptions);
      this.dropDownOptions.Options = this.emittedOptions;
      // this.isOptionsLoaded = true;
    }
    else if (this.category != '1') {
      this.searchText$.pipe(
        debounceTime(500),
        // distinctUntilChanged(),
        switchMap(searchText => {
          if (searchText == null) {
            this.select.open();
            return empty();
          }
          this.dropDownOptions.loading = true;
          this.dropDownOptions.Options = [];
          this.dropDownOptions.pageNo = 0;
          this.dropDownOptions.term = searchText;
          this.paginating = false;
          return this.services.http.loadLookup(this.domainObjectUrl, this.dependencyMap, this.dropDownOptions.pageNo, this.dropDownOptions.term, 20, this.doServerUrl);
        }
        )).subscribe(
        data => {
          if (data) {
            this.dropDownOptions.Options = this.dropDownOptions.Options = [{ id: undefined, text: '' }];
            if (data['Data']) {
              this.dropDownOptions.Options = this.dropDownOptions.Options.concat(data['Data']);
            }
          }
          this.dropDownOptions.loading = false;
        },
        err => {
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
    } else {
      this.dropDownOptions.Options = [{ id: undefined, text: 'Loading...' }];
      //In static combo-box, There will be always one element in option to show the placeholder
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
          || (this.dropDownOptions.Options.find(opt => opt.id === this.value) == undefined))) {
          this.value = undefined;
          this.dropDownOptions.Options[0].text = this.placeholder;
        }

        if (this.category == '1' && this.value != undefined) {
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

  async open() {
    this.dropDownOptions.Options = [];
    this.dropDownOptions.pageNo = 0;
    if (this.category == '4') {
      if (this.emittedOptions != undefined && this.emittedOptions.length > 0) {
        this.dropDownOptions.Options = this.emittedOptions;
      }
    }
    else if (this.doCustomScript) {
      await this.doCustomScript();
      this.loadOptions();
    }
    else {
      this.loadOptions();
    }
  }

  comboBlur() {
    this.dropDownOptions.term = undefined;
    super.onBlur();
  }
  onChange(event) {
    if (event == undefined) { return; }
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
    } else if (this.category == '4') {
      console.log("shweta :: in combobox selected event", event);
      this.setValue(event);
    }
    else {
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

  async getDescription(value) {
    if (value == undefined) {
      return undefined;
    }
    var description: any = (this.category == "3") ? [] : undefined;

    if (this.doCustomScript) {
      await this.doCustomScript();
    }

    await this.services.http.loadLookup(this.domainObjectUrl, this.dependencyMap, 0, (this.category == "3" ? undefined : value), 20, this.doServerUrl, true).toPromise().then(
      data => {
        // this.http.checkForSession(data);
        if (data) {
          let result = data['Data'];
          if (this.category == "3") {
            for (let i = 0; i < value.length; i++) {
              var opt = result.find((opt) => { return (opt.id == value[i]) });
              if (opt) {
                description.push(opt['text']);
              }
            }
          } else {
            if (result && result[0] && result[0]["id"] == value) {
              description = result[0]['text'];
            }
            // for (let i = 0; i < result.length; i++) {
            //   if (result[i]["id"] == value) {
            //     description = result[i]['text'];
            //     break;
            //   }
            // }
          }
        }
      });
    return description;
  }

  setValue(value, description = undefined) {
    if (this.category == '3') {
      if (description == undefined) {
        this.getDescription(value).then(
          (desc) => {
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
      } else {
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
    } else if (this.category == '4') {
      let selectedOpt = this.dropDownOptions.Options.find(eachOption => eachOption.id == value);
      if (selectedOpt) {
        this.value = value
        this.additionalInfo = selectedOpt.text;
      }
    } else {
      if (description == undefined) {
        this.getDescription(value).then(
          (desc) => {
            if (this.category == "2") {
              this.dropDownOptions.Options = [{ 'id': value, 'text': desc }];
            }
            this.additionalInfo = desc;
          }
        );
      } else {
        if (this.category == "2") {
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

  onReset() {
    if (!(this.getFieldValue() == null || this.getFieldValue() == undefined || this.getFieldValue() == '')) {
      this.setValue(this.getFieldValue().clear);
    }
    this.additionalInfo = undefined;
    this.error = false;
    this.errorCode = undefined;
  }
}
