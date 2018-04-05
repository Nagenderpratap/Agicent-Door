import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Investors } from './investors';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  location_logo = "assets/location_logo.jpg";
  
    userModel: any;
  
    data_src = "";
    data_src2 = "";
  
  
    fund_name: any = "N.A.";
    organization_about: string = "N.A.";
    address: string = "N.A.";
  
    min_check_size: any = "N.A.";
    max_check_size: any = "N.A.";
    fund_category: any = "N.A."
    sector_invest: any[] = [];
    round_invest: any[] = [];
    geographics: any[] = [];
    investor_username: any = "N.A";
    social_link_twitter: any = "";
    social_link_personal: any = "";
    twitter: boolean = false;
    personal_link: boolean = false;
  
    investors: Array<Investors>;
    constructor(public router: Router) { }
  
    ngOnInit() {
  
      this.userModel = JSON.parse(localStorage.getItem("searchDataOrganization"));
  
      this.investors = [];
  
      if (localStorage.getItem("searchDataOrganization")) {
  
        // set organization name
        if (this.userModel.title != null && this.userModel.title) {
          this.fund_name = this.userModel.title;
        }
  
        // set investor username
        if (this.userModel.username != null && this.userModel.username) {
          this.investor_username = this.userModel.username;
        }
  
        // set organization address
        if (this.userModel.address1 != null && this.userModel.address1) {
          this.address = this.userModel.address1;
        }
  
        // set organization about
        if (this.userModel.startup_desc != null && this.userModel.startup_desc) {
          this.organization_about = this.userModel.startup_desc;
        }
  
        // set website url
        if (this.userModel.website_url != null && this.userModel.website_url) {
          this.social_link_personal = "https://" + this.userModel.website_url;
          this.personal_link = true;
        }
  
        // set background image
        if (this.userModel.hero_logo_url != null && this.userModel.hero_logo_url) {
          this.data_src = this.userModel.hero_logo_url;
        }
  
        // set fund image
        if (this.userModel.logo_url != null && this.userModel.logo_url) {
          this.data_src2 = this.userModel.logo_url;
        }
  
        // set min check size
        if (this.userModel.mincheck != null && this.userModel.mincheck) {
          this.min_check_size = this.userModel.mincheck;
        }
  
        // set max check size
        if (this.userModel.maxcheck != null && this.userModel.maxcheck) {
          this.max_check_size = this.userModel.maxcheck;
        }
  
        // set fund category
        if (this.userModel.fund_category) {
          this.fund_category = this.userModel.fund_category;
        }
  
        // set sector invest
        if (this.userModel.intrested_area != null && this.userModel.intrested_area) {
          var stringToSplit = this.userModel.intrested_area;
  
          if (stringToSplit.indexOf(',') >= 0) {
            var splittedString = stringToSplit.split(',');
            if (stringToSplit != null && stringToSplit.length > 0) {
              for (var str in splittedString) {
                this.sector_invest.push(splittedString[str]);
              }
            }
          } else {
            this.sector_invest.push(stringToSplit);
          }
        } else {
          this.sector_invest.push('N.A.');
        }
  
        // set round invest
        if (this.userModel.which_stage_usually_invest != null && this.userModel.which_stage_usually_invest) {
          var stringToSplit = this.userModel.which_stage_usually_invest;
  
          if (stringToSplit.indexOf(',') >= 0) {
            var splittedString = stringToSplit.split(',');
            if (stringToSplit != null && stringToSplit.length > 0) {
              for (var str in splittedString) {
                this.round_invest.push(splittedString[str]);
              }
            }
          } else {
            this.round_invest.push(stringToSplit);
          }
        } else {
          this.round_invest.push('N.A.');
        }
  
  
        // set geography
        if (this.userModel.region_you_invest_in != null && this.userModel.region_you_invest_in) {
          var stringToSplit = this.userModel.region_you_invest_in;
  
          if (stringToSplit.indexOf(',') >= 0) {
            var splittedString = stringToSplit.split(',');
            if (stringToSplit != null && stringToSplit.length > 0) {
              for (var str in splittedString) {
                this.geographics.push(splittedString[str]);
              }
            }
          } else {
            this.geographics.push(stringToSplit);
          }
        } else {
          this.geographics.push('N.A.');
        }
  
        // set past investors
        if (this.userModel.investor_name != null && this.userModel.investor_name) {
          var stringToSplit = this.userModel.investor_name;
  
          if (stringToSplit.indexOf(',') >= 0) {
            var splittedString = stringToSplit.split(',');
            if (stringToSplit != null && stringToSplit.length > 0) {
              for (var investor in splittedString) {
                var investorModel = new Investors();
                investorModel.imageUrl = "";
                investorModel.investorName = splittedString[investor];
                this.investors.push(investorModel);
              }
            }
          } else {
            var investorModel = new Investors();
            investorModel.investorName = stringToSplit;
            investorModel.imageUrl = "";
            this.investors.push(investorModel);
          }
        } else {
          var investorModel = new Investors();
          investorModel.investorName = "N.A";
          investorModel.imageUrl = "";
          this.investors.push(investorModel);
        }
  
  
        // set joinners as past investors
        if (this.userModel.joiner_name != null && this.userModel.joiner_name) {
          var stringToSplit = this.userModel.joiner_name;
  
          if (stringToSplit.indexOf(',') >= 0) {
            var splittedString = stringToSplit.split(',');
            if (stringToSplit != null && stringToSplit.length > 0) {
              for (var investor in splittedString) {
                var investorModel = new Investors();
                investorModel.imageUrl = "";
                investorModel.investorName = splittedString[investor];
                this.investors.push(investorModel);
              }
            }
          } else {
            var investorModel = new Investors();
            investorModel.investorName = stringToSplit;
            investorModel.imageUrl = "";
            this.investors.push(investorModel);
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
