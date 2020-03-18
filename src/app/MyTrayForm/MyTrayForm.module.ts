import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { MyTrayFormRoutingModule } from './MyTrayForm-routing.module';
import { MyTrayFormComponent } from './MyTrayForm.component';
import { MyTrayGridModule } from '../MyTrayGrid/MyTrayGrid.module';
@NgModule({
imports: [
CommonModule,
MyTrayFormRoutingModule,
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
MyTrayGridModule,
],
declarations: [
MyTrayFormComponent,
],
exports:[
MyTrayFormComponent,
],
})
export class MyTrayFormModule { }
