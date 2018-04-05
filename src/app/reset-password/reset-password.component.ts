import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonapiService } from '../services/commonapi.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
declare var $: any;


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    public passwords: any;
    cpassword: any;
    form: FormGroup;

    public password: string;
    constructor(private formBuilder: FormBuilder, public toastr: ToastsManager, public vcr: ViewContainerRef, private router: Router, private activatedRoute: ActivatedRoute, private commonApiService: CommonapiService) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    resData: Object;
    err_msg: string;

    ngOnInit() {

        window.scroll(0, 0);
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
    validation() {


    }

    reset() {
        var x = this.password;
        var y = this.passwords;
        console.log(JSON.stringify(x) + 'token' + y)
        if (x == y) {
            this.activatedRoute.params.subscribe((params: Params) => {
                let jwtToken = params['token'];
                const password = this.password;
                const body = {
                    password: this.password
                };
                console.log(jwtToken);
                console.log(password);
                this.commonApiService.resetpass(jwtToken, body).subscribe(
                    response => {
                        this.resData = response;
                        console.log(response);
                        this.showSuccess(response._body, "Success!");
                    }, err => {
                        this.showError(err._body, 'Oops!');

                    }
                );
            })
        }
        else {
            this.showError("Passwords must be same!", 'Sorry');
        }

    }



    showSuccess(message, header) {
        this.toastr.success(message, header);
    }

    showError(message, header) {
        this.toastr.error(message, header);
    }
    goToHome() {
    this.router.navigate(['']);
  }

}
