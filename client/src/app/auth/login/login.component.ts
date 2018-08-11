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
  globalConfiguration$: Observable<GlobalConfiguration>;
  globalConfiguration: GlobalConfiguration;
  user: User;
  sub: any;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.globalConfiguration$ = this.store.select(fromCore.getGlobalConfiguration);
    this.sub = this.globalConfiguration$.subscribe(response => {
      if (response)
        this.globalConfiguration = response;
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
      CompanyId: this.globalConfiguration.CompanyId,
      ClientConfigurationId: this.globalConfiguration.Id,
      SecurityClientSettingId: this.globalConfiguration.SecurityClientConfigurationId,
      ClientId: this.globalConfiguration.ClientID,
      ClientSecret: this.globalConfiguration.ClientSecrets,
      ClientScope: this.globalConfiguration.ClientAllowedScopes
    };

    this.store.dispatch(new auth.LogIn(this.user));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
