import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";

@Component({
  selector: 'app-founder',
  templateUrl: './founder.component.html',
  styleUrls: ['./founder.component.css']
})
export class FounderComponent implements OnInit {

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
  
      this.userModel = JSON.parse(localStorage.getItem("searchDataFounder"));
    
      if (localStorage.getItem("searchDataFounder")) {
        // set first name
        if (this.userModel.firstname != null && this.userModel.firstname) {
          this.founder_name = this.userModel.firstname;
        }
  
        // set user address
        if (this.userModel.user_address != null && this.userModel.user_address) {
          this.address = this.userModel.user_address;
        }
  
        // set username
        if (this.userModel.username != null && this.userModel.username) {
          this.founder_username = this.userModel.username;
        }
  
        // set user about
        if (this.userModel.user_about != null && this.userModel.user_about) {
          this.founder_about = this.userModel.user_about;
        }
  
        // set user profile image
        if (this.userModel.user_profile_image != null && this.userModel.user_profile_image) {
          this.data_src2 = this.userModel.user_profile_image;
        }
  
        // set user background image
        if (this.userModel.user_hero_image != null && this.userModel.user_hero_image) {
          this.data_src = this.userModel.user_hero_image;
        }
  
        // set user startup image
        if (this.userModel.logo_url != null && this.userModel.logo_url) {
          this.data_src_startupLogo = this.userModel.logo_url;
        }
  
        // set user title
        if (this.userModel.founder_title != null && this.userModel.founder_title) {
          this.title = this.userModel.founder_title;
        }
  
        // set company name
        if (this.userModel.title != null && this.userModel.title) {
          this.company_name = this.userModel.title;
        }
  
        // set twitter link
        if (this.userModel.twitter_link != null && this.userModel.twitter_link) {
          this.social_link_twitter = "https://twitter.com/" + this.userModel.twitter_link;
          this.twitter = true;
        }
  
        // set linkedin link
        if (this.userModel.linkedin_link != null && this.userModel.linkedin_link) {
          this.social_link_linkedin = "https://" + this.userModel.linkedin_link;
          this.linkedin = true;
        }
  
        // set can help with
        if (this.userModel.tags_canhelp != null && this.userModel.tags_canhelp) {
  
          var stringToSplit = this.userModel.tags_canhelp;
          if (stringToSplit.indexOf(',') >= 0) {
            this.can_with = stringToSplit.split(",");
          } else {
            this.can_with = [stringToSplit];
          }
  
        }
  
        // set need help with
        if (this.userModel.tags_needhelp != null && this.userModel.tags_needhelp) {
  
          var stringToSplit = this.userModel.tags_needhelp;
          if (stringToSplit.indexOf(',') >= 0) {
            this.need_with = stringToSplit.split(",");
          } else {
            this.need_with = [stringToSplit];
          }
  
        }
        console.log(this.userModel.tags_canhelp);
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