import { Action } from '@ngrx/store';
import { GlobalConfiguration } from '../../../models/global-configuration.model';

export enum GlobalConfigurationActionTypes {
  LOAD_GLOBAL_CONFIGURATION = '[Configuration] Load Global',
  LOAD_GLOBAL_CONFIGURATION_SUCCESS = '[Configuration] Load Global Success',
  LOAD_GLOBAL_CONFIGURATION_FAILURE = '[Configuration] Load Global Failure'
}

export class LoadGlobalConfig implements Action {
  readonly type = GlobalConfigurationActionTypes.LOAD_GLOBAL_CONFIGURATION;
}

export class LoadGlobalConfigSuccess implements Action {
  readonly type = GlobalConfigurationActionTypes.LOAD_GLOBAL_CONFIGURATION_SUCCESS;

  constructor(public payload: GlobalConfiguration) {}
}

export class LoadGlobalConfigFailure implements Action {
  readonly type = GlobalConfigurationActionTypes.LOAD_GLOBAL_CONFIGURATION_FAILURE;

  constructor(public payload: any) {}
}

export type GlobalConfigurationActionsUnion =
  | LoadGlobalConfig
  | LoadGlobalConfigSuccess
  | LoadGlobalConfigFailure;
