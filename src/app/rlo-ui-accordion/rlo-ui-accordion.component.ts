import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { RloUiAccordionGroupComponent } from './rlo-ui-accordion-group.component';
import { element } from 'protractor';
// import { setTimeout } from 'timers';

@Component({
  selector: 'rlo-ui-accordion',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./rlo-ui-accordion.component.scss']
})
export class RloUiAccordionComponent implements AfterContentInit {
  @ContentChildren(RloUiAccordionGroupComponent)
  groups: QueryList<RloUiAccordionGroupComponent>;

  constructor() { }

  /**
 * Invoked when all children (groups) are ready
 */
  ngAfterContentInit() {
    // console.log (this.groups);
    // Set active to first element
    this.groups.toArray()[0].opened = true;
    // Loop through all Groups
    this.groups.toArray().forEach((t) => {
      // when title bar is clicked
      // (toggle is an @output event of Group)
      t.toggle.subscribe(() => {
        // Open the group
        this.openGroup(t);
      });
      /*t.toggle.subscribe((group) => {
        // Open the group
        this.openGroup(group);
      });*/
    });
  }

  /**
 * Open an accordion group
 * @param group   Group instance
 */

  openGroup(group: RloUiAccordionGroupComponent) {
    // close other groups

    this.groups.toArray().forEach((data) => {
      console.log(data);
    })

    // this.groups.toArray().forEach((t) => t.opened = false);
    // open current group
    // group.opened = true;
    // if (group.disableAccordian) {
    //   group.opened = false;
    //   this.groups.toArray()[0].opened = true;
    // } else {
    //   group.opened = true;
    // }

    if (group.opened) {
      group.opened = false;
    } else {
      group.opened = true;
    }

    console.log('group', group);

    // setTimeout(function () {
    //   // Temp Fix - using native js call change to better approach
    //   // let activePanel = document.getElementsByClassName("rlo-panel active")[0];
    //   const activePanel = document.getElementById(group.id);

    //   // Sol - 1
    //   // let panelHeader = activePanel.getElementsByClassName("acc-header")[0];
    //   // panelHeader.scrollIntoView();

    //   // Sol - 2
    //   const firstInput = activePanel.getElementsByTagName('input')[0];
    //   firstInput.focus();

    // }, 100);

  }

  setTags(group: any, tags: Array<any>) {
    let accordionGroup = this.groups.find(element => { return element.id == group });
    accordionGroup.tags = tags;
  }

  disableAccordian(group: any, flagforAccordian: boolean) {
    this.groups.toArray().forEach((t) => t.opened = false);
    this.groups.toArray()[0].opened = true;
    let accordionGroup = this.groups.find(element => { return element.id == group });
    accordionGroup.disableAccordian = flagforAccordian;
  }

}
