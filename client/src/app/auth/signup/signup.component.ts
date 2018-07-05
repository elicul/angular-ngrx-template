import * as auth from '../auth.actions';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as ui from '../../shared/ui/ui.actions';
import { PasswordValidation } from './password-validation';
import { User } from '../user.model';
import * as fromCore from '../../core/core.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading$: Observable<boolean>;
  user: User;

  constructor(
    private store: Store<fromRoot.State>
  ) {
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
      Password: this.signupForm.value.password
    };

    this.store.dispatch(new auth.SignUp(this.user));
  }

}
