import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { RloUiAccordionGroupComponent } from './rlo-ui-accordion-group.component';

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
      this.groups.toArray().forEach((t) => t.opened = false);
      // open current group
      group.opened = true;
    }

}
