import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { InitiationRoutingModule } from './Initiation-routing.module';
import { InitiationComponent } from './Initiation.component';
import { CustDtlsGridModule } from '../CustDtlsGrid/CustDtlsGrid.module';
import { InitiationHandlerModule } from '../Initiation/initiation-handler.module';
import { RloUiAccordionComponent } from '../rlo-ui-accordion/rlo-ui-accordion.component';
import { RloUiAccordionGroupComponent } from '../rlo-ui-accordion/rlo-ui-accordion-group.component';
@NgModule({
imports: [
CommonModule,
InitiationRoutingModule,
RAFormModule,
FormsModule,
HttpClientModule,
TranslateModule.forChild({
loader: {
provide: TranslateLoader,
useFactory: HttpLoaderFactory,
deps: [HttpClient]
}
}),
CustDtlsGridModule,
InitiationHandlerModule,
],
declarations: [
InitiationComponent,
RloUiAccordionComponent,
RloUiAccordionGroupComponent
],
exports:[
InitiationComponent,
],
})
export class InitiationModule { }
