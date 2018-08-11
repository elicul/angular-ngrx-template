import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreComponent } from './core.component';
import { EndpointConfigurationService } from './services/endpoint-configuration.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CacheHandlerService } from './services/cache-handler.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { UIService } from '../shared/ui/ui.service';
import { HeaderComponent } from './navigation/header/header.component';
import { SitenavComponent } from './navigation/sitenav/sitenav.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

export const COMPONENTS = [
  CoreComponent,
  HeaderComponent,
  SitenavComponent,
  FooterComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: COMPONENTS
})
export class CoreModule {
  static forRoot(): any {
    return {
      ngModule: CoreModule,
      providers: [
        EndpointConfigurationService,
        CacheHandlerService,
        UIService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ]
    };
  }
}
