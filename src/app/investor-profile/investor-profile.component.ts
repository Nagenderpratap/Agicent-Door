import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.css']
})
export class InvestorProfileComponent implements OnInit {

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
        window.scroll(0, 0);
    this.userModel = JSON.parse(localStorage.getItem("userModel"));

    if (localStorage.getItem("userModel")) {

      // set user title
      if (this.userModel.investor_details.investor_title != null && this.userModel.investor_details.investor_title) {
        this.Investor_title = this.userModel.investor_details.investor_title;
      }

      // set user first name
      if (this.userModel.root_user.firstname != null && this.userModel.root_user.firstname) {
        this.Investor_name = this.userModel.root_user.firstname;
      }

      // set user address
      if (this.userModel.root_user.user_address != null && this.userModel.root_user.user_address) {
        this.address = this.userModel.root_user.user_address;
      }

      // set username
      if (this.userModel.root_user.username) {
        this.investor_username = this.userModel.root_user.username;
      }

      // set user about
      if (this.userModel.root_user.user_about != null && this.userModel.root_user.user_about) {
        this.investor_about = this.userModel.root_user.user_about;
      }

      // set user profile image
      if (this.userModel.root_user.user_profile_image != null && this.userModel.root_user.user_profile_image) {
        this.data_src2 = this.userModel.root_user.user_profile_image;
      }

      // set company logo
      if (this.userModel.investor_company_details.logo_url != null && this.userModel.investor_company_details.logo_url) {
        this.data_src_organization = this.userModel.investor_company_details.logo_url;
      }

      // set comapny name
      if (this.userModel.investor_company_details.title != null && this.userModel.investor_company_details.title) {
        this.company_name = this.userModel.investor_company_details.title;
      }

      // set least TITLE 
      if (this.userModel.investor_details.investor_title != null && this.userModel.investor_details.investor_title) {
        this.title = this.userModel.investor_details.investor_title;
      }

      // set user profile image
      if (this.userModel.root_user.user_profile_image != null && this.userModel.root_user.user_profile_image) {
        this.data_src2 = this.userModel.root_user.user_profile_image;
      }

      // set user background image
      if (this.userModel.root_user.user_hero_image != null && this.userModel.root_user.user_hero_image) {
        this.data_src = this.userModel.root_user.user_hero_image;
      }

      // set user personal url
      if (this.userModel.investor_details.personalUrl != null && this.userModel.investor_details.personalUrl) {
        this.investor_personalUrl = "https://" + this.userModel.investor_details.personalUrl;
        this.personal_link = true;
      }

      // set tip for founder
      if (this.userModel.investor_details.tipsForFounder != null && this.userModel.investor_details.tipsForFounder) {
        this.tip_founders = this.userModel.investor_details.tipsForFounder;
      }

      // set least excited area
      if (this.userModel.investor_details.sector_least_excited != null && this.userModel.investor_details.sector_least_excited) {
        this.sector_least_excited = this.userModel.investor_details.sector_least_excited;
      }

      // set most excited area
      if (this.userModel.investor_details.sector_most_excited != null && this.userModel.investor_details.sector_most_excited) {
        this.sector_most_excited = this.userModel.investor_details.sector_most_excited;
      }
    }

  }
  viewOrganizationProfile() {
    this.router.navigate(['organization-profile']);
  }
  gotoSearch() {
    this.router.navigate(['search-view']);
  }
  home() {
    this.router.navigate(['']);
  }
  gotoEditProfile() {
    this.router.navigate(['edit-investor']);
  }
  about() {
    this.router.navigate(['about']);
  }
  privacy() {
    this.router.navigate(['privacy']);
  }
  terms() {
    this.router.navigate(['terms']);
  }
  logout() {
    localStorage.removeItem('userModel');
        localStorage.clear();

    this.router.navigate(['']);
  }
  companyClick() {
    this.router.navigate(['organization-profile']);
  }
}