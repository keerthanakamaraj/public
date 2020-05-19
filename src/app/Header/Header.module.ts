import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '@angular/forms';
import { RAFormModule } from '../ra-form/ra-form.module';
import { HeaderRoutingModule } from './Header-routing.module';
import { HeaderComponent } from './Header.component';
import { HeaderHandlerModule } from '../Header/header-handler.module';
import { ReadOnlyComponent } from '../rlo-ui-readonlyfield/rlo-ui-readonlyfield.component';
import { ScoreCardModule } from '../score-card/score-card.module';

@NgModule({
    imports: [
        CommonModule,
        HeaderRoutingModule,
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
        HeaderHandlerModule,
        ScoreCardModule
    ],
    declarations: [
        HeaderComponent,
        ReadOnlyComponent
    ],
    exports: [
        HeaderComponent,
    ],
})
export class HeaderModule { }
