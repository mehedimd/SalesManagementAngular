export class AuthenticatedResponse {
  token: string = '';
  refreshToken: string = '';
  role?: string;
  applicationUser: any;
}
