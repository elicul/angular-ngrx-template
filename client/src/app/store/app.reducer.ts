import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../models/router-state-url.model';
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth/auth.reducer';
import * as fromUi from './ui/ui.reducer';
// tslint:disable-next-line:no-implicit-dependencies
import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  ui: fromUi.reducer,
  auth: fromAuth.reducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    // console.log('state', state);
    // console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<State>> = !environment.production ? [logger, storeFreeze]  : [];
