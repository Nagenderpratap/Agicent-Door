import { Component, OnInit,Directive, forwardRef, 
           Attribute,OnChanges, SimpleChanges,Input, AfterViewInit  } from '@angular/core';
import {Router} from "@angular/router";
import {user} from './user';
import { NG_VALIDATORS,Validator,
           Validators,AbstractControl,ValidatorFn } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common/src/directives/ng_if';
import { error } from 'selenium-webdriver';

declare var $:any;

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  

 ngOnInit() {
  window.scroll(0,0);
  }
 
constructor(public router: Router, private http: Http) {
  
 }


model = new user('','','','');
message: any;
showmsg = false;

 backToHome(){
  this.router.navigate(['']);
  console.log('confirm');
  }

  goToPrivacy(){
    this.router.navigate(['privacy']);
  }

   goToTerms(){
    this.router.navigate(['terms']); 
  }
  
  registerOnMailChimp(){
  console.log(this.model);

  const apiUrl = 'http://52.36.133.191:9000/waitingList';
  const body = {
    name: this.model.name, 
    email: this.model.email, 
    company_name: this.model.company_name, 
    title: this.model.title
  };
  const headers = new Headers(
    {
        'Content-Type': 'application/json'
    });
  this.http.post(apiUrl, body, {headers: headers} ).map((res: Response) => res.json()).subscribe(
                           response => {                        
                              this.showmsg = true;
                              if(response.status == 200){

                              }else{
                             
                              }
                           },error =>{  
                            if(error.status == 400){
                                                    
                            }
                           }
                          
                          );
}

 ngAfterViewInit(){
    // $('input[type=submit]').click(function(){
     
    //   if(this.showing=true){
    //      console.log('iff');
    //    $('.toast').css({"background-color": "red", "font-size": "200%"});
    //    }else{
    //       $('.toast').css({"background-color": "green", "font-size": "200%"});
    //    }
    // });
  }
   
}