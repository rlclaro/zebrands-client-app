import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private tokenStorageService: TokenStorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.tokenStorageService.getUser()) {
                // auto logout if 401 or 403 response returned from api
                this.tokenStorageService.signOut();
                console.log("Unauthorized user")
                window.location.reload();
            }

            console.log("Error");

            const error = err.error?.message || err.statusText;
            console.error(err);
            return throwError(error);
        }))
    }
}
