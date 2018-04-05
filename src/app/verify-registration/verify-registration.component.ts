import { Component, OnInit } from '@angular/core';
import {PassdatabetweenService} from '../services/passdatabetween.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-verify-registration',
  templateUrl: './verify-registration.component.html',
  styleUrls: ['./verify-registration.component.css']
})
export class VerifyRegistrationComponent implements OnInit {

receive_user_verify_response: string;
receive_user_verify_response2: string;

//  receive_user_verify_response_length:Number;
constructor(public passdatabetweenService:PassdatabetweenService,public router:Router) { }
data:string="khan";
 goToHome(){
   console.log('home')
   this.router.navigate(['']);
 }
  ngAfterViewInit(){
  //  this.receive_user_verify_response_length= this.receive_user_verify_response.length;
    // console.log('length:'+this.receive_user_verify_response.length);
  //  console.log('fefefsfsff==='+this.data.length);
  }
  ngOnInit() {
     if(this.passdatabetweenService.getuser_verify_response()){
     this.receive_user_verify_response =  this.passdatabetweenService.getuser_verify_response();
     }
    else{
      this.receive_user_verify_response2="Email has already been sent to your email address."
    }
        // this.receive_user_verify_response2="Email has already been sent to your email address."

  }
}
