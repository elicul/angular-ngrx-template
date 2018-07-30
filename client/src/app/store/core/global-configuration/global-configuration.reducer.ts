import { GlobalConfigurationActionsUnion, GlobalConfigurationActionTypes } from './global-configuration.actions';
import { GlobalConfiguration } from '../../../models/global-configuration.model';

export interface State {
  errorMessage: string | null;
  globalConfiguration: GlobalConfiguration;
}

export const initialState: State = {
  errorMessage: undefined,
  globalConfiguration: undefined
};

export function reducer(state = initialState, action: GlobalConfigurationActionsUnion): State {
  switch (action.type) {
    case GlobalConfigurationActionTypes.LOAD_GLOBAL_CONFIGURATION: {
      return {
        ...state,
        errorMessage: undefined
      };
    }

    case GlobalConfigurationActionTypes.LOAD_GLOBAL_CONFIGURATION_SUCCESS: {
      return {
        ...state,
        errorMessage: undefined,
        globalConfiguration: action.payload
      };
    }

    case GlobalConfigurationActionTypes.LOAD_GLOBAL_CONFIGURATION_FAILURE: {
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
export const getGlobalConfiguration = (state: State) => state.globalConfiguration;
