import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DefaultTranslationHandler implements MissingTranslationHandler {
    constructor(){
        console.log("deep 123456879")
    }
    handle(params: MissingTranslationHandlerParams) {
        console.log(params);
    }
}