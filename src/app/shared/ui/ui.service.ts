import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class UIService {

  constructor(private snackbar: MatSnackBar, private notificationsService: NotificationsService) {}

  showSnackbar(message, action, duration): void {
    this.snackbar.open(message, action, {duration});
  }

  showNotification(type: string, title: string, content: string): void {
    this.notificationsService.create(title, content, type, {
      showProgressBar: true,
      pauseOnHover: true,
      timeOut: 3000,
      animate: 'fromRight'
    });
  }
}
