import { Action } from '@ngrx/store';
import { EndpointConfiguration } from '../../../models/endpoint-configuration.model';

export enum EndpointConfigurationActionTypes {
  LOAD_ENDPOINT_CONFIGURATION = '[Configuration] Load Endpoint',
  LOAD_ENDPOINT_CONFIGURATION_SUCCESS = '[Configuration] Load Endpoint Success',
  LOAD_ENDPOINT_CONFIGURATION_FAILURE = '[Configuration] Load Endpoint Failure'
}

export class LoadEndpointConfig implements Action {
  readonly type = EndpointConfigurationActionTypes.LOAD_ENDPOINT_CONFIGURATION;
}

export class LoadEndpointConfigSuccess implements Action {
  readonly type = EndpointConfigurationActionTypes.LOAD_ENDPOINT_CONFIGURATION_SUCCESS;

  constructor(public payload: EndpointConfiguration) {}
}

export class LoadEndpointConfigFailure implements Action {
  readonly type = EndpointConfigurationActionTypes.LOAD_ENDPOINT_CONFIGURATION_FAILURE;

  constructor(public payload: any) {}
}

export type EndpointConfigurationActionsUnion =
  | LoadEndpointConfig
  | LoadEndpointConfigSuccess
  | LoadEndpointConfigFailure;
