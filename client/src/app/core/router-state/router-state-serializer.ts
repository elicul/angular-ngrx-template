import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateUrl } from '../../models/router-state-url.model';
import * as fromRouter from '@ngrx/router-store';

export class CustomRouterStateSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild)
      state = state.firstChild;

    const { params } = state;

    return { url, queryParams, params };
  }
}
