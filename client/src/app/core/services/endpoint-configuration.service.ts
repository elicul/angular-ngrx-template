import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EndpointConfiguration } from '../../models/endpoint-configuration.model';
import { Observable } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

@Injectable()
export class EndpointConfigurationService {
    constructor(private http: Http) { }

    loadEndpointConfiguration(url: string): Observable<EndpointConfiguration> {
        return this.http.get(url)
            .pipe(
                map(response => {
                    return response.json();
                })
            );
    }
}
