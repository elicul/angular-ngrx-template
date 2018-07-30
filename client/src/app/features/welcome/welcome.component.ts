import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../store/app.reducer';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
      this.loggedIn$ = this.store.pipe(select(fromRoot.getIsAuth));
  }

  logout(): void {
    this.store.dispatch(new AuthActions.LogOut());
  }

}
