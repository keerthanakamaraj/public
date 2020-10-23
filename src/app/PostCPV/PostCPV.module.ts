import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { PostCPVRoutingModule } from './PostCPV-routing.module';
import { PostCPVComponent } from './PostCPV.component';
import { HeaderModule } from '../Header/Header.module';
import { PostCPVInputGridModule } from '../PostCPVInputGrid/PostCPVInputGrid.module';
@NgModule({
imports: [
CommonModule,
PostCPVRoutingModule,
RAFormModule,
FormsModule,
HttpClientModule,
HeaderModule,
TranslateModule.forChild({
loader: {
provide: TranslateLoader,
useFactory: HttpLoaderFactory,
deps: [HttpClient]
}
}),
PostCPVInputGridModule,
],
declarations: [
PostCPVComponent,
],
exports:[
PostCPVComponent,
],
})
export class PostCPVModule { }
