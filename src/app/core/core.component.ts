import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as ConfigActions from './endpoint-configuration/endpoint-configuration.actions';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new ConfigActions.LoadEndpointConfig());
  }

}
