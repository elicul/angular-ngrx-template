import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './app.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../../environments/environment';

import { AuthStoreModule } from './auth/auth-store.module';
import { CoreStoreModule } from './core/core-store.module';
import { FeaturesStoreModule } from './features/features-store.module';

@NgModule({
  imports: [
    CommonModule,
    AuthStoreModule,
    CoreStoreModule,
    FeaturesStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      logOnly: environment.production
    })
  ],
  declarations: []
})
export class RootStoreModule {}
