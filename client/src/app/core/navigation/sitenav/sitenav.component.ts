import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/app.reducer';
import * as AuthActions from '../../../store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sitenav',
  templateUrl: './sitenav.component.html',
  styleUrls: ['./sitenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private router: Router) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.LogOut());
  }

}
