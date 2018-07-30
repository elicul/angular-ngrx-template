import { User } from '../../models/user.model';
import { AuthActionsUnion, AuthActionTypes } from './auth.actions';
import { CacheHandlerService } from '../../core/services/cache-handler.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const localCache = new CacheHandlerService();
const jwtHelper = new JwtHelperService();

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export function isTokenValid(): boolean {
  const token = localCache.getUserToken();
  if (token !== undefined) {
    const isExpired = jwtHelper.isTokenExpired(token);
    if (isExpired)
      return false;

    return true;
  } else
    return false;
}

export const initialState: State = {
  isAuthenticated: isTokenValid(),
  user: undefined,
  errorMessage: undefined
};

export function reducer(state = initialState, action: AuthActionsUnion): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: undefined
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: undefined
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false
      };
    }
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
