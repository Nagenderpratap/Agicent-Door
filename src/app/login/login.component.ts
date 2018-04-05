import { Component, OnInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from '../services/login.service';
import { UserLogin } from './user_login';
import { AuthService } from "angular2-social-login";
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  busy: Subscription;
  resData: any;
  model = new UserLogin('', '');
  public linkedIn_user;
    public loading = false;

  constructor(private localStorageService: LocalStorageService, public toastr: ToastsManager,
    public vcr: ViewContainerRef, public http: Http,
    public auth: AuthService, public router: Router, public loginService: LoginService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    window.scroll(0, 0);

    // this.busy = this.http.get('https://httpbin.org/delay/3').subscribe();

  }

  ngAfterViewInit() {
    this.auth.logout();
  }


  goToHome() {
    this.router.navigate(['']);
  }
  goToPrivacy() {
    this.router.navigate(['privacy']);

  }
  goToTerms() {
    this.router.navigate(['terms']);

  }

  loginAttempt() {

    const body = {
      email: this.model.email,
      password: this.model.password,
      login_type: 1
    };
        this.loading = true;
    this.loginService.login(body).subscribe(
      response => {
        this.loading = false;

        console.log(response);

        if (response.status == 200) {

          var res = response.json();
          var token = res.root_user.jwt_token;

          // check profile completion
          if (res.root_user.profile_completion == "25%") {

            if (res.root_user.user_type == 1) {
              this.showSuccess(res.msg, "Success!");
              this.router.navigate(['founder-register/' + token]);
            }
            else if (res.root_user.user_type == 21) {
              this.showSuccess(res.msg, "Success!");
              this.router.navigate(['investor-register/' + token]);
            }
            else if (res.root_user.user_type == 22) {
              this.router.navigate(['angel-investor-register/' + token]);
              this.showSuccess(res.msg, "Success!");
            }
            else {
              this.showError("Sorry!", "Unable to found user!");
            }

          }
          // Angel full registration completed move to angel profile
          else if (res.root_user.user_type == 22 && res.root_user.profile_completion == "100%") {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.parse(localStorage.getItem("userModel")));

            this.router.navigate(['angel-investor-profile']);

          }
          // founder personal registration completed but not regsited startup or joined startup
          else if (res.root_user.profile_completion == "50%" && res.root_user.user_type == 1) {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.stringify(localStorage.getItem("userModel")));

            this.router.navigate(['founder-profile']);

          }
          // investor personal registration completed but not regsited organization or joined any organization
          else if (res.root_user.profile_completion == "50%" && res.root_user.user_type == 21) {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.stringify(localStorage.getItem("userModel")));

            this.router.navigate(['investor-profile']);

          }
          // founder personal registration completed and completed his startup profile also(or jioned existing startup)
          else if (res.root_user.profile_completion == "100%" && res.root_user.user_type == 1) {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.stringify(localStorage.getItem("userModel")));

            this.router.navigate(['founder-profile']);

          }
          // investor personal registration completed and completed his organization profile also(or jioned existing organization)
          else if (res.root_user.profile_completion == "100%" && res.root_user.user_type == 21) {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.stringify(localStorage.getItem("userModel")));

            this.router.navigate(['investor-profile']);

          }

        }
        else if (response.status == 400) {
          this.showError(res.msg, 'Oops!');
        }

      }, error => {
        this.loading = false;
        console.log(error);

        this.resData = error.json();
        this.showError(this.resData.msg, 'Oops!');
      }
    );

  }

  signInWith_LinkedIn(provider) {
    console.log('linkedin');
    this.auth.login(provider).subscribe(
      (data) => {

        this.linkedIn_user = data;

        this.auth.logout();
        data = null;

        const body = {
          email: this.linkedIn_user.email,
          password: this.linkedIn_user.uid,
          login_type: 2

        };
                this.loading = true;
        this.loginService.login(body).subscribe(
          response => {
                    this.loading = false;
            var res = response.json();

            if (response.status == 200) {

              var res = response.json();
          var token = res.root_user.jwt_token;

          // check profile completion
          if (res.root_user.profile_completion == "25%") {

            if (res.root_user.user_type == 1) {
              this.showSuccess(res.msg, "Success!");
              this.router.navigate(['founder-register/' + token]);
            }
            else if (res.root_user.user_type == 21) {
              this.showSuccess(res.msg, "Success!");
              this.router.navigate(['investor-register/' + token]);
            }
            else if (res.root_user.user_type == 22) {
              this.router.navigate(['angel-investor-register/' + token]);
              this.showSuccess(res.msg, "Success!");
            }
            else {
              this.showError("Sorry!", "Unable to found user!");
            }

          }
          // Angel full registration completed move to angel profile
          else if (res.root_user.user_type == 22 && res.root_user.profile_completion == "100%") {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.parse(localStorage.getItem("userModel")).user.email);

            this.router.navigate(['angel-investor-profile']);

          }
          // founder personal registration completed but not regsited startup or joined startup
          else if (res.root_user.profile_completion == "50%" && res.root_user.user_type == 1) {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.stringify(localStorage.getItem("userModel")));

            this.router.navigate(['founder-profile']);

          }
          // investor personal registration completed but not regsited organization or joined any organization
          else if (res.root_user.profile_completion == "50%" && res.root_user.user_type == 21) {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.stringify(localStorage.getItem("userModel")));

            this.router.navigate(['investor-profile']);

          }
          // founder personal registration completed and completed his startup profile also(or jioned existing startup)
          else if (res.root_user.profile_completion == "100%" && res.root_user.user_type == 1) {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.stringify(localStorage.getItem("userModel")));

            this.router.navigate(['founder-profile']);

          }
          // investor personal registration completed and completed his organization profile also(or jioned existing organization)
          else if (res.root_user.profile_completion == "100%" && res.root_user.user_type == 21) {

            localStorage.setItem("userModel", JSON.stringify(res));
            console.log(JSON.stringify(localStorage.getItem("userModel")));

            this.router.navigate(['investor-profile']);

          }


            }
            else if (response.status == 400) {
              this.showError(res.msg, 'Oops!');
            }

          }, error => {
        this.loading = false;
            console.log(error);

            this.resData = error.json();
            this.showError(this.resData.msg, 'Oops!');
          }
        );
      }
    );
  }

  showSuccess(message, header) {
    this.toastr.success(message, header);
  }

  showError(message, header) {
    this.toastr.error(message, header);
  }
  forgot_password(){
    this.router.navigate(['forgot-password']);
  }
}