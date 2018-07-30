import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as auth from '../../store/auth/auth.actions';
import * as ui from '../../store/ui/ui.actions';
import { User } from '../../models/user.model';
import { GlobalConfiguration } from '../../models/global-configuration.model';
import * as fromCore from '../../store/core/core.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  globalConstants$: Observable<GlobalConfiguration>;
  globalConstants: GlobalConfiguration;
  user: User;
  sub: any;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.globalConstants$ = this.store.select(fromCore.getGlobalConstants);
    this.sub = this.globalConstants$.subscribe(response => {
      if (response)
        this.globalConstants = response;
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit(): void {
    this.store.dispatch(new ui.StartLoading());

    this.user = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password,
      CompanyId: this.globalConstants.CompanyId,
      ClientConfigurationId: this.globalConstants.Id,
      SecurityClientSettingId: this.globalConstants.SecurityClientConfigurationId,
      ClientId: this.globalConstants.ClientID,
      ClientSecret: this.globalConstants.ClientSecrets,
      ClientScope: this.globalConstants.ClientAllowedScopes
    };

    this.store.dispatch(new auth.LogIn(this.user));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
