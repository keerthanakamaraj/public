import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { DDERoutingModule } from './DDE-routing.module';
import { DDEComponent } from './DDE.component';
import { HeaderModule } from '../Header/Header.module';
import { FamilyDetailsFormModule } from '../FamilyDetailsForm/FamilyDetailsForm.module';
import { LiabilityDtlsFormModule } from '../LiabilityDtlsForm/LiabilityDtlsForm.module';
import { NotepadDetailsFormModule } from '../NotepadDetailsForm/NotepadDetailsForm.module';
import { IncomeSummaryFormModule } from '../IncomeSummaryForm/IncomeSummaryForm.module';
import { CustomerDtlsModule } from '../CustomerDtls/CustomerDtls.module';
import { OtherDeductionFormModule } from '../OtherDeductionForm/OtherDeductionForm.module';
import { AssetDetailsFormModule } from '../AssetDetailsForm/AssetDetailsForm.module';
@NgModule({
imports: [
CommonModule,
DDERoutingModule,
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
HeaderModule,
FamilyDetailsFormModule,
LiabilityDtlsFormModule,
NotepadDetailsFormModule,
IncomeSummaryFormModule,
CustomerDtlsModule,
OtherDeductionFormModule,
AssetDetailsFormModule,
],
declarations: [
DDEComponent,
],
exports:[
DDEComponent,
],
})
export class DDEModule { }
