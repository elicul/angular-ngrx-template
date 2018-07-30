import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  EndpointConfigurationActionTypes,
  LoadEndpointConfigFailure,
  LoadEndpointConfigSuccess
} from './endpoint-configuration.actions';
import { EndpointConfigurationService } from '../../../core/services/endpoint-configuration.service';
import { environment } from '../../../../environments/environment';
import { UIService } from '../../../shared/ui/ui.service';
import * as UI from '../../ui/ui.actions';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class EndpointConfigurationEffects {

  @Effect()
  configuration$ = this.actions$.pipe(
    ofType(EndpointConfigurationActionTypes.LOAD_ENDPOINT_CONFIGURATION),
    switchMap(() => {
      this.store.dispatch(new UI.StartLoading());

      return this.configService.loadEndpointConfiguration(environment.endpointConfigFile)
        .pipe(
          map(response => {
            this.store.dispatch(new UI.StopLoading());

            return new LoadEndpointConfigSuccess(response);
          }),
          catchError(error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar('Failed to load endpoint configuration!', undefined, 3000);

            return of(new LoadEndpointConfigFailure(error));
            })
        );
      }
    )
  );

  constructor(
    private actions$: Actions,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
    private configService: EndpointConfigurationService
  ) {}

}
