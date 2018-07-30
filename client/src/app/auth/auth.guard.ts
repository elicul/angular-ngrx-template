import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import * as fromRoot from '../store/app.reducer';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth)
      .pipe(
        take(1),
        map(response => {
          if (!response)
            this.router.navigate(['/login']);

          return response;
        })
      );
  }
}
