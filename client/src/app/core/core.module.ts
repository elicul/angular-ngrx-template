import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreComponent } from './core.component';
import { EndpointConfigurationService } from './services/endpoint-configuration.service';
import { environment } from '../../environments/environment';
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
import { GlobalConfigurationService } from './services/global-configuration.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { GlobalConfigurationGuard } from './guards/global-configuration.guard';

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
        GlobalConfigurationService,
        GlobalConfigurationGuard,
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
