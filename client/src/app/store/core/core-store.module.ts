import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core.reducer';
import { EndpointConfigurationEffects } from './endpoint-configuration/endpoint-configuration.effects';
import { GlobalConfigurationEffects } from './global-configuration/global-configuration.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('configuration', reducers.configuration),
    StoreModule.forFeature('globalConstants', reducers.globalConstants),
    EffectsModule.forFeature([EndpointConfigurationEffects, GlobalConfigurationEffects])
  ],
  providers: [EndpointConfigurationEffects, GlobalConfigurationEffects]
})
export class CoreStoreModule {}
