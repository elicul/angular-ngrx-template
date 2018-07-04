import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  { path: '', loadChildren: './welcome/welcome.module#WelcomeModule', canActivate: [AuthGuard] }
 ];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
  ],
  providers: [
  ]
})
export class FeaturesModule {}
