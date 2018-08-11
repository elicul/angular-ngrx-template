import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthEffects } from '../store/auth/auth.effects';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CacheHandlerService } from '../core/services/cache-handler.service';

export const COMPONENTS = [LoginComponent, SignupComponent];

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, JwtHelperService, CacheHandlerService, AuthGuard]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(ROUTES),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class RootAuthModule {}
