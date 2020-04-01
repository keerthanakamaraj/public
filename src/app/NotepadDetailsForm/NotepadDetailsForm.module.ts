import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { NotepadDetailsFormRoutingModule } from './NotepadDetailsForm-routing.module';
import { NotepadDetailsFormComponent } from './NotepadDetailsForm.component';
import { NotepadDetailsGridModule } from '../NotepadDetailsGrid/NotepadDetailsGrid.module';
import { NotepadHandlerModule } from '../NotepadDetailsForm/notepad-handler.module';
@NgModule({
imports: [
CommonModule,
NotepadDetailsFormRoutingModule,
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
NotepadDetailsGridModule,
NotepadHandlerModule,
],
declarations: [
NotepadDetailsFormComponent,
],
exports:[
NotepadDetailsFormComponent,
],
})
export class NotepadDetailsFormModule { }
