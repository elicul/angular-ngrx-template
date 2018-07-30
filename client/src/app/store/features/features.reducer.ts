import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromRoot from '../app.reducer';

/*
Example reducer

import * as fromToolbox from './toolbox/toolbox.reducer';

export interface WorkflowBuilder {
  toolbox: fromToolbox.State;
}

export interface State extends fromRoot.State {
  WorkflowBuilder: WorkflowBuilder;
}

export const reducers: ActionReducerMap<WorkflowBuilder> = {
  toolbox: fromToolbox.reducer,
};

export const getToolboxesState = createFeatureSelector<fromToolbox.State>('toolbox');
export const getToolboxes = createSelector(getToolboxesState, fromToolbox.getToolboxes);
export const getToolboxesErrorMessage = createSelector(getToolboxesState, fromToolbox.getErrorMessage);
*/
