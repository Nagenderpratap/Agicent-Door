import { Injectable } from '@angular/core';

@Injectable()
export class PassdatabetweenService {

  constructor() { }

  usrType: number;
  user_verify_response:string;

  getUserType(){
    return this.usrType;
  }
  setUserType(userType){
    this.usrType = userType;
  }

  getuser_verify_response(){
    return this.user_verify_response;
  }
  setuser_verify_response(verify_response){
    this.user_verify_response = verify_response;
  }

}
