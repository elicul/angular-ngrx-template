import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpModule } from '@angular/http';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

import { environment } from '../environments/environment';
import { CoreComponent } from './core/core.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { metaReducers, reducers } from './app.reducer';
import { CustomRouterStateSerializer } from './core/router-state/router-state-serializer';

export const ROUTES: Routes = [
  { path: '', loadChildren: './features/features.module#FeaturesModule'},
  { path: '**', redirectTo: 'welcome'}
];

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    RouterModule,
    FeaturesModule,
    HttpModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    AuthModule.forRoot()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [CoreComponent]
})
export class AppModule { }
