import { Injectable } from '@angular/core';

@Injectable()
export class CacheHandlerService {

  //#region User
  getUserToken(): string {
    return window.localStorage.getItem('UserToken');
  }
  setUserToken(userToken: string): void {
    if (userToken != null && userToken !== '')
      window.localStorage.setItem('UserToken', userToken);
  }
  removeUserToken(): void {
    return window.localStorage.removeItem('UserToken');
  }
  //#endregion

}
