import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {
  RouterStateSerializer
} from '@ngrx/router-store';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { CoreComponent } from './core/core.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { CustomRouterStateSerializer } from './core/router-state/router-state-serializer';
import { RootStoreModule } from './store/root-store.module';

export const ROUTES: Routes = [
  { path: '', loadChildren: './features/features.module#FeaturesModule'},
  { path: '**', redirectTo: ''}
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
    RootStoreModule,
    AuthModule.forRoot()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [CoreComponent]
})
export class AppModule { }
