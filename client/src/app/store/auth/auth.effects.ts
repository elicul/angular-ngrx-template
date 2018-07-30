import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UIService } from '../../shared/ui/ui.service';
import * as UI from '../ui/ui.actions';
import * as fromRoot from '../app.reducer';

import { AuthService } from '../../auth/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInFailure, LogInSuccess,
  SignUp, SignUpFailure,
  SignUpSuccess
} from './auth.actions';
import { CacheHandlerService } from '../../core/services/cache-handler.service';

@Injectable()
export class AuthEffects {

  @Effect()
  logIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .pipe(
      map((action: LogIn) => action.payload),
      switchMap(payload => {
        this.store.dispatch(new UI.StartLoading());

        return this.authService.logIn(payload)
          .pipe(
            map(user => {
              this.store.dispatch(new UI.StopLoading());

              return new LogInSuccess(user);
            }),
            catchError(error => {
              this.store.dispatch(new UI.StopLoading());
              this.uiService.showSnackbar(error.message, undefined, 3000);

              return of(new LogInFailure({ error }));
            })
          );
      })
    );

  @Effect({ dispatch: false })
  logInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      this.cacheHandlerService.setUserToken(user.payload.Token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  logInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  signUp: Observable<any> = this.actions
    .ofType(AuthActionTypes.SIGNUP)
    .pipe(
      map((action: SignUp) => action.payload),
      switchMap(payload => {
        return this.authService.signUp(payload)
          .pipe(
            map(user => {
              this.store.dispatch(new UI.StartLoading());

              return new SignUpSuccess(user);
            }),
            catchError(error => {
              this.store.dispatch(new UI.StopLoading());
              this.uiService.showSnackbar(error.message, undefined, 3000);

              return of(new SignUpFailure({ error }));
            })
          );
      })
    );

  @Effect({ dispatch: false })
  signUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap(user => {
      this.cacheHandlerService.setUserToken(user.payload.Token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  signUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  logOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(user => {
      this.cacheHandlerService.removeUserToken();
      this.router.navigateByUrl('/login');
    })
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private uiService: UIService,
    private cacheHandlerService: CacheHandlerService
  ) {}

}
