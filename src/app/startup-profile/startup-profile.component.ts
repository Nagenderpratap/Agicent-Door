import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PastInvestors } from './pastinvestors';
import { Founders } from './founders';

@Component({
  selector: 'app-startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrls: ['./startup-profile.component.css']
})
export class StartupProfileComponent implements OnInit {

  userModel: any;
  location_logo = "assets/location_logo.jpg";

  data_src = "";
  data_src2 = "";
  startup_name: string = "N.A.";
  startup_about: string = "N.A.";
  your_sector: string = "N.A";

  startup_username: string = "N.A.";
  address: string = "N.A.";

  team_size: any = "N.A.";
  product_stage: any = "N.A.";
  social_link_twitter: any = "";
  social_link_linkedin: any = "";
  social_link_personal: any = "";
  twitter: boolean = false;
  linkedin: boolean = false;
  personal_link: boolean = false;

  investors: Array<PastInvestors>;
  founders: Array<Founders>;

  constructor(public router: Router) { }

  ngOnInit() {
 window.scroll(0, 0);
    this.userModel = JSON.parse(localStorage.getItem("userModel"));

    this.investors = [];
    this.founders = [];


    if (localStorage.getItem("userModel")) {

      // set company name
      if (this.userModel.founder_startup_details.title != null && this.userModel.founder_startup_details.title) {
        this.startup_name = this.userModel.founder_startup_details.title;
      }

      // set startup address
      if (this.userModel.founder_startup_details.address1 != null && this.userModel.founder_startup_details.address1) {
        this.address = this.userModel.founder_startup_details.address1;
      }

      // set startup username
      if (this.userModel.founder_startup_details.profile_name != null && this.userModel.founder_startup_details.profile_name) {
        this.startup_username = this.userModel.founder_startup_details.profile_name;
      }

      // set startup about
      if (this.userModel.founder_startup_details.startup_desc != null && this.userModel.founder_startup_details.startup_desc) {
        this.startup_about = this.userModel.founder_startup_details.startup_desc;
      }

      // set background image
      if (this.userModel.founder_startup_details.hero_url != null && this.userModel.founder_startup_details.hero_url) {
        this.data_src = this.userModel.founder_startup_details.hero_url;
      }

      // set startup image
      if (this.userModel.founder_startup_details.logo_url != null && this.userModel.founder_startup_details.logo_url) {
        this.data_src2 = this.userModel.founder_startup_details.logo_url;
      }

      // set team size
      if (this.userModel.founder_startup_details.team_size != null && this.userModel.founder_startup_details.team_size) {
        this.team_size = this.userModel.founder_startup_details.team_size;
      }

      // set twitter link
      if (this.userModel.root_user.twitter_link != null && this.userModel.root_user.twitter_link) {
        this.social_link_twitter = "https://twitter.com/" + this.userModel.root_user.twitter_link;
        this.twitter = true;
      }

      // set instagram link
      if (this.userModel.root_user.linkedin_link != null && this.userModel.root_user.linkedin_link) {
     
        console.log("linkdin link" + this.userModel.root_user.linkedin_link);
        this.social_link_linkedin = "https://" + this.userModel.root_user.linkedin_link;
        this.linkedin = true;
      } 

      // set personal link
      if (this.userModel.founder_startup_details.website_url != null && this.userModel.founder_startup_details.website_url) {
        this.social_link_personal = "https://" + this.userModel.founder_startup_details.website_url;
        this.personal_link = true;
      }

      // set round invest
      if (this.userModel.founder_startup_details.stage_are_you_in != null && this.userModel.founder_startup_details.stage_are_you_in) {
        this.product_stage = this.userModel.founder_startup_details.stage_are_you_in;
      }

      // set sector
      if (this.userModel.founder_startup_details.startup_falls_under != null && this.userModel.founder_startup_details.startup_falls_under) {
        this.your_sector = this.userModel.founder_startup_details.startup_falls_under;
      }

      // set investor
      if (this.userModel.founder_startup_details.past_investors != null && this.userModel.founder_startup_details.past_investors) {
        var stringToSplit = this.userModel.founder_startup_details.past_investors;

        if (stringToSplit.indexOf(',') >= 0) {
          var splittedString = stringToSplit.split(',');
          if (stringToSplit != null && stringToSplit.length > 0) {
            for (var investor in splittedString) {
              var investorModel = new PastInvestors();
              investorModel.investorUrl = "";
              investorModel.investorName = splittedString[investor];

              this.investors.push(investorModel);
            }
          }
        } else {
          var investorModel = new PastInvestors();
          investorModel.investorName = stringToSplit;
          investorModel.investorUrl = "";
          this.investors.push(investorModel);
        }
      } else {
        var investorModel = new PastInvestors();
        investorModel.investorName = "N.A";
        investorModel.investorUrl = "";
        this.investors.push(investorModel);
      }


      // set founders
      if (this.userModel.founder_startup_details.founder_name != null && this.userModel.founder_startup_details.founder_name) {
        var stringToSplit = this.userModel.founder_startup_details.founder_name;

        if (stringToSplit.indexOf(',') >= 0) {
          var splittedString = stringToSplit.split(',');
          if (stringToSplit != null && stringToSplit.length > 0) {
            for (var founder in splittedString) {
              var founderModel = new Founders();
              founderModel.founderUrl = "";
              founderModel.founderName = splittedString[founder];
              this.founders.push(founderModel);
            }
          }
        } else {
          var founderModel = new Founders();
          founderModel.founderName = stringToSplit;
          founderModel.founderUrl = "";
          this.founders.push(founderModel);
        }
      } else {
        var founderModel = new Founders();
        founderModel.founderName = "N.A";
        founderModel.founderUrl = "";
        this.founders.push(founderModel);
      }

      // set joinners as a founder
      if (this.userModel.founder_startup_details.joiner_name != null && this.userModel.founder_startup_details.joiner_name) {
        var stringToSplit = this.userModel.founder_startup_details.joiner_name;

        if (stringToSplit.indexOf(',') >= 0) {
          var splittedString = stringToSplit.split(',');
          if (stringToSplit != null && stringToSplit.length > 0) {
            for (var founder in splittedString) {
              var founderModel = new Founders();
              founderModel.founderUrl = "";
              founderModel.founderName = splittedString[founder];
              this.founders.push(founderModel);
            }
          }
        } else {
          var founderModel = new Founders();
          founderModel.founderName = stringToSplit;
          founderModel.founderUrl = "";
          this.founders.push(founderModel);
        }
      }


    }
  }

  viewMyProfile() {
    this.router.navigate(['founder-profile']);
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
}