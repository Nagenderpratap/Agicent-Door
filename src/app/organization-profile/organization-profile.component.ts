import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Investors } from './investors';
import { Investments } from './investments';


@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {

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
  investments: Array<Investments>;

  constructor(public router: Router) { }

  ngOnInit() {

    this.userModel = JSON.parse(localStorage.getItem("userModel"));

    this.investors = [];
    this.investments = [];
    
    if (localStorage.getItem("userModel")) {

      // set organization name
      if (this.userModel.investor_company_details.title != null && this.userModel.investor_company_details.title) {
        this.fund_name = this.userModel.investor_company_details.title;
      }

      // set investor username
      if (this.userModel.root_user.username != null && this.userModel.root_user.username) {
        this.investor_username = this.userModel.root_user.username;
      }

      // set organization address
      if (this.userModel.investor_company_details.address1 != null && this.userModel.investor_company_details.address1) {
        this.address = this.userModel.investor_company_details.address1;
      }

      // set organization about
      if (this.userModel.investor_company_details.startup_desc != null && this.userModel.investor_company_details.startup_desc) {
        this.organization_about = this.userModel.investor_company_details.startup_desc;
      }

      // set website url
      if (this.userModel.investor_company_details.website_url != null && this.userModel.investor_company_details.website_url) {
        this.social_link_personal = "https://" + this.userModel.investor_company_details.website_url;
        this.personal_link = true;
      }

      // set background image
      if (this.userModel.investor_company_details.hero_logo_url != null && this.userModel.investor_company_details.hero_logo_url) {
        this.data_src = this.userModel.investor_company_details.hero_logo_url;
      }

      // set fund image
      if (this.userModel.investor_company_details.logo_url != null && this.userModel.investor_company_details.logo_url) {
        this.data_src2 = this.userModel.investor_company_details.logo_url;
      }

      // set min check size
      if (this.userModel.investor_company_details.mincheck != null && this.userModel.investor_company_details.mincheck) {
        this.min_check_size = this.userModel.investor_company_details.mincheck;
      }

      // set max check size
      if (this.userModel.investor_company_details.maxcheck != null && this.userModel.investor_company_details.maxcheck) {
        this.max_check_size = this.userModel.investor_company_details.maxcheck;
      }

      // set fund category
      if (this.userModel.investor_company_details.fund_category) {
        this.fund_category = this.userModel.investor_company_details.fund_category;
      }

      // set sector invest
      if (this.userModel.investor_details.intrested_area != null && this.userModel.investor_details.intrested_area) {
        var stringToSplit = this.userModel.investor_details.intrested_area;

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
      } else if (this.userModel.Investor_team.intrested_area != null && this.userModel.Investor_team.intrested_area) {
        var stringToSplit = this.userModel.Investor_team.intrested_area;

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
      }else {
        this.sector_invest.push('N.A.');
      }

      // set round invest
      if (this.userModel.investor_details.which_stage_usually_invest != null && this.userModel.investor_details.which_stage_usually_invest) {
        var stringToSplit = this.userModel.investor_details.which_stage_usually_invest;

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
      } else if (this.userModel.Investor_team.which_stage_usually_invest != null && this.userModel.Investor_team.which_stage_usually_invest) {
        var stringToSplit = this.userModel.Investor_team.which_stage_usually_invest;

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
      }else {
        this.round_invest.push('N.A.');
      }


      // set geography
      if (this.userModel.investor_company_details.region_you_invest_in != null && this.userModel.investor_company_details.region_you_invest_in) {
        var stringToSplit = this.userModel.investor_company_details.region_you_invest_in;

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
      if (this.userModel.investor_company_details.investor_name != null && this.userModel.investor_company_details.investor_name) {
        var stringToSplit = this.userModel.investor_company_details.investor_name;

        if (stringToSplit.indexOf(',') >= 0) {
          var splittedString = stringToSplit.split(',');
          if (stringToSplit != null && stringToSplit.length > 0) {
            for (var investor in splittedString) {
              var investorModel = new Investors();
              investorModel.investorUrl = "";
              investorModel.investorName = splittedString[investor];
              this.investors.push(investorModel);
            }
          }
        } else {
          var investorModel = new Investors();
          investorModel.investorName = stringToSplit;
          investorModel.investorUrl = "";
          this.investors.push(investorModel);
        }
      } else {
        var investorModel = new Investors();
        investorModel.investorName = "N.A";
        investorModel.investorUrl = "";
        this.investors.push(investorModel);
      }


      // set joinners as past investors
      if (this.userModel.investor_company_details.joiner_name != null && this.userModel.investor_company_details.joiner_name) {
        var stringToSplit = this.userModel.investor_company_details.joiner_name;

        if (stringToSplit.indexOf(',') >= 0) {
          var splittedString = stringToSplit.split(',');
          if (stringToSplit != null && stringToSplit.length > 0) {
            for (var investor in splittedString) {
              var investorModel = new Investors();
              investorModel.investorUrl = "";
              investorModel.investorName = splittedString[investor];
              this.investors.push(investorModel);
            }
          }
        } else {
          var investorModel = new Investors();
          investorModel.investorName = stringToSplit;
          investorModel.investorUrl = "";
          this.investors.push(investorModel);
        }
      } 

       // set past investments
       if (this.userModel.investor_company_details.past_investments != null && this.userModel.investor_company_details.past_investments) {
        var stringToSplit = this.userModel.investor_company_details.past_investments;

        if (stringToSplit.indexOf(',') >= 0) {
          var splittedString = stringToSplit.split(',');
          if (stringToSplit != null && stringToSplit.length > 0) {
            for (var investor in splittedString) {
              var investmentModel = new Investments();
              investmentModel.investmentUrl = "";
              investmentModel.investmentName = splittedString[investor];
              this.investments.push(investmentModel);
            }
          }
        } else {
          var investmentModel = new Investments();
          investmentModel.investmentName = stringToSplit;
          investmentModel.investmentUrl = "";
          this.investments.push(investmentModel);
        }
      } else {
        var investmentModel = new Investments();
        investmentModel.investmentName = "N.A";
        investmentModel.investmentUrl = "";
        this.investments.push(investmentModel);
      }

    }



  }
  viewPersonalProfile() {
    this.router.navigate(['investor-profile']);
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