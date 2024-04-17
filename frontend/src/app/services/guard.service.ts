import { Injectable, inject } from "@angular/core";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService {

  private authenticationService = inject(AuthenticationService);

  constructor() { }

  canActivate(route:any): boolean {
      return this.authenticationService.isLogin;
  }

  // canMatch(): boolean {
  //   console.log('cantivate active');
  //   console.log('iLogin',this.userAuthenticationService.isLogin);

  //   return this.userAuthenticationService.isLogin;
  // }
}
