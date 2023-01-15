import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

interface CachedRequest {
  url: string;
  response: HttpResponse<any> | any;
}

@Injectable({
  providedIn: 'root'
})
export class RequestCache {
  cache = new Map<string, CachedRequest>();

  get(req: HttpRequest<any>): HttpResponse<any> {
    const cached = this.cache.get(req.urlWithParams);
    return cached ? cached.response : null;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    this.cache.set(url, { url, response });

    //TODO: need to invalidate cache, so that if request is too old, we need to remove it
  }
}