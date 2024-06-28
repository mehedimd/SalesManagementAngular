import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticatedResponse } from './models/authentication/authenticated-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const jwtHelper = inject(JwtHelperService);

  const jwt = localStorage.getItem('jwtToken');
  if (jwt != null && !jwtHelper.isTokenExpired(jwt)) {
    console.log('rout gurd true');
    console.log(jwtHelper.isTokenExpired(jwt) + ' (token not expired )');
    return true;
  }
  const isRefreshSuccess = await tryRefreshingTokens(jwt);
  if (!isRefreshSuccess) {
    alert('isRefresh False');
    console.log('rout gurd false');
    router.navigate(['/login']);
  }

  return isRefreshSuccess;

  async function tryRefreshingTokens(token: any): Promise<boolean> {
    console.log(jwtHelper.isTokenExpired(jwt) + 'jwt helper expired');
    const refreshToken: any = localStorage.getItem('refreshToken');
    if (!jwt || !refreshToken) {
      return false;
    }

    const credentials = JSON.stringify({
      accessToken: jwt,
      refreshToken: refreshToken,
    });
    let isRefreshSuccess: boolean;

    const refreshRes = await new Promise<AuthenticatedResponse>(
      (resolve, reject) => {
        http
          .post<AuthenticatedResponse>(
            'https://localhost:7140/api/token/refresh',
            credentials,
            {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            }
          )
          .subscribe({
            next: (res: AuthenticatedResponse) => {
              resolve(res);
              console.log(res);
            },
            error: (e) => {
              reject;
              isRefreshSuccess = false;
            },
          });
      }
    );
    localStorage.setItem('jwtToken', refreshRes.token);
    localStorage.setItem('refreshToken', refreshRes.refreshToken);
    isRefreshSuccess = true;
    return isRefreshSuccess;
  }
};
