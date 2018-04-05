import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-angel',
  templateUrl: './angel.component.html',
  styleUrls: ['./angel.component.css']
})
export class AngelComponent implements OnInit {
  location_logo = "assets/location_logo.jpg";

  userModel: any;

  can_with: any[] = ['door', 'thedoor', 'thedoor.co'];
  data_src = "";
  data_src2 = "";
  angel_name: string = "N.A";
  angel_username: string = "N.A.";
  angel_about: string = "N.A.";
  address: string = "N.A.";
  angel_personalUrl: any = ""
  min_check_size: any = "N.A.";
  max_check_size: any = "N.A.";
  sector_least_excited: any = "N.A.";
  sector_most_excited: any = "N.A.";
  persnl_url_show: boolean = false;
  tip_founders: any = "N.A.";

   social_link_linkedin: any = "";
  social_link_twitter: any = "";
  personal_link = false;
  linkedin = false;
  twitter = false;
  link_icon =false;
  
  constructor(public router: Router) { }

  ngOnInit() {

    this.userModel = JSON.parse(localStorage.getItem("searchDataInvestorAngel"));
    console.log(JSON.stringify(this.userModel) + 'model');

    if (localStorage.getItem("searchDataInvestorAngel")) {

      // set name
      if (this.userModel.firstname != null && this.userModel.firstname) {
        this.angel_name = this.userModel.firstname;
      }

      // set user name
      if (this.userModel.username != null && this.userModel.username) {
        this.angel_username = this.userModel.username;
      }

      // set user about
      if (this.userModel.user_about != null && this.userModel.user_about) {
        this.angel_about = this.userModel.user_about;
      }

      // set user address
      if (this.userModel.user_address != null && this.userModel.user_address) {
        this.address = this.userModel.user_address;
      }


 // set user personal url
      if (this.userModel.personalUrl != null && this.userModel.personalUrl) {
        this.angel_personalUrl = "https://" + this.userModel.personalUrl;
        this.personal_link = true;
        this.link_icon = true;
      }

       // set user twitter link
       if (this.userModel.twitter_link != null && this.userModel.twitter_link) {
        this.social_link_twitter = "https://" + this.userModel.twitter_link;
        this.twitter = true;
        this.link_icon = true;
      }

       // set user linkdin link
       if (this.userModel.linkedin_link != null && this.userModel.linkedin_link) {
        this.social_link_linkedin = "https://" + this.userModel.linkedin_link;
        this.linkedin = true;
        this.link_icon = true;
      }

      // set user min check size 
      if (this.userModel.mincheck != null && this.userModel.mincheck) {
        this.min_check_size = this.userModel.mincheck;
      }

      // set user max check size
      if (this.userModel.maxcheck != null && this.userModel.maxcheck) {
        this.max_check_size = this.userModel.maxcheck;
      }

      // set sector least excited
      if (this.userModel.sector_least_excited != null && this.userModel.sector_least_excited) {
        this.sector_least_excited = this.userModel.sector_least_excited;
      }

      // set sector most excited
      if (this.userModel.sector_most_excited != null && this.userModel.sector_most_excited) {
        this.sector_most_excited = this.userModel.sector_most_excited;
      }

      // set tips for founders
      if (this.userModel.tipsForFounder != null && this.userModel.tipsForFounder) {
        this.tip_founders = this.userModel.tipsForFounder;
      }

      // set user background image
      if (this.userModel.user_hero_image != null && this.userModel.user_hero_image) {
        this.data_src = this.userModel.user_hero_image;
      }

      // set user profile pic
      if (this.userModel.user_profile_image != null && this.userModel.user_profile_image) {
        this.data_src2 = this.userModel.user_profile_image;
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
