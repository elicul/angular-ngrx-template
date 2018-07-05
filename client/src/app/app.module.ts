import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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

export function createApollo(httpLink: HttpLink): any {
  return {
    link: httpLink.create({uri: 'http://localhost:3000/graphql'}),
    cache: new InMemoryCache()
  };
}

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
    ApolloModule,
    HttpLinkModule,
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
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ],
  bootstrap: [CoreComponent]
})
export class AppModule { }
