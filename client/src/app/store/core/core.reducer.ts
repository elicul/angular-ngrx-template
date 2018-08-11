import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
  } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as fromEndpointConfig from './endpoint-configuration/endpoint-configuration.reducer';

export interface Core {
  endpointConfiguration: fromEndpointConfig.State;
}

export interface State extends fromRoot.State {
  core: Core;
}

export const reducers: ActionReducerMap<Core> = {
  endpointConfiguration: fromEndpointConfig.reducer
};

export const getEndpointConfigurationState = createFeatureSelector<fromEndpointConfig.State>('endpointConfiguration');
export const getEndpointConfiguration = createSelector(getEndpointConfigurationState, fromEndpointConfig.getEndpointConfiguration);
export const getEndpointConfigurationErrorMessage = createSelector(getEndpointConfigurationState, fromEndpointConfig.getErrorMessage);
