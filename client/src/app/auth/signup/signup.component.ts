import * as auth from '../../store/auth/auth.actions';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as ui from '../../store/ui/ui.actions';
import { PasswordValidation } from './password-validation';
import { User } from '../../models/user.model';
import { GlobalConfiguration } from '../../models/global-configuration.model';
import * as fromCore from '../../store/core/core.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading$: Observable<boolean>;
  user: User;
  globalConfiguration$: Observable<GlobalConfiguration>;
  globalConfiguration: GlobalConfiguration;
  sub: any;

  constructor(private store: Store<fromRoot.State>) {
    this.globalConfiguration$ = this.store.select(
      fromCore.getGlobalConfiguration
    );
    this.sub = this.globalConfiguration$.subscribe(response => {
      if (response) this.globalConfiguration = response;
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.signupForm = new FormGroup(
      {
        firstName: new FormControl('', { validators: [Validators.required] }),
        lastName: new FormControl('', { validators: [Validators.required] }),
        email: new FormControl('', {
          validators: [Validators.required, Validators.email]
        }),
        password: new FormControl('', { validators: [Validators.required] }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required]
        })
      },
      PasswordValidation.MatchPassword
    );
  }

  onSubmit(): void {
    this.store.dispatch(new ui.StartLoading());

    this.user = {
      FirstName: this.signupForm.value.firstName,
      LastName: this.signupForm.value.lastName,
      Email: this.signupForm.value.email,
      Password: this.signupForm.value.password,
      CompanyId: this.globalConfiguration.CompanyId,
      ClientConfigurationId: this.globalConfiguration.Id,
      SecurityClientSettingId: this.globalConfiguration
        .SecurityClientConfigurationId,
      ReturnUrl: this.globalConfiguration.ApplicationClientURL,
      QueryParams: '',
      ClientId: this.globalConfiguration.ClientID,
      ClientSecret: this.globalConfiguration.ClientSecrets,
      ClientScope: this.globalConfiguration.ClientAllowedScopes
    };

    this.store.dispatch(new auth.SignUp(this.user));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
