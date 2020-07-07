import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RloUiCardTileComponent } from './rlo-ui-card-tile.component';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        RloUiCardTileComponent,
    ],
    exports: [
        RloUiCardTileComponent
    ],

})
export class RloUiCardTileModule { }
