import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core.reducer';
import { EndpointConfigurationEffects } from './endpoint-configuration/endpoint-configuration.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('endpointConfiguration', reducers.endpointConfiguration),
    EffectsModule.forFeature([EndpointConfigurationEffects])
  ],
  providers: [EndpointConfigurationEffects]
})
export class CoreStoreModule {}
