import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent implements OnInit {

  location_logo = "assets/location_logo.jpg";

  userModel: any;

  data_src = "";
  data_src2 = "";
  data_src_organization = "";

  Investor_title: any = "N.A."
  investor_username: any = "N.A.";
  investor_about: any = "N.A.";
  address: string = "N.A.";
  investor_personalUrl: any = ""
  sector_least_excited: any = "N.A.";
  sector_most_excited: any = "N.A.";
  tip_founders: any = "N.A";
  Investor_name: any = "N.A";
  title: any = "N.A";
  company_name: any = "N.A";
  personal_link: boolean = false;
  linkedin: boolean = false;
  twitter: boolean = false;


  constructor(public router: Router) { }

  ngOnInit() {

    this.userModel = JSON.parse(localStorage.getItem("searchDataInvestor"));

    if (localStorage.getItem("searchDataInvestor")) {

      // set user title
      if (this.userModel.investor_title != null && this.userModel.investor_title) {
        this.Investor_title = this.userModel.investor_title;
      }

      // set user first name
      if (this.userModel.firstname != null && this.userModel.firstname) {
        this.Investor_name = this.userModel.firstname;
      }

      // set user address
      if (this.userModel.user_address != null && this.userModel.user_address) {
        this.address = this.userModel.user_address;
      }

      // set username
      if (this.userModel.username) {
        this.investor_username = this.userModel.username;
      }

      // set user about
      if (this.userModel.user_about != null && this.userModel.user_about) {
        this.investor_about = this.userModel.user_about;
      }

      // set user profile image
      if (this.userModel.user_profile_image != null && this.userModel.user_profile_image) {
        this.data_src2 = this.userModel.user_profile_image;
      }

      // set company logo
      if (this.userModel.logo_url != null && this.userModel.logo_url) {
        this.data_src_organization = this.userModel.logo_url;
      }

      // set comapny name
      if (this.userModel.title != null && this.userModel.title) {
        this.company_name = this.userModel.title;
      }

      // set least TITLE 
      if (this.userModel.investor_title != null && this.userModel.investor_title) {
        this.title = this.userModel.investor_title;
      }

      // set user profile image
      if (this.userModel.user_profile_image != null && this.userModel.user_profile_image) {
        this.data_src2 = this.userModel.user_profile_image;
      }

      // set user background image
      if (this.userModel.user_hero_image != null && this.userModel.user_hero_image) {
        this.data_src = this.userModel.user_hero_image;
      }

      // set user personal url
      if (this.userModel.personalUrl != null && this.userModel.personalUrl) {
        this.investor_personalUrl = "https://" + this.userModel.personalUrl;
        this.personal_link = true;
      }

      // set tip for founder
      if (this.userModel.tipsForFounder != null && this.userModel.tipsForFounder) {
        this.tip_founders = this.userModel.tipsForFounder;
      }

      // set least excited area
      if (this.userModel.sector_least_excited != null && this.userModel.sector_least_excited) {
        this.sector_least_excited = this.userModel.sector_least_excited;
      }

      // set most excited area
      if (this.userModel.sector_most_excited != null && this.userModel.sector_most_excited) {
        this.sector_most_excited = this.userModel.sector_most_excited;
      }
    }

  }
 
  home() {
    this.router.navigate(['']);

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
  
}