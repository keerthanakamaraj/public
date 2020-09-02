import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCache } from '../RequestCache';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCache) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /* const cachedResponse = this.cache.get(req);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache); */
    const cachedResponse = this.cache.get(req);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCache): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (req.method === 'GET'
            && (req.url.indexOf('ENTITLEMENT') >= 0
              || req.url.indexOf('GETDERIVEDFLDCODE') >= 0
              || req.url.indexOf('LoadTenantDADetails') >= 0
              || req.url.indexOf('Lookup') >= 0)) {
            cache.put(req, event);
          }
        }
      })
    );
  }
}
