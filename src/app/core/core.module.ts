import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreComponent } from './core.component';
import { EndpointConfigurationService } from './endpoint-configuration/endpoint-configuration.service';
import { environment } from '../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './utils/token.interceptor';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './core.reducer';
import { EndpointConfigurationEffects } from './endpoint-configuration/endpoint-configuration.effects';
import { CacheHandlerService } from './utils/cache-handler.service';
import { ErrorInterceptor } from './utils/error.interceptor';
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

export function configServiceFactory(configService: EndpointConfigurationService): any {
  return () => configService.loadEndpointConfiguration(environment.endpointConfigFile);
}

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    RouterModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    SimpleNotificationsModule.forRoot(),
    StoreModule.forFeature('configuration', reducers.configuration),
    EffectsModule.forFeature([EndpointConfigurationEffects])
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
