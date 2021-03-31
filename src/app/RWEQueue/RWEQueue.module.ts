import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { RWEQueueRoutingModule } from './RWEQueue-routing.module';
import { RWEQueueComponent } from './RWEQueue.component';
import { RWEQueueGridModule } from '../RWEQueueGrid/RWEQueueGrid.module';
@NgModule({
imports: [
CommonModule,
RWEQueueRoutingModule,
RAFormModule,
FormsModule,
HttpClientModule,
RWEQueueGridModule,
TranslateModule.forChild({
loader: {
provide: TranslateLoader,
useFactory: HttpLoaderFactory,
deps: [HttpClient]
}
}),
],
declarations: [
RWEQueueComponent,
],
exports:[
RWEQueueComponent,
],
})
export class RWEQueueModule { }
