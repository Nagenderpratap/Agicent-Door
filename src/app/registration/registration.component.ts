import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { UserRegistration } from './user_registration';
import { PassdatabetweenService } from '../services/passdatabetween.service';
import { RegisterService } from '../services/register.service';
import { AuthService } from "angular2-social-login";

import {
  NG_VALIDATORS, Validator,
  Validators, AbstractControl, ValidatorFn,FormGroup
} from '@angular/forms';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { ReCaptchaComponent } from 'angular2-recaptcha';

declare var $: any;
@Component({
  selector: 'app-signup-trial',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegisterService]
})
export class RegistrationComponent implements OnInit {

  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  constructor(public toastr: ToastsManager, public vcr: ViewContainerRef,
    public auth: AuthService, public router: Router,
    public passdatabetweenService: PassdatabetweenService,
    public registerService: RegisterService) {
    this.toastr.setRootViewContainerRef(vcr);

  }
    public loading = false;
  userType: string;
  usrType: number=1;
  resData: Object;
  public linkedIn_user;
  LinkedIn_user_email: string;
  LinkedIn_user_name: string;
  verify_response: string;
  captcha_response: string;
  model = new UserRegistration('', '', '', '');
  myform: FormGroup;
  //  token = this.captcha.getResponse();
  handleCorrectCaptcha(data) {
   this.captcha_response=data;
  //  console.log(this.captcha_response);
  }

  ngOnInit() {
    window.scroll(0, 0);

    this.auth.logout();

    if(this.passdatabetweenService.getUserType()){
    this.usrType = this.passdatabetweenService.getUserType();
    }
    if (this.usrType == 1) {
      this.userType = "Founder Registration";
    } else if (this.usrType == 21) {
      this.userType = "Investor Registration";
    }else if (this.usrType == 22) {
      this.userType = "Angel Investor Registration";
    } else {
      this.userType = "Founder Registration";
    }

  }
  about() {
    this.router.navigate(['about']);
    console.log('yo');
  }
  privacy() {
    this.router.navigate(['privacy']);

  }
  terms() {
    this.router.navigate(['terms']);

  }
  home() {
    this.router.navigate(['']);
  }
  login() {
    this.router.navigate(['login']);

  }
  ngAfterViewInit() {

    this.auth.logout();

    $('input[type=password]').keyup(function () {
      console.log('uu');
      // keyup code here
      var pswd = $(this).val();
      //validate the length
      if (pswd.length < 8) {
        $('#length').removeClass('valid').addClass('invalid');
      } else {
        $('#length').removeClass('invalid').addClass('valid');
      }
      //validate letter
      if (pswd.match(/[A-z]/)) {
        $('#letter').removeClass('invalid').addClass('valid');
      } else {
        $('#letter').removeClass('valid').addClass('invalid');
      }

      //validate capital letter
      if (pswd.match(/[A-Z]/)) {
        $('#capital').removeClass('invalid').addClass('valid');
      } else {
        $('#capital').removeClass('valid').addClass('invalid');
      }

      //validate number
      if (pswd.match(/\d/)) {
        $('#number').removeClass('invalid').addClass('valid');
      } else {
        $('#number').removeClass('valid').addClass('invalid');
      }
      if ((pswd.length > 8) && (pswd.match(/\d/)) && (pswd.match(/[A-Z]/)) && (pswd.match(/[A-z]/))) {
        $('.text1').hide();
      } else {
        $('.text1').show();
      }

    }

    ).focus(function () {
      $('.text1').show();
    })
      .blur(function () {
        $('.text1').hide();
      });



  }

  

  submit_register() {
    if(this.captcha_response != null){
     
      const body = {
      name: this.model.name,
      email: this.model.email,
      phone: this.model.phone,
      password: this.model.password,
      user_type: this.usrType,
      login_type: 1

    };
        this.loading = true;
    this.registerService.register(body).subscribe(
      response => {
        this.loading = false;
        if (response.status == 200) {
          this.passdatabetweenService.setuser_verify_response(response.msg);
          this.router.navigate(['verify-success']);
        }
        else if (response.status == 400) {
          this.showError(response.msg, 'Oops!');
        }

        else {
        this.loading = false;

        }


      }
    );
    this.model.name='';
     this.model.email='';
      this.model.phone='';
       this.model.password='';
    }
     else{
       this.showError('Captcha validation not done!','Error!');
      
    }
     //this.myform.reset();

  }
  

  

  signUpWith_LinkedIn(provider) {
    console.log('linkedin');
    this.auth.login(provider).subscribe(
      response => {
        console.log(response);
        this.linkedIn_user = response;
        console.log('uid=' + this.linkedIn_user.uid);

        const body = {
          name: this.linkedIn_user.name,
          email: this.linkedIn_user.email,
          phone: this.model.phone,
          password: this.linkedIn_user.uid,
          user_type: this.usrType,
          login_type: 2

        };
                this.loading = true;
        this.registerService.register(body).subscribe(
          response => {
                    this.loading = false;
            // alert('error!')
            //     alert('res'+response.status);
            //                     alert('res'+response.msg);
            if (response.status == 200) {
                  // alert('error response')
              this.passdatabetweenService.setuser_verify_response(response.msg);
              this.router.navigate(['verify-success']);
            }
            else if (response.status == 400) {
                          // alert('error oops!')

              this.showError(response.msg, 'Oops!');
            }

            else {
        this.loading = false;
            }
          }
        );
      }
    )

  }
  showSuccess(message, header) {
    this.toastr.success(message, header);
  }

  showError(message, header) {
    this.toastr.error(message, header);
  }

}

