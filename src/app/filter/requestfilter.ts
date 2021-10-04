import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tokenize } from "@angular/compiler/src/ml_parser/lexer";
import { Observable } from "rxjs";

export class Requestfilter implements HttpInterceptor {



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let auth_req = req;
        const token = localStorage.getItem('token');
        if (token != null) {
            /*auth_req = req.clone({
                setHeaders: {
                    Authorization: "Bearer" + token
                }
            });*/
            auth_req = req.clone({
                headers: req.headers.set("Authorization","Bearer " + token)
            })
            console.log("from interceptor:" + token);
        }
        return next.handle(auth_req);
    }
}
