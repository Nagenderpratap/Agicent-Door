import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../utils/apiendpoints';
import { Constants } from '../utils/Constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommonapiService {

  url: string;

  constructor(private http: Http) { }

  verifyUser(token, userId) {
    console.log('token nd id' + token + '' + userId);
    this.url = this.generateCompleteVerifyUrl(token, userId);
    return this.http.get(this.url);
  }

  generateCompleteVerifyUrl(token, userId) {
    return Constants.baseUrl + ApiEndPoints.verifyEmail + '?token=' + token + '&user=' + userId;
  }

  resetpass(token, password) {
    this.url = Constants.baseUrl + ApiEndPoints.resetpassword;
    console.log(password + 'BODY');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token);
    console.log(JSON.stringify(headers) + 'HEADERS');
    let options = new RequestOptions({ headers: headers });
    console.log(options);
    return this.http.post(this.url, password, options);
  }
  update(token, body) {
    console.log(body);
    this.url = Constants.baseUrl + ApiEndPoints.updateFounderProfile
    let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options);
  }

   getUsers(token) {
     this.url = Constants.baseUrl + ApiEndPoints.getUniqueUsers;
     let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .map((res:Response)=>res.json())
   }
    getProfiles(token) {
     this.url = Constants.baseUrl + ApiEndPoints.getprofiles;
     let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .map((res:Response)=>res.json())
   }
  updateAngel(token, body) {
 console.log(body);
 this.url = Constants.baseUrl + ApiEndPoints.updateangelprofile
 let headers = new Headers({});
 headers.append('Authorization',token);
 let options = new RequestOptions({ headers: headers });
 return this.http.post(this.url, body, options)
 }
update1(token, body) {
 console.log(body);
 this.url = Constants.baseUrl + ApiEndPoints.updateStartupProfile
 let headers = new Headers({});
 headers.append('Authorization', token);
 let options = new RequestOptions({ headers: headers });
 return this.http.post(this.url, body, options);
 }

 getPastInvestors(token) {
     this.url = Constants.baseUrl + ApiEndPoints.pastinvestors;
     let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .map((res:Response)=>res.json())
   }

 getPastInvestments(token) {
     this.url = Constants.baseUrl + ApiEndPoints.pastinvestments;
     let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .map((res:Response)=>res.json())
   }  

   investor(token, body) {
    console.log(body);
    this.url = Constants.baseUrl + ApiEndPoints.updateInvestorProfile;
    let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options);
  }

  investor1(token, body) {
    console.log(body);
    this.url = Constants.baseUrl + ApiEndPoints.updateOrganizationProfile;
    let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options);
  }

   joinStartup(token, body) {
    console.log(body);
    this.url = Constants.baseUrl + ApiEndPoints.joinStartup;
    let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options);
  }

  joinOrganization(token, body) {
    console.log(body);
    this.url = Constants.baseUrl + ApiEndPoints.joinOrganization;
    let headers = new Headers({});
    headers.append('Authorization', token);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, body, options);
  }
  getSearchData(body) {

 var userModel = JSON.parse(localStorage.getItem("userModel"));
 var token = userModel.root_user.jwt_token;
 this.url = Constants.baseUrl + ApiEndPoints.searchbykeyword;
 let headers = new Headers({});
 headers.append('Authorization', token);
 let options = new RequestOptions({ headers: headers });
 return this.http.post(this.url, body, options);
 }
}