import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as ConfigActions from './endpoint-configuration/endpoint-configuration.actions';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {

  constructor(private store: Store<fromRoot.State>, apollo: Apollo) {
    this.store.dispatch(new ConfigActions.LoadEndpointConfig());
    apollo
      .query({
        query: gql`
          query {
            users {
              id,
              name
            }
          }
        `
      })
      .subscribe(console.log);
  }

}
