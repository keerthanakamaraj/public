import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rlo-ui-accordion-group',
  template: `
  <div class="rlo-panel" [ngClass]="{'active': opened}">
    <div class="acc-header" (click)="toggle.emit()">
      <div class="acc-header-text">{{title}}</div>
      <span *ngFor="let tag of tags;" class="tag">
        {{ tag }}
      </span>
    </div>
    <div class="body row">
      <ng-content></ng-content>
    </div>
  <div>
  `,
  styleUrls: ['./rlo-ui-accordion.component.scss']
})
export class RloUiAccordionGroupComponent {

  /**
   * If the panel is opened or closed
   */
  @Input() opened = false;

  /**
   * Text to display in the group title bar
   */
  @Input() title: string;


  @Input() tags: string[] = [];

  /**
   * Emitted when user clicks on group titlebar
   * @type {EventEmitter<any>}
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(){
    this.tags.push("ABCD", "DEF");
  }
}
