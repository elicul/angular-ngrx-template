import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  GlobalConfigurationActionTypes,
  LoadGlobalConfigFailure,
  LoadGlobalConfigSuccess
} from './global-configuration.actions';
import { GlobalConfigurationService } from '../../../core/services/global-configuration.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../ui/ui.actions';
import { UIService } from '../../../shared/ui/ui.service';
@Injectable()
export class GlobalConfigurationEffects {

  @Effect()
  configuration$ = this.actions$.pipe(
    ofType(GlobalConfigurationActionTypes.LOAD_GLOBAL_CONFIGURATION),
    switchMap(() => {
      this.store.dispatch(new UI.StartLoading());

      return this.configService.loadGlobalConfiguration()
        .pipe(
          map(response => {
            this.store.dispatch(new UI.StopLoading());

            return new LoadGlobalConfigSuccess(response);
          }),
          catchError(error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar('Failed to load global constants!', undefined, 3000);

            return of(new LoadGlobalConfigFailure(error));
          })
        );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private uiService: UIService,
    private configService: GlobalConfigurationService
  ) {}
}
