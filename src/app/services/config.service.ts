import { Inject, Injectable } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import { RouteConfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) {
    console.log('ConfigService Intializied');
    console.log(this.configToken);
   }
}
