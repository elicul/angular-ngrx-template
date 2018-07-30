import * as auth from '../../store/auth/auth.actions';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
  globalConstants$: Observable<GlobalConfiguration>;
  globalConstants: GlobalConfiguration;
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
    this.signupForm = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', { validators: [Validators.required]})
    }, PasswordValidation.MatchPassword);

  }

  onSubmit(): void {
    this.store.dispatch(new ui.StartLoading());

    this.user = {
      FirstName: this.signupForm.value.firstName,
      LastName: this.signupForm.value.lastName,
      Email: this.signupForm.value.email,
      Password: this.signupForm.value.password,
      CompanyId: this.globalConstants.CompanyId,
      ClientConfigurationId: this.globalConstants.Id,
      SecurityClientSettingId: this.globalConstants.SecurityClientConfigurationId,
      ReturnUrl: this.globalConstants.ApplicationClientURL,
      QueryParams: '',
      ClientId: this.globalConstants.ClientID,
      ClientSecret: this.globalConstants.ClientSecrets,
      ClientScope: this.globalConstants.ClientAllowedScopes
    };

    this.store.dispatch(new auth.SignUp(this.user));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
