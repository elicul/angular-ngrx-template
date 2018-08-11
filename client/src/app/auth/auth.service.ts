import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as fromCore from '../store/core/core.reducer';
import { EndpointConfiguration } from '../models/endpoint-configuration.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CacheHandlerService } from '../core/services/cache-handler.service';

@Injectable()
export class AuthService {
  private endpointConfiguration$: Observable<EndpointConfiguration>;
  private endpointConfiguration: EndpointConfiguration;
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private cacheHandler: CacheHandlerService
  ) {
    this.endpointConfiguration$ = this.store.select(
      fromCore.getEndpointConfiguration
    );
    this.endpointConfiguration$.subscribe((response: EndpointConfiguration) => {
      if (response) this.endpointConfiguration = response;
    });
  }

  logIn(user: User): Observable<any> {
    const url =
      this.endpointConfiguration.GATEWAY_API_URL +
      this.endpointConfiguration.USER_LOGIN_PATH;

    return this.http.post<User>(url, user);
  }

  signUp(user: User): Observable<User> {
    const url =
      this.endpointConfiguration.GATEWAY_API_URL +
      this.endpointConfiguration.USER_REGISTER_PATH;

    return this.http.post<User>(url, user);
  }

  getToken(): string {
    const token = this.cacheHandler.getUserToken();
    if (token !== undefined) {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      if (isExpired) return undefined;

      return token;
    } else return undefined;
  }
}
