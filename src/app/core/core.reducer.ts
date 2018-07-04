import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
  } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as fromConfig from './endpoint-configuration/endpoint-configuration.reducer';

export interface Configuration {
  configuration: fromConfig.State;
}

export interface State extends fromRoot.State {
  configuration: Configuration;
}

export const reducers: ActionReducerMap<Configuration> = {
  configuration: fromConfig.reducer
};

export const getConfigurationState = createFeatureSelector<fromConfig.State>('configuration');

export const getConfiguration = createSelector(getConfigurationState, fromConfig.getEndpointConfiguration);
export const getConfigurationErrorMessage = createSelector(getConfigurationState, fromConfig.getErrorMessage);

