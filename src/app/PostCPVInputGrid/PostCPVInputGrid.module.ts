import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { PostCPVInputGridComponent } from './PostCPVInputGrid.component';
import { RAFormModule } from '../ra-form/ra-form.module';
import { GridModule } from '../grid/grid.module';
@NgModule({
imports: [
CommonModule,
RAFormModule,
GridModule,
HttpClientModule,
TranslateModule.forChild({
loader: {
provide: TranslateLoader,
useFactory: HttpLoaderFactory,
deps: [HttpClient]
}
}),
],
declarations: [
PostCPVInputGridComponent,
],
exports:[
PostCPVInputGridComponent,
],
})
export class PostCPVInputGridModule { }
