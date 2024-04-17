import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationGuardService } from '../services/guard.service';
import { ROUTES } from '../utils/constants';


export const SecurityGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isLoginActivated = inject(AuthenticationGuardService).canActivate(route.routeConfig);

  if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register' || route.routeConfig?.path === '' || route.routeConfig?.path === '#') {
    if (!isLoginActivated) {
      return true;
    } else{
      router.navigateByUrl(ROUTES.ROUTE_HOME);
    }
  } else {
    if (!isLoginActivated) {
      router.navigateByUrl(ROUTES.ROUTE_LOGIN);
    }
  }
  return true;
};
