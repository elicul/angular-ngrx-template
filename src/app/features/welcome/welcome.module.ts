import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { SharedModule } from '../../shared/shared.module';
import { NotificationsService } from 'angular2-notifications';

export const ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }
];

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    WelcomeComponent
  ],
  providers: [
    NotificationsService
  ]
})
export class WelcomeModule {}
