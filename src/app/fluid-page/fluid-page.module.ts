import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FluidPageRoutingModule } from './fluid-page-routing.module';
import { FluidPageComponent } from './fluid-page.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FluidPageRoutingModule
    ],
    declarations: [
        FluidPageComponent,
        
    ],
    exports: [
        FluidPageComponent
    ],
})
export class FluidPageModule { }
