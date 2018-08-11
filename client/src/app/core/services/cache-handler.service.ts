import { Injectable } from '@angular/core';

@Injectable()
export class CacheHandlerService {

  //#region User
  getUserToken(): string {
    return window.localStorage.getItem('UserToken');
  }
  setUserToken(userToken: string): void {
    if (userToken)
      if (userToken !== '')
        window.localStorage.setItem('UserToken', userToken);
  }
  removeUserToken(): void {
    return window.localStorage.removeItem('UserToken');
  }
  //#endregion

  //#region Template
  getTemplate(): string {
    return window.localStorage.getItem('Template');
  }
  setTemplate(template: string): void {
    if (template)
      if (template !== '')
        window.localStorage.setItem('Template', template);
  }
  removeTemplate(): void {
    return window.localStorage.removeItem('Template');
  }
  //#endregion
}
