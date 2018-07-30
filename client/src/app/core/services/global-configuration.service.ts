import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalConfiguration } from '../../models/global-configuration.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class GlobalConfigurationService extends BaseService {

  constructor(private _http: Http, private _store: Store<fromRoot.State>) {
    super(_http, _store);
  }

  loadGlobalConfiguration(): Observable<GlobalConfiguration> {
    return this._http.get(
      this.endpointConfiguration.GATEWAY_API_URL + this.endpointConfiguration.CONFIGURATION_GET_PATH
      .replace('{HostName}', window.location.hostname))
        .pipe(
            map(response => {
                return response.json();
            })
        );
  }

}
