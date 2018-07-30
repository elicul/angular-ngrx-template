import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { reducer } from './auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthEffects]
})
export class AuthStoreModule {}
