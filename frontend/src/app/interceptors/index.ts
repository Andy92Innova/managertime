import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Provider } from "@angular/core";
import { AuthInterceptor } from "./auth-interceptor.interceptor";

/** Provider for the Noop Interceptor. */
export const AuthInterceptorProvider: Provider = [
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
