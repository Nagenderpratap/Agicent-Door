import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-angel-investor-profile',
  templateUrl: './angel-investor-profile.component.html',
  styleUrls: ['./angel-investor-profile.component.css'],
      encapsulation: ViewEncapsulation.None

})
export class AngelInvestorProfileComponent implements OnInit {


  location_logo = "assets/location_logo.jpg";

  userModel: any;

  can_with: any[] = ['door', 'thedoor', 'thedoor.co'];
  data_src = "";
  data_src2 = "";
  angel_name: string = "N.A";
  angel_username: string = "N.A.";
  angel_about: string = "N.A.";
  address: string = "N.A.";

  angel_personalUrl: any = "";
  social_link_linkedin: any = "";
  social_link_twitter: any = "";
  personal_link = false;
  linkedin = false;
  twitter = false;
  link_icon =false;

  min_check_size: any = "N.A.";
  max_check_size: any = "N.A.";
  sector_least_excited: any = "N.A.";
  sector_most_excited: any = "N.A.";
  tip_founders: any = "N.A.";

  constructor(public router: Router) { }

  ngOnInit() {
        window.scroll(0, 0);
    this.userModel = JSON.parse(localStorage.getItem("userModel"));
    console.log(JSON.stringify(this.userModel) + 'model');

    if (localStorage.getItem("userModel")) {

      // set name
      if (this.userModel.root_user.firstname != null && this.userModel.root_user.firstname) {
        this.angel_name = this.userModel.root_user.firstname;
      }

      // set user name
      if (this.userModel.root_user.username != null && this.userModel.root_user.username) {
        this.angel_username = this.userModel.root_user.username;
      }

      // set user about
      if (this.userModel.root_user.user_about != null && this.userModel.root_user.user_about) {
        this.angel_about = this.userModel.root_user.user_about;
      }

      // set user address
      if (this.userModel.root_user.user_address != null && this.userModel.root_user.user_address) {
        this.address = this.userModel.root_user.user_address;
      }

      // set user personal url
      if (this.userModel.investor_details.personalUrl != null && this.userModel.investor_details.personalUrl) {
        this.angel_personalUrl = "https://" + this.userModel.investor_details.personalUrl;
        this.personal_link = true;
        this.link_icon = true;
      }

       // set user twitter link
       if (this.userModel.root_user.twitter_link != null && this.userModel.root_user.twitter_link) {
        this.social_link_twitter = "https://" + this.userModel.root_user.twitter_link;
        this.twitter = true;
        this.link_icon = true;
      }

       // set user linkdin link
       if (this.userModel.root_user.linkedin_link != null && this.userModel.root_user.linkedin_link) {
        this.social_link_linkedin = "https://" + this.userModel.root_user.linkedin_link;
        this.linkedin = true;
        this.link_icon = true;
      }



      // set user min check size 
      if (this.userModel.investor_company_details.mincheck != null && this.userModel.investor_company_details.mincheck) {
        this.min_check_size = this.userModel.investor_company_details.mincheck;
      }

      // set user max check size
      if (this.userModel.investor_company_details.maxcheck != null && this.userModel.investor_company_details.maxcheck) {
        this.max_check_size = this.userModel.investor_company_details.maxcheck;
      }

      // set sector least excited
      if (this.userModel.investor_details.sector_least_excited != null && this.userModel.investor_details.sector_least_excited) {
        this.sector_least_excited = this.userModel.investor_details.sector_least_excited;
      }

      // set sector most excited
      if (this.userModel.investor_details.sector_most_excited != null && this.userModel.investor_details.sector_most_excited) {
        this.sector_most_excited = this.userModel.investor_details.sector_most_excited;
      }

      // set tips for founders
      if (this.userModel.investor_details.tipsForFounder != null && this.userModel.investor_details.tipsForFounder) {
        this.tip_founders = this.userModel.investor_details.tipsForFounder;
      }

      // set user background image
      if (this.userModel.root_user.user_hero_image != null && this.userModel.root_user.user_hero_image) {
        this.data_src = this.userModel.root_user.user_hero_image;
      }

      // set user profile pic
      if (this.userModel.root_user.user_profile_image != null && this.userModel.root_user.user_profile_image) {
        this.data_src2 = this.userModel.root_user.user_profile_image;
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

  gotoEditProfile() {
    this.router.navigate(['edit-angel']);
  }
}