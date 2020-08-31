import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class RequestCache {
  cache = new Map();
  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    /* const url = req.urlWithParams;
    const cachedData = localStorage.getItem(url);
    if (!cachedData) {
      return undefined;
    }
    const cached = JSON.parse(cachedData);
    return cached; */
    const url = req.urlWithParams;
    const cached = this.cache.get(url);
    if (!cached) {
      return undefined;
    }
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    /* const url = req.urlWithParams;
    localStorage.setItem(url, JSON.stringify(response)); */
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);
    console.log("DEEP | cache", this.cache);
  }
}
