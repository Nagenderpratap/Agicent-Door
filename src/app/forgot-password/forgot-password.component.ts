import { Component,  OnInit, AfterViewInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { Ng2DeviceService } from 'ng2-device-detector';
import { ForgotpasswordService } from '../services/forgotpassword.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
    providers: [ForgotpasswordService]

})
export class ForgotPasswordComponent implements OnInit {
  public email: string;
  browser: any = null;
  os: any = null;
  constructor(public toastr: ToastsManager, public vcr: ViewContainerRef,public router: Router, private deviceService: Ng2DeviceService,public forgotPasswordService: ForgotpasswordService) { 
     this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    window.scroll(0, 0);
  }
  goToHome() {
    this.router.navigate(['']);
  }
  reset_password() {
     console.log('email=' + this.email);
         console.log('email=' +this.deviceService.getDeviceInfo().browser,);

   const body = {
      email: this.email,
      browser: this.deviceService.getDeviceInfo().browser,
      os:this.deviceService.getDeviceInfo().os
    };
console.log(body);
    this.forgotPasswordService.forgotData(body).subscribe(
      response => {
     console.log(response);
        if (response.status == 200) {
          console.log('login');
         
          this.showSuccess("A link for reset password is sent to your email.Please check your email to reset your password!", "Success!");
        }
        else if (response.status == 400) {
          this.showError(response, 'pops!');
          
        }
       
      },err=>{

        console.log(err);
          this.showError(err._body, 'Oops!');
        
      }
    );


  }
   showSuccess(message, header) {
    this.toastr.success(message, header);
  }

  showError(message, header) {
    this.toastr.error(message, header);
  }
 
}
