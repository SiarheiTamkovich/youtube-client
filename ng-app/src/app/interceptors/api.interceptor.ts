import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable ({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
    //  url: `${environment.API_URL}/${req.url}`
      url: `${environment.API_URL}/${req.url}?key=${environment.API_KEY}`,
    }));
  }
}
