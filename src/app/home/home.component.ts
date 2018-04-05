import { Component, Inject, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { RegistrationComponent } from './../registration/registration.component';
import { PassdatabetweenService } from '../services/passdatabetween.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  constructor(public dialog: MatDialog, public router: Router, public passDataBetweenService: PassdatabetweenService) {
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
  registration(usrType: number) {

    this.passDataBetweenService.setUserType(usrType);
    this.router.navigate(['register']);

  }
  login() {

    var userModel = JSON.parse(localStorage.getItem('userModel'));

    if (userModel != null && userModel) {

      if (userModel.root_user.user_type == 1) {
        this.router.navigate(['founder-profile']);
      } else if (userModel.root_user.user_type == 21) {
        this.router.navigate(['investor-profile']);
      } else if (userModel.root_user.user_type == 22) {
        this.router.navigate(['angel-investor-profile']);
      } else {
        this.router.navigate(['login']);
      }

    } else {
      this.router.navigate(['login']);
    }

  }
  signup_form() {
    this.router.navigate(['signup-form']);

  }

  ngOnInit() {
    window.scroll(0, 0);

  }
  printOpening() {
    console.log("opened!");
  }

  printClosing() {
    console.log("closed!");
  }

  select() {
    console.log("selected");
  }

  nonAngelInvestor() {

    console.log("clicked no");
    this.passDataBetweenService.setUserType(21);
    this.router.navigate(['register']);
  }

  angelInvestor() {

    console.log("clicked yes");
    this.passDataBetweenService.setUserType(22);
    this.router.navigate(['register']);
  }

}
