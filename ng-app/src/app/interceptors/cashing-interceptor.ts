import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCache } from '../core/services/request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class CachingInterceptor implements HttpInterceptor {

  constructor(private requestCache: RequestCache) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cached = this.requestCache.get(req);
    return cached ? observableOf(cached) : this.sendRequest(req, next);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.requestCache.put(req, event);
        }
      })
    );
  }
}