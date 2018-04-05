import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../utils/apiendpoints';
import { Constants } from '../utils/Constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

  url: string;
  
  constructor(private http: Http) {}

  login(loginDetails) {
    
        this.url = Constants.baseUrl + ApiEndPoints.login;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, loginDetails, options);
      }

      private extractData(res: Response) {
        return res.json();
      }

      private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
      }

      private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
      }

}
