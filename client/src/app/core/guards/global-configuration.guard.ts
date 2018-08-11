import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import { GlobalConfiguration } from '../../models/global-configuration.model';
import * as fromCore from '../../store/core/core.reducer';
import * as GlobalActions from '../../store/core/global-configuration/global-configuration.actions';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class GlobalConfigurationGuard implements CanActivate {

  constructor(private store: Store<fromRoot.State>) {}

  getGlobalConfiguration(): Observable<GlobalConfiguration> {
    return this.store.select(fromCore.getGlobalConfiguration)
      .pipe(
        tap((data: any) => {
            if (data === undefined)
              this.store.dispatch(new GlobalActions.LoadGlobalConfig());
          }),
          take(1)
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.getGlobalConfiguration()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
}
