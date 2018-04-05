import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../utils/apiendpoints';
import { Constants } from '../utils/Constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService {

  url: string;

  constructor(private http: Http) { }

  register(registerDetails) {

    this.url = Constants.baseUrl + ApiEndPoints.signup;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, registerDetails, options).map(this.extractData);
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
