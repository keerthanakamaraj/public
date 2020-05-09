import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RloUiAccordionComponent } from './rlo-ui-accordion.component';
import { RloUiAccordionGroupComponent } from './rlo-ui-accordion-group.component';

@NgModule({
  declarations: [
    RloUiAccordionComponent,
    RloUiAccordionGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RloUiAccordionComponent,
    RloUiAccordionGroupComponent
  ]
})
export class RloUiAccordionModule { }
