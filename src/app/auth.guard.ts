import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwt = localStorage.getItem('jwtToken');
  if (jwt != null) {
    console.log('rout gurd true');
    return true;
  }
  console.log('rout gurd false');
  router.navigate(['/login']);
  return false;
};
