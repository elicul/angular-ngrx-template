import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: './welcome/welcome.module#WelcomeModule',
    canActivate: [AuthGuard]
  }
 ];

@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    ConfirmationDialogComponent
  ],
  providers: [
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class FeaturesModule {}
