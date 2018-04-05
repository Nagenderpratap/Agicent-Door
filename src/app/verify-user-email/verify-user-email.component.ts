import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonapiService } from '../services/commonapi.service';

@Component({
  selector: 'app-verify-user-email',
  templateUrl: './verify-user-email.component.html',
  styleUrls: ['./verify-user-email.component.css'],
  providers: [CommonapiService]
})
export class VerifyUserEmailComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private commonApiService: CommonapiService) { }

  show_button_verify = false;
  show_button_started = false;
  resData: any;
  err_msg: string;
  jwtToken: any;
  userId: any;
  public usertype;
  public jwt: any;
  ngOnInit() {
    // subscribe to router event
     this.err_msg = "We're verifying your email address.";
  }
  ngAfterViewInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.jwtToken = params['token'];
      this.userId = params['user'];

      this.commonApiService.verifyUser(this.jwtToken, this.userId).subscribe(
        response => {
          console.log('res.data-=' + response);

          this.resData = response.json()
          this.usertype = this.resData.user;
          this.jwt = this.resData.jwt;
          if (this.resData.status == 200) {
            this.show_button_verify = false;
            this.show_button_started = true;
            this.err_msg = this.resData.msg;
          }
          else if (this.resData.status == 400) {
            this.show_button_verify = false;
            this.err_msg = this.resData.msg;

          }
        }, err => {

          this.resData = err.json();
          this.err_msg = this.resData.msg;
          this.show_button_verify = false;
        }
      )

    });
  }

  verifyEmail() {

    // this.commonApiService.verifyUser(this.jwtToken, this.userId).subscribe(
    //   response => {
    //     console.log('res.data-=' + response);

    //     this.resData = response.json()
    //     console.log('res.data-=' + this.resData);
    //     console.log('full response=' + response);
    //     console.log('msg' + this.resData.msg);
    //     console.log('user' + this.resData.user);
    //     console.log('jwt' + this.resData.status);
    //     this.usertype = this.resData.user;
    //     this.jwt = this.resData.jwt;
    //     if (this.resData.status == 200) {
    //       this.show_button_verify = false;
    //       this.show_button_started = true;
    //       this.err_msg = this.resData.msg;

    //     }
    //     else if (this.resData.status == 400) {
    //       this.show_button_verify = false;
    //       this.err_msg = this.resData.msg;

    //     }
    //   }, err => {

    //     this.resData = err.json()

    //     this.err_msg = this.resData.msg;
    //     this.show_button_verify = false;
    //   }
    // )

  }
  goToHome() {
    console.log('home');
    this.router.navigate(['']);
  }
  getStarted() {

    if (this.usertype == 1) {
      this.usertype = '';
      this.router.navigate(['founder-register/' + this.jwt]);
    }
    else if (this.usertype == 21) {
      this.usertype = '';
      this.router.navigate(['investor-register/' + this.jwt]);
    }
    else if (this.usertype == 22) {
      this.usertype = '';
      this.router.navigate(['angel-investor-register/' + this.jwt]);

    }

  }
}
