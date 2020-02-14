import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProvidehttpService } from "./providehttp.service";
import { map } from "rxjs/operators";

@Injectable()
export class HttpResponseInceptor implements HttpInterceptor {
    constructor(private httpService: ProvidehttpService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                // if (event instanceof HttpResponse) {
                //     if (event.body) {
                //         this.httpService.checkForSession(event.body);
                //         if (this.httpService.sessionValid) {
                //             return event;
                //         }
                //     }
                // } else {
                //     return event;
                // }
                return event;
            }));
    }
}