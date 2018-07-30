import { EndpointConfigurationActionsUnion, EndpointConfigurationActionTypes } from './endpoint-configuration.actions';
import { EndpointConfiguration } from '../../../models/endpoint-configuration.model';

export interface State {
  errorMessage: string | null;
  endpointConfiguration: EndpointConfiguration;
}

export const initialState: State = {
  errorMessage: undefined,
  endpointConfiguration: undefined
};

export function reducer(state = initialState, action: EndpointConfigurationActionsUnion): State {
  switch (action.type) {
    case EndpointConfigurationActionTypes.LOAD_ENDPOINT_CONFIGURATION: {
      return {
        ...state,
        errorMessage: undefined
      };
    }

    case EndpointConfigurationActionTypes.LOAD_ENDPOINT_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        errorMessage: undefined,
        endpointConfiguration: action.payload
      };
    }

    case EndpointConfigurationActionTypes.LOAD_ENDPOINT_CONFIGURATION_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getErrorMessage = (state: State) => state.errorMessage;
export const getEndpointConfiguration = (state: State) => state.endpointConfiguration;
