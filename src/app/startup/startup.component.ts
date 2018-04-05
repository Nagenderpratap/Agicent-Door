import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PastInvestors } from './pastinvestors';
import { Founders } from './founders';


@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

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

    this.userModel = JSON.parse(localStorage.getItem("searchDataStartup"));

    this.investors = [];
    this.founders = [];


    if (localStorage.getItem("searchDataStartup")) {

      // set company name
      if (this.userModel.title != null && this.userModel.title) {
        this.startup_name = this.userModel.title;
      }

      // set startup address
      if (this.userModel.address1 != null && this.userModel.address1) {
        this.address = this.userModel.address1;
      }

      // set startup username
      if (this.userModel.profile_name != null && this.userModel.profile_name) {
        this.startup_username = this.userModel.profile_name;
      }

      // set startup about
      if (this.userModel.startup_desc != null && this.userModel.startup_desc) {
        this.startup_about = this.userModel.startup_desc;
      }

      // set background image
      if (this.userModel.hero_url != null && this.userModel.hero_url) {
        this.data_src = this.userModel.hero_url;
      }

      // set startup image
      if (this.userModel.logo_url != null && this.userModel.logo_url) {
        this.data_src2 = this.userModel.logo_url;
      }

      // set team size
      if (this.userModel.team_size != null && this.userModel.team_size) {
        this.team_size = this.userModel.team_size;
      }

      // set twitter link
      if (this.userModel.twitter_link != null && this.userModel.twitter_link) {
        this.social_link_twitter = "https://twitter.com/" + this.userModel.twitter_link;
        this.twitter = true;
      }

      // set instagram link
      if (this.userModel.linkedin_link != null && this.userModel.linkedin_link) {

        console.log("linkdin link" + this.userModel.linkedin_link);
        this.social_link_linkedin = "https://" + this.userModel.linkedin_link;
        this.linkedin = true;
      }

      // set personal link
      if (this.userModel.website_url != null && this.userModel.website_url) {
        this.social_link_personal = "https://" + this.userModel.website_url;
        this.personal_link = true;
      }

      // set round invest
      if (this.userModel.stage_are_you_in != null && this.userModel.stage_are_you_in) {
        this.product_stage = this.userModel.stage_are_you_in;
      }

      // set sector
      if (this.userModel.startup_falls_under != null && this.userModel.startup_falls_under) {
        this.your_sector = this.userModel.startup_falls_under;
      }

      // set investor
      if (this.userModel.past_investors != null && this.userModel.past_investors) {
        var stringToSplit = this.userModel.past_investors;

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
      if (this.userModel.founder_name != null && this.userModel.founder_name) {
        var stringToSplit = this.userModel.founder_name;

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
      if (this.userModel.joiner_name != null && this.userModel.joiner_name) {
        var stringToSplit = this.userModel.joiner_name;

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