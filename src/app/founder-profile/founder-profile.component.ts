import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";

@Component({
  selector: 'app-founder-profile',
  templateUrl: './founder-profile.component.html',
  styleUrls: ['./founder-profile.component.css']
})
export class FounderProfileComponent implements OnInit {

  location_logo = "assets/location_logo.jpg";

  userModel: any;

  can_with: any[] = ['N.A.'];
  need_with: any[] = ['N.A.'];

  data_src = "";
  data_src2 = "";
  data_src_startupLogo = "";

  header: string = "www.twitter.com/"
  founder_name: string = "N.A.";
  title: string = "N.A.";
  company_name: string = "N.A.";
  founder_username: string = "N.A.";
  founder_about: string = "N.A.";
  address: string = "N.A.";
  social_link_twitter: any = "";
  social_link_linkedin: any = "";
  twitter: boolean = false;
  linkedin: boolean = false;

  constructor(private localStorageService: LocalStorageService, public router: Router) { }

  ngOnInit() {
        window.scroll(0, 0);
    this.userModel = JSON.parse(localStorage.getItem("userModel"));

    console.log(JSON.stringify(this.userModel) + "MODELLL!!!");

    if (localStorage.getItem("userModel")) {
      // set first name
      if (this.userModel.root_user.firstname != null && this.userModel.root_user.firstname) {
        this.founder_name = this.userModel.root_user.firstname;
      }

      // set user address
      if (this.userModel.root_user.user_address != null && this.userModel.root_user.user_address) {
        this.address = this.userModel.root_user.user_address;
      }

      // set username
      if (this.userModel.root_user.username != null && this.userModel.root_user.username) {
        this.founder_username = this.userModel.root_user.username;
      }

      // set user about
      if (this.userModel.root_user.user_about != null && this.userModel.root_user.user_about) {
        this.founder_about = this.userModel.root_user.user_about;
      }

      // set user profile image
      if (this.userModel.root_user.user_profile_image != null && this.userModel.root_user.user_profile_image) {
        this.data_src2 = this.userModel.root_user.user_profile_image;
      }

      // set user background image
      if (this.userModel.root_user.user_hero_image != null && this.userModel.root_user.user_hero_image) {
        this.data_src = this.userModel.root_user.user_hero_image;
      }

      // set user startup image
      if (this.userModel.founder_startup_details.logo_url != null && this.userModel.founder_startup_details.logo_url) {
        this.data_src_startupLogo = this.userModel.founder_startup_details.logo_url;
      }

      // set user title
      if (this.userModel.founder_details.founder_title != null && this.userModel.founder_details.founder_title) {
        this.title = this.userModel.founder_details.founder_title;
      }

      // set company name
      if (this.userModel.founder_startup_details.title != null && this.userModel.founder_startup_details.title) {
        this.company_name = this.userModel.founder_startup_details.title;
      }

      // set twitter link
      if (this.userModel.root_user.twitter_link != null && this.userModel.root_user.twitter_link) {
        this.social_link_twitter = "https://twitter.com/" + this.userModel.root_user.twitter_link;
        this.twitter = true;
      }

      // set linkedin link
      if (this.userModel.root_user.linkedin_link != null && this.userModel.root_user.linkedin_link) {
        this.social_link_linkedin = "https://" + this.userModel.root_user.linkedin_link;
        this.linkedin = true;
      }

      // set can help with
      if (this.userModel.founder_details.tags_canhelp != null && this.userModel.founder_details.tags_canhelp) {

        var stringToSplit = this.userModel.founder_details.tags_canhelp;
        if (stringToSplit.indexOf(',') >= 0) {
          this.can_with = stringToSplit.split(",");
        } else {
          this.can_with = [stringToSplit];
        }

      }

      // set need help with
      if (this.userModel.founder_details.tags_needhelp != null && this.userModel.founder_details.tags_needhelp) {

        var stringToSplit = this.userModel.founder_details.tags_needhelp;
        if (stringToSplit.indexOf(',') >= 0) {
          this.need_with = stringToSplit.split(",");
        } else {
          this.need_with = [stringToSplit];
        }

      }
    }
  }

  viewStartupProfile() {
    this.router.navigate(['startup-profile']);
  }
  gotoSearch() {
    this.router.navigate(['search-view']);
  }
  home() {
    this.router.navigate(['']);
  }
  editMyProfile() {
    this.router.navigate(['edit-founder']);
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
  logout() {
    localStorage.removeItem('userModel');
        localStorage.clear();

    this.router.navigate(['']);
  }

  startupClick() {
    this.router.navigate(['startup-profile']);
  }
}