import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.LogOut());
  }

}
