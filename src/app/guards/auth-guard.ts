import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) //<== means you are client side
  {
    const token = localStorage.getItem('token');

    if (token) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    router.navigate(['/']);
    return false;
  }

  return router.createUrlTree(['/']);
};
