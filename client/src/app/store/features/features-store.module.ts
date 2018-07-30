import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// import { reducers } from './features.reducer';

@NgModule({
  imports: [
    CommonModule
    // include storeModule => StoreModule.forFeature('toolbox', reducers.toolbox)
    // include effects module => EffectsModule.forFeature([ToolboxEffects, WorkflowEffects])
  ],
  providers: [
    // include services and effects
  ]
})
export class FeaturesStoreModule {}
