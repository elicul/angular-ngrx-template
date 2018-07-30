import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
  } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as fromConfig from './endpoint-configuration/endpoint-configuration.reducer';
import * as fromGlobalConfig from './global-configuration/global-configuration.reducer';

export interface Configuration {
  configuration: fromConfig.State;
  globalConstants: fromGlobalConfig.State;
}

export interface State extends fromRoot.State {
  configuration: Configuration;
}

export const reducers: ActionReducerMap<Configuration> = {
  configuration: fromConfig.reducer,
  globalConstants: fromGlobalConfig.reducer
};

export const getConfigurationState = createFeatureSelector<fromConfig.State>('configuration');

export const getConfiguration = createSelector(getConfigurationState, fromConfig.getEndpointConfiguration);
export const getConfigurationErrorMessage = createSelector(getConfigurationState, fromConfig.getErrorMessage);

export const getGlobalConfigurationState = createFeatureSelector<fromGlobalConfig.State>('globalConstants');
export const getGlobalConstants = createSelector(getGlobalConfigurationState, fromGlobalConfig.getGlobalConfiguration);
export const getGlobalErrorMessage = createSelector(getGlobalConfigurationState, fromGlobalConfig.getErrorMessage);
