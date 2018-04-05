import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { CommonapiService } from "../services/commonapi.service";
import { error } from 'util';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { Founders } from './founders';
import { Startups } from './startups';
import { Investors } from './investors';
import { Organizations } from './organization';
import { Router } from "@angular/router";

@Component({
  selector: 'app-searchview',
  templateUrl: './searchview.component.html',
  styleUrls: ['./searchview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchviewComponent implements OnInit {

  startup_count: number;
  founders_count: number;
  investors_count: number;
  organization_count: number;
  sectorsList: Array<String>;
  topLocationList: Array<String>;
  stagesList: Array<String>;
  auto_location_data: any = "";
  lat: any;
  lng: any;
  address: any;
  searchText: any;

  founders: any;
  investors: any;
  startups: any;
  organizations: any;

  firstTime: any = false;
    public loading = false;
  expand_collapse: any = "Expand Details";
  isExpanded = 0;

  startupsData: Array<Startups>;
  foundersData: Array<Founders>;
  investorsData: Array<Investors>;
  organizationsData: Array<Organizations>;

  current: number = 0;
  resData: any;

  public userSettings: any = {
    showCurrentLocation: false,
    resOnSearchButtonClickOnly: false,
    inputPlaceholderText: 'Enter Location',
    recentStorageName: 'componentData3',
    showSearchButton: false,
    showRecentSearch: false

  };

  constructor(public router: Router, public vcr: ViewContainerRef, public toastr: ToastsManager, private commonApiService: CommonapiService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

    this.startupsData = [
    ]
    this.organizations = [
    ]


    this.foundersData = [
    ]
    this.founders = [
    ]

    this.investorsData = [
    ]
    this.investors = [
    ]

    this.organizationsData = [
    ]
    this.organizations = [
    ]

    this.sectorsList = [
      'Artificial Intelligence',
      'AdTech',
      'Automotive',
      'B2B',
      'B2C',
      'Beauty',
      'Big Data',
      'Biometrics',
      'Blockchain',
      'CleanTech',
      'Consumer Lifestyle',
      'Cryptocurrency',
      'Drones',
      'E-commerce',
      'EdTech',
      'Enterprise Software',
      'Fashion',
      'GovTech',
      'HealthTech',
      'Industrial Tech',
      'Internet of Things',
      'Fintech',
      'Food Analytics and Tech',
      'Fraud Detection Software',
      'LegalTech',
      'LoveTech',
      'Retail',
      'Robotics',
      'Sharing Economy',
      'Social Enterprise',
      'UrbanTech',
      'Virtual Reality',
      'Other',
    ];

    this.stagesList = [
      'Idea',
      'Prototype/MVP',
      'Live - No traction',
      'Revenue traction',
      'User traction'
    ];

    this.topLocationList = [
      'United States',
      'Silicon Valley',
      'New York'
    ]

  }

  autoCompleteCallback(selectedData: any) {

    this.locationClicked_color_change();

    this.auto_location_data = selectedData.data;

    this.address = this.auto_location_data.formatted_address;

    this.lat = this.auto_location_data.geometry.location.lat
    this.lng = this.auto_location_data.geometry.location.lng;


    // // Founder data
    // this.founders = this.resData.founders;
    // this.foundersData.splice(0, this.foundersData.length);

    // if (this.founders.length > 0) {
    //   for (var founder in this.founders) {

    //     if (this.founders[founder].user_address != null && this.founders[founder].user_address && this.address == this.founders[founder].user_address) {

    //       var founderModel = new Founders();
    //       if (this.founders[founder].firstname != null && this.founders[founder].firstname) {
    //         founderModel.founderName = this.founders[founder].firstname;
    //       }
    //       if (this.founders[founder].founder_title != null && this.founders[founder].founder_title) {
    //         founderModel.title = this.founders[founder].founder_title;
    //       }
    //       if (this.founders[founder].title != null && this.founders[founder].title) {
    //         founderModel.startupName = this.founders[founder].title;
    //       }
    //       if (this.founders[founder].user_address != null && this.founders[founder].user_address) {
    //         founderModel.location = this.founders[founder].user_address;
    //       }
    //       if (this.founders[founder].user_about != null && this.founders[founder].user_about) {
    //         founderModel.about = this.founders[founder].user_about;
    //       }
    //       if (this.founders[founder].user_profile_image != null && this.founders[founder].user_profile_image) {
    //         founderModel.imageUrl = this.founders[founder].user_profile_image;
    //       }
    //       this.foundersData.push(founderModel);

    //     }
    //   }

    //   this.founders_count = this.foundersData.length;

    // }

    // // Investor data
    // this.investors = this.resData.investors;
    // this.investorsData.splice(0, this.investorsData.length);
    // if (this.investors.length > 0) {
    //   for (var investor in this.investors) {

    //     if (this.investors[investor].user_address != null && this.investors[investor].user_address && this.address == this.investors[investor].user_address) {

    //       var investorModel = new Investors();
    //       if (this.investors[investor].firstname != null && this.investors[investor].firstname) {
    //         investorModel.investorName = this.investors[investor].firstname;
    //       }
    //       if (this.investors[investor].investor_title != null && this.investors[investor].investor_title) {
    //         investorModel.title = this.investors[investor].investor_title;
    //       } else {
    //         investorModel.title = "NA";
    //       }
    //       if (this.investors[investor].title != null && this.investors[investor].title) {
    //         investorModel.organazitionName = this.investors[investor].title;
    //       } else {
    //         investorModel.organazitionName = "NA";
    //       }
    //       if (this.investors[investor].sector_most_excited != null && this.investors[investor].sector_most_excited) {
    //         investorModel.sector = this.investors[investor].sector_most_excited;
    //       }
    //       if (this.investors[investor].user_about != null && this.investors[investor].user_about) {
    //         investorModel.about = this.investors[investor].user_about;
    //       }
    //       if (this.investors[investor].user_profile_image != null && this.investors[investor].user_profile_image) {
    //         investorModel.imageUrl = this.investors[investor].user_profile_image;
    //       }

    //       this.investorsData.push(investorModel);

    //     }
    //   }

    //   this.investors_count = this.investorsData.length;

    // }

    // Startups Data
    this.startups = this.resData.startups;
    this.startupsData.splice(0, this.startupsData.length);

    if (this.startups.length > 0) {
      for (var startup in this.startups) {

        if (this.startups[startup].address1 != null && this.startups[startup].address1 && this.address == this.startups[startup].address1) {
          var startupModel = new Startups();
          if (this.startups[startup].id != null && this.startups[startup].id) {
            startupModel.id = this.startups[startup].id;
          }
          if (this.startups[startup].title != null && this.startups[startup].title) {
            startupModel.startupName = this.startups[startup].title;
          }
          if (this.startups[startup].address1 != null && this.startups[startup].address1) {
            startupModel.location = this.startups[startup].address1;
          }
          if (this.startups[startup].founder_name = !null && this.startups[startup].founder_name) {
            startupModel.foundersName = this.startups[startup].founder_name;
          }
          if (this.startups[startup].startup_falls_under != null && this.startups[startup].startup_falls_under) {
            startupModel.sectors = this.startups[startup].startup_falls_under;
          }
          if (this.startups[startup].stage_are_you_in != null && this.startups[startup].stage_are_you_in) {
            startupModel.stage = this.startups[startup].stage_are_you_in;
          }
          if (this.startups[startup].select_funding_round != null && this.startups[startup].select_funding_round) {
            startupModel.foundingRound = this.startups[startup].select_funding_round;
          }
          if (this.startups[startup].past_investors != null && this.startups[startup].past_investors) {
            startupModel.investors = this.startups[startup].past_investors;
          } else {
            startupModel.investors = "NA";
          }
          if (this.startups[startup].logo_url != null && this.startups[startup].logo_url) {
            startupModel.imageUrl = this.startups[startup].logo_url;
          }
          this.startupsData.push(startupModel);
        }

      }

      this.startup_count = this.startupsData.length;

    }

    // Organization Data
    this.organizations = this.resData.organizations;
    this.organizationsData.splice(0, this.organizationsData.length);

    console.log("Anillll" + this.resData.organizations.length);

    if (this.organizations.length > 0) {
      for (var organization in this.organizations) {

        if (this.organizations[organization].address1 != null && this.organizations[organization].address1 && this.address == this.organizations[organization].address1) {
          var organizationModel = new Organizations();
          if (this.organizations[organization].id != null && this.organizations[organization].id) {
            organizationModel.id = this.organizations[organization].id;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.organizationName = this.organizations[organization].title;
          }
          if (this.organizations[organization].address1 != null && this.organizations[organization].address1) {
            organizationModel.location = this.organizations[organization].address1;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.investors = this.organizations[organization].title;
          }

          if (this.organizations[organization].sector_most_excited != null && this.organizations[organization].sector_most_excited) {
            organizationModel.sectors = this.organizations[organization].sector_most_excited;
          }

          if (this.organizations[organization].mincheck != null && this.organizations[organization].mincheck) {
            organizationModel.minCheckSize = this.organizations[organization].mincheck;
          }

          if (this.organizations[organization].maxcheck != null && this.organizations[organization].maxcheck) {
            organizationModel.maxCheckSize = this.organizations[organization].maxcheck;
          }

          if (this.organizations[organization].which_stage_usually_invest != null && this.organizations[organization].which_stage_usually_invest) {
            organizationModel.stage = this.organizations[organization].which_stage_usually_invest;
          }
          if (this.organizations[organization].user_about != null && this.organizations[organization].user_about) {
            organizationModel.minTraction = this.organizations[organization].user_about;
          }
          if (this.organizations[organization].region_you_invest_in != null && this.organizations[organization].region_you_invest_in) {
            organizationModel.geography = this.organizations[organization].region_you_invest_in;
          }
          if (this.organizations[organization].logo_url != null && this.organizations[organization].logo_url) {
            organizationModel.imageUrl = this.organizations[organization].logo_url;
          }
          this.organizationsData.push(organizationModel);

        }

      }

      this.organization_count = this.organizationsData.length;

    }



  }

  ngAfterViewInit() {

    // $("#startup_text").css("font-weight", "600");
    // $("#founder_text").css("font-weight", "400");
    // $("#investor_text").css("font-weight", "400");
    // $("#organization_text").css("font-weight", "400");

    // $("#panel-group-startup").css("display", "");
    // $("#panel-group-investor").css("display", "none");
    // $("#panel-group-organization").css("display", "none");
    // $("#panel-group-founder").css("display", "none");
  }

  expandCollapse() {

    if (this.isExpanded == 1) {
      this.expand_collapse = "Expand Details"
      this.isExpanded = 0;
    } else if (this.isExpanded == 0) {
      this.expand_collapse = "Collapse Details"
      this.isExpanded = 1;
    }

  }

  startUpClicked() {

    if (this.startupsData.length > 0) {

      this.expand_collapse = "Expand Details"
      this.isExpanded = 0;

      $("#startup_text").css("font-weight", "600");
      $("#founder_text").css("font-weight", "400");
      $("#investor_text").css("font-weight", "400");
      $("#organization_text").css("font-weight", "400");


      $("#panel-group-startup").css("display", "");
      $("#panel-group-investor").css("display", "none");
      $("#panel-group-organization").css("display", "none");
      $("#panel-group-founder").css("display", "none");

    }

  }
  investorClicked() {

    if (this.investorsData.length > 0) {

      this.expand_collapse = "Expand Details"
      this.isExpanded = 0;

      $("#startup_text").css("font-weight", "400");
      $("#founder_text").css("font-weight", "400");
      $("#investor_text").css("font-weight", "600");
      $("#organization_text").css("font-weight", "400");

      $("#panel-group-startup").css("display", "none");
      $("#panel-group-investor").css("display", "");
      $("#panel-group-organization").css("display", "none");
      $("#panel-group-founder").css("display", "none");

    }

  }
  founderClicked() {

    if (this.foundersData.length > 0) {
      this.expand_collapse = "Expand Details"
      this.isExpanded = 0;

      $("#startup_text").css("font-weight", "400");
      $("#founder_text").css("font-weight", "600");
      $("#investor_text").css("font-weight", "400");
      $("#organization_text").css("font-weight", "400");

      $("#panel-group-startup").css("display", "none");
      $("#panel-group-investor").css("display", "none");
      $("#panel-group-organization").css("display", "none");
      $("#panel-group-founder").css("display", "");
    }

  }
  organizationClicked() {

    if (this.organizationsData.length > 0) {
      this.expand_collapse = "Expand Details"
      this.isExpanded = 0;

      $("#startup_text").css("font-weight", "400");
      $("#founder_text").css("font-weight", "400");
      $("#investor_text").css("font-weight", "400");
      $("#organization_text").css("font-weight", "600");

      $("#panel-group-startup").css("display", "none");
      $("#panel-group-investor").css("display", "none");
      $("#panel-group-organization").css("display", "");
      $("#panel-group-founder").css("display", "none");
    }

  }


  currentStartupClicked(currentStartup: number) {

    var clickedStartup = this.startupsData[currentStartup];

    for (var oneStartUp in this.startups) {
      if (this.startups[oneStartUp].id == clickedStartup.id) {
        localStorage.setItem('searchDataStartup', JSON.stringify(this.startups[oneStartUp]));
        this.router.navigate(['search-startup']);
      }
    }

  }
  currentInvestorClicked(currentInvestor: number) {

    var clickedInvestor = this.investorsData[currentInvestor];
    for (var oneInvestor in this.investors) {
      if (this.investors[oneInvestor].id == clickedInvestor.id) {
        if (this.investors[oneInvestor].user_type == 21) {
          localStorage.setItem('searchDataInvestor', JSON.stringify(this.investors[oneInvestor]));
          this.router.navigate(['search-investor']);
        } else if (this.investors[oneInvestor].user_type == 22) {
          localStorage.setItem('searchDataInvestorAngel', JSON.stringify(this.investors[oneInvestor]));
          this.router.navigate(['search-angel']);
        }
      }
    }


  }
  currentFounderClicked(currentFounder: number) {

    var clickedFounder = this.foundersData[currentFounder];

    console.log("Anilllllllllll" + clickedFounder);

    for (var oneFounder in this.founders) {
      if (this.founders[oneFounder].id == clickedFounder.id) {
        localStorage.setItem('searchDataFounder', JSON.stringify(this.founders[oneFounder]));
        this.router.navigate(['search-founder']);
      }
    }

  }
  currentOrganizationClicked(currentOrganization: number) {

    var clickedOrganization = this.organizationsData[currentOrganization];

    for (var oneOrganization in this.organizations) {
      if (this.organizations[oneOrganization].id == clickedOrganization.id) {
        localStorage.setItem('searchDataOrganization', JSON.stringify(this.organizations[oneOrganization]));
        this.router.navigate(['search-organization']);
      }
    }

  }

  stageClicked(stagePosition: any) {

    this.stageClicked_color_change();

    var toFilterContent = this.stagesList[stagePosition];

    // // Founder data
    // this.founders = this.resData.founders;
    // this.foundersData.splice(0, this.foundersData.length);

    // if (this.founders.length > 0) {
    //   for (var founder in this.founders) {
    //     var founderModel = new Founders();
    //     if (this.founders[founder].firstname != null && this.founders[founder].firstname) {
    //       founderModel.founderName = this.founders[founder].firstname;
    //     }
    //     if (this.founders[founder].founder_title != null && this.founders[founder].founder_title) {
    //       founderModel.title = this.founders[founder].founder_title;
    //     }
    //     if (this.founders[founder].title != null && this.founders[founder].title) {
    //       founderModel.startupName = this.founders[founder].title;
    //     }
    //     if (this.founders[founder].user_address != null && this.founders[founder].user_address) {
    //       founderModel.location = this.founders[founder].user_address;
    //     }
    //     if (this.founders[founder].user_about != null && this.founders[founder].user_about) {
    //       founderModel.about = this.founders[founder].user_about;
    //     }
    //     if (this.founders[founder].user_profile_image != null && this.founders[founder].user_profile_image) {
    //       founderModel.imageUrl = this.founders[founder].user_profile_image;
    //     }
    //     this.foundersData.push(founderModel);
    //   }

    //   this.founders_count = this.foundersData.length;

    // }

    // // Investor data
    // this.investors = this.resData.investors;
    // this.investorsData.splice(0, this.investorsData.length);
    // if (this.investors.length > 0) {
    //   for (var investor in this.investors) {
    //     var investorModel = new Investors();
    //     if (this.investors[investor].firstname != null && this.investors[investor].firstname) {
    //       investorModel.investorName = this.investors[investor].firstname;
    //     }
    //     if (this.investors[investor].investor_title != null && this.investors[investor].investor_title) {
    //       investorModel.title = this.investors[investor].investor_title;
    //     } else {
    //       investorModel.title = "NA";
    //     }
    //     if (this.investors[investor].title != null && this.investors[investor].title) {
    //       investorModel.organazitionName = this.investors[investor].title;
    //     } else {
    //       investorModel.organazitionName = "NA";
    //     }
    //     if (this.investors[investor].sector_most_excited != null && this.investors[investor].sector_most_excited) {
    //       investorModel.sector = this.investors[investor].sector_most_excited;
    //     }
    //     if (this.investors[investor].user_about != null && this.investors[investor].user_about) {
    //       investorModel.about = this.investors[investor].user_about;
    //     }
    //     if (this.investors[investor].user_profile_image != null && this.investors[investor].user_profile_image) {
    //       investorModel.imageUrl = this.investors[investor].user_profile_image;
    //     }
    //     this.investorsData.push(investorModel);
    //   }

    //   this.investors_count = this.investorsData.length;

    // }

    // Startups Data
    this.startups = this.resData.startups;
    this.startupsData.splice(0, this.startupsData.length);

    if (this.startups.length > 0) {
      for (var startup in this.startups) {

        if (this.startups[startup].stage_are_you_in != null && this.startups[startup].stage_are_you_in && toFilterContent == this.startups[startup].stage_are_you_in) {
          var startupModel = new Startups();
          if (this.startups[startup].id != null && this.startups[startup].id) {
            startupModel.id = this.startups[startup].id;
          }
          if (this.startups[startup].title != null && this.startups[startup].title) {
            startupModel.startupName = this.startups[startup].title;
          }
          if (this.startups[startup].address1 != null && this.startups[startup].address1) {
            startupModel.location = this.startups[startup].address1;
          }
          if (this.startups[startup].founder_name = !null && this.startups[startup].founder_name) {
            startupModel.foundersName = this.startups[startup].founder_name;
          }
          if (this.startups[startup].startup_falls_under != null && this.startups[startup].startup_falls_under) {
            startupModel.sectors = this.startups[startup].startup_falls_under;
          }
          if (this.startups[startup].stage_are_you_in != null && this.startups[startup].stage_are_you_in) {
            startupModel.stage = this.startups[startup].stage_are_you_in;
          }
          if (this.startups[startup].select_funding_round != null && this.startups[startup].select_funding_round) {
            startupModel.foundingRound = this.startups[startup].select_funding_round;
          }
          if (this.startups[startup].past_investors != null && this.startups[startup].past_investors) {
            startupModel.investors = this.startups[startup].past_investors;
          } else {
            startupModel.investors = "NA";
          }
          if (this.startups[startup].logo_url != null && this.startups[startup].logo_url) {
            startupModel.imageUrl = this.startups[startup].logo_url;
          }
          this.startupsData.push(startupModel);
        }

      }

      this.startup_count = this.startupsData.length;

    }

    // Organization Data
    this.organizations = this.resData.organizations;
    this.organizationsData.splice(0, this.organizationsData.length);

    console.log("Anillll" + this.resData.organizations.length);

    if (this.organizations.length > 0) {
      for (var organization in this.organizations) {

        if (this.organizations[organization].which_stage_usually_invest != null && this.organizations[organization].which_stage_usually_invest && this.organizations[organization].which_stage_usually_invest == "All") {
          var organizationModel = new Organizations();
          if (this.organizations[organization].id != null && this.organizations[organization].id) {
            organizationModel.id = this.organizations[organization].id;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.organizationName = this.organizations[organization].title;
          }
          if (this.organizations[organization].address1 != null && this.organizations[organization].address1) {
            organizationModel.location = this.organizations[organization].address1;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.investors = this.organizations[organization].title;
          }

          if (this.organizations[organization].sector_most_excited != null && this.organizations[organization].sector_most_excited) {
            organizationModel.sectors = this.organizations[organization].sector_most_excited;
          }

          if (this.organizations[organization].mincheck != null && this.organizations[organization].mincheck) {
            organizationModel.minCheckSize = this.organizations[organization].mincheck;
          }

          if (this.organizations[organization].maxcheck != null && this.organizations[organization].maxcheck) {
            organizationModel.maxCheckSize = this.organizations[organization].maxcheck;
          }

          if (this.organizations[organization].which_stage_usually_invest != null && this.organizations[organization].which_stage_usually_invest) {
            organizationModel.stage = this.organizations[organization].which_stage_usually_invest;
          }
          if (this.organizations[organization].user_about != null && this.organizations[organization].user_about) {
            organizationModel.minTraction = this.organizations[organization].user_about;
          }
          if (this.organizations[organization].region_you_invest_in != null && this.organizations[organization].region_you_invest_in) {
            organizationModel.geography = this.organizations[organization].region_you_invest_in;
          }
          if (this.organizations[organization].logo_url != null && this.organizations[organization].logo_url) {
            organizationModel.imageUrl = this.organizations[organization].logo_url;
          }
          this.organizationsData.push(organizationModel);

        } else if (this.organizations[organization].which_stage_usually_invest.indexOf(toFilterContent) > -1) {
          var organizationModel = new Organizations();
          if (this.organizations[organization].id != null && this.organizations[organization].id) {
            organizationModel.id = this.organizations[organization].id;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.organizationName = this.organizations[organization].title;
          }
          if (this.organizations[organization].address1 != null && this.organizations[organization].address1) {
            organizationModel.location = this.organizations[organization].address1;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.investors = this.organizations[organization].title;
          }
          if (this.organizations[organization].sector_most_excited != null && this.organizations[organization].sector_most_excited) {
            organizationModel.sectors = this.organizations[organization].sector_most_excited;
          }
          if (this.organizations[organization].mincheck != null && this.organizations[organization].mincheck) {
            organizationModel.minCheckSize = this.organizations[organization].mincheck;
          }
          if (this.organizations[organization].maxcheck != null && this.organizations[organization].maxcheck) {
            organizationModel.maxCheckSize = this.organizations[organization].maxcheck;
          }
          if (this.organizations[organization].which_stage_usually_invest != null && this.organizations[organization].which_stage_usually_invest) {
            organizationModel.stage = this.organizations[organization].which_stage_usually_invest;
          }
          if (this.organizations[organization].user_about != null && this.organizations[organization].user_about) {
            organizationModel.minTraction = this.organizations[organization].user_about;
          }
          if (this.organizations[organization].region_you_invest_in != null && this.organizations[organization].region_you_invest_in) {
            organizationModel.geography = this.organizations[organization].region_you_invest_in;
          }
          if (this.organizations[organization].logo_url != null && this.organizations[organization].logo_url) {
            organizationModel.imageUrl = this.organizations[organization].logo_url;
          }
          this.organizationsData.push(organizationModel);

        }

      }

      this.organization_count = this.organizationsData.length;

    }

  }
  sectorClicked(sectorPosition: any) {

    this.sectorClicked_color_change();

    var toFilterContent = this.sectorsList[sectorPosition];

    // // Founder data
    // this.founders = this.resData.founders;
    // this.foundersData.splice(0, this.foundersData.length);

    // if (this.founders.length > 0) {
    //   for (var founder in this.founders) {
    //     var founderModel = new Founders();
    //     if (this.founders[founder].firstname != null && this.founders[founder].firstname) {
    //       founderModel.founderName = this.founders[founder].firstname;
    //     }
    //     if (this.founders[founder].founder_title != null && this.founders[founder].founder_title) {
    //       founderModel.title = this.founders[founder].founder_title;
    //     }
    //     if (this.founders[founder].title != null && this.founders[founder].title) {
    //       founderModel.startupName = this.founders[founder].title;
    //     }
    //     if (this.founders[founder].user_address != null && this.founders[founder].user_address) {
    //       founderModel.location = this.founders[founder].user_address;
    //     }
    //     if (this.founders[founder].user_about != null && this.founders[founder].user_about) {
    //       founderModel.about = this.founders[founder].user_about;
    //     }
    //     if (this.founders[founder].user_profile_image != null && this.founders[founder].user_profile_image) {
    //       founderModel.imageUrl = this.founders[founder].user_profile_image;
    //     }
    //     this.foundersData.push(founderModel);
    //   }

    //   this.founders_count = this.foundersData.length;

    // }

    // // Investor data
    // this.investors = this.resData.investors;
    // this.investorsData.splice(0, this.investorsData.length);
    // if (this.investors.length > 0) {
    //   for (var investor in this.investors) {
    //     var investorModel = new Investors();
    //     if (this.investors[investor].firstname != null && this.investors[investor].firstname) {
    //       investorModel.investorName = this.investors[investor].firstname;
    //     }
    //     if (this.investors[investor].investor_title != null && this.investors[investor].investor_title) {
    //       investorModel.title = this.investors[investor].investor_title;
    //     } else {
    //       investorModel.title = "NA";
    //     }
    //     if (this.investors[investor].title != null && this.investors[investor].title) {
    //       investorModel.organazitionName = this.investors[investor].title;
    //     } else {
    //       investorModel.organazitionName = "NA";
    //     }
    //     if (this.investors[investor].sector_most_excited != null && this.investors[investor].sector_most_excited) {
    //       investorModel.sector = this.investors[investor].sector_most_excited;
    //     }
    //     if (this.investors[investor].user_about != null && this.investors[investor].user_about) {
    //       investorModel.about = this.investors[investor].user_about;
    //     }
    //     if (this.investors[investor].user_profile_image != null && this.investors[investor].user_profile_image) {
    //       investorModel.imageUrl = this.investors[investor].user_profile_image;
    //     }
    //     this.investorsData.push(investorModel);
    //   }

    //   this.investors_count = this.investorsData.length;

    // }

    // Startups Data
    this.startups = this.resData.startups;
    this.startupsData.splice(0, this.startupsData.length);

    if (this.startups.length > 0) {
      for (var startup in this.startups) {

        if (this.startups[startup].startup_falls_under.trim() != null && this.startups[startup].startup_falls_under.trim() && toFilterContent.trim() == this.startups[startup].startup_falls_under.trim()) {
          var startupModel = new Startups();
          if (this.startups[startup].id != null && this.startups[startup].id) {
            startupModel.id = this.startups[startup].id;
          }
          if (this.startups[startup].title != null && this.startups[startup].title) {
            startupModel.startupName = this.startups[startup].title;
          }
          if (this.startups[startup].address1 != null && this.startups[startup].address1) {
            startupModel.location = this.startups[startup].address1;
          }
          if (this.startups[startup].founder_name = !null && this.startups[startup].founder_name) {
            startupModel.foundersName = this.startups[startup].founder_name;
          }
          if (this.startups[startup].startup_falls_under != null && this.startups[startup].startup_falls_under) {
            startupModel.sectors = this.startups[startup].startup_falls_under;
          }
          if (this.startups[startup].stage_are_you_in != null && this.startups[startup].stage_are_you_in) {
            startupModel.stage = this.startups[startup].stage_are_you_in;
          }
          if (this.startups[startup].select_funding_round != null && this.startups[startup].select_funding_round) {
            startupModel.foundingRound = this.startups[startup].select_funding_round;
          }
          if (this.startups[startup].past_investors != null && this.startups[startup].past_investors) {
            startupModel.investors = this.startups[startup].past_investors;
          } else {
            startupModel.investors = "NA";
          }
          if (this.startups[startup].logo_url != null && this.startups[startup].logo_url) {
            startupModel.imageUrl = this.startups[startup].logo_url;
          }
          this.startupsData.push(startupModel);
        }

      }

      this.startup_count = this.startupsData.length;

    }

    // Organization Data
    this.organizations = this.resData.organizations;
    this.organizationsData.splice(0, this.organizationsData.length);

    console.log("Anillll" + this.resData.organizations.length);

    if (this.organizations.length > 0) {
      for (var organization in this.organizations) {

        if (this.organizations[organization].sector_most_excited != null && this.organizations[organization].sector_most_excited && this.organizations[organization].sector_most_excited.trim() == "All") {
          var organizationModel = new Organizations();
          if (this.organizations[organization].id != null && this.organizations[organization].id) {
            organizationModel.id = this.organizations[organization].id;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.organizationName = this.organizations[organization].title;
          }
          if (this.organizations[organization].address1 != null && this.organizations[organization].address1) {
            organizationModel.location = this.organizations[organization].address1;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.investors = this.organizations[organization].title;
          }

          if (this.organizations[organization].sector_most_excited != null && this.organizations[organization].sector_most_excited) {
            organizationModel.sectors = this.organizations[organization].sector_most_excited;
          }

          if (this.organizations[organization].mincheck != null && this.organizations[organization].mincheck) {
            organizationModel.minCheckSize = this.organizations[organization].mincheck;
          }

          if (this.organizations[organization].maxcheck != null && this.organizations[organization].maxcheck) {
            organizationModel.maxCheckSize = this.organizations[organization].maxcheck;
          }

          if (this.organizations[organization].which_stage_usually_invest != null && this.organizations[organization].which_stage_usually_invest) {
            organizationModel.stage = this.organizations[organization].which_stage_usually_invest;
          }
          if (this.organizations[organization].user_about != null && this.organizations[organization].user_about) {
            organizationModel.minTraction = this.organizations[organization].user_about;
          }
          if (this.organizations[organization].region_you_invest_in != null && this.organizations[organization].region_you_invest_in) {
            organizationModel.geography = this.organizations[organization].region_you_invest_in;
          }
          if (this.organizations[organization].logo_url != null && this.organizations[organization].logo_url) {
            organizationModel.imageUrl = this.organizations[organization].logo_url;
          }
          this.organizationsData.push(organizationModel);

        } else if (this.organizations[organization].sector_most_excited.indexOf(toFilterContent) > -1) {
          var organizationModel = new Organizations();
          if (this.organizations[organization].id != null && this.organizations[organization].id) {
            organizationModel.id = this.organizations[organization].id;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.organizationName = this.organizations[organization].title;
          }
          if (this.organizations[organization].address1 != null && this.organizations[organization].address1) {
            organizationModel.location = this.organizations[organization].address1;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.investors = this.organizations[organization].title;
          }
          if (this.organizations[organization].sector_most_excited != null && this.organizations[organization].sector_most_excited) {
            organizationModel.sectors = this.organizations[organization].sector_most_excited;
          }
          if (this.organizations[organization].mincheck != null && this.organizations[organization].mincheck) {
            organizationModel.minCheckSize = this.organizations[organization].mincheck;
          }
          if (this.organizations[organization].maxcheck != null && this.organizations[organization].maxcheck) {
            organizationModel.maxCheckSize = this.organizations[organization].maxcheck;
          }
          if (this.organizations[organization].which_stage_usually_invest != null && this.organizations[organization].which_stage_usually_invest) {
            organizationModel.stage = this.organizations[organization].which_stage_usually_invest;
          }
          if (this.organizations[organization].user_about != null && this.organizations[organization].user_about) {
            organizationModel.minTraction = this.organizations[organization].user_about;
          }
          if (this.organizations[organization].region_you_invest_in != null && this.organizations[organization].region_you_invest_in) {
            organizationModel.geography = this.organizations[organization].region_you_invest_in;
          }
          if (this.organizations[organization].logo_url != null && this.organizations[organization].logo_url) {
            organizationModel.imageUrl = this.organizations[organization].logo_url;
          }
          this.organizationsData.push(organizationModel);

        }

      }

      this.organization_count = this.organizationsData.length;

    }
  }

  locationClicked(locationPosition: any) {

    this.locationClicked_color_change();

    var toFilterContent = this.topLocationList[locationPosition];

    // // Founder data
    // this.founders = this.resData.founders;
    // this.foundersData.splice(0, this.foundersData.length);

    // if (this.founders.length > 0) {
    //   for (var founder in this.founders) {

    //     if (this.founders[founder].user_address != null && toFilterContent == this.founders[founder].user_address) {

    //       var founderModel = new Founders();
    //       if (this.founders[founder].firstname != null && this.founders[founder].firstname) {
    //         founderModel.founderName = this.founders[founder].firstname;
    //       }
    //       if (this.founders[founder].founder_title != null && this.founders[founder].founder_title) {
    //         founderModel.title = this.founders[founder].founder_title;
    //       }
    //       if (this.founders[founder].title != null && this.founders[founder].title) {
    //         founderModel.startupName = this.founders[founder].title;
    //       }
    //       if (this.founders[founder].user_address != null && this.founders[founder].user_address) {
    //         founderModel.location = this.founders[founder].user_address;
    //       }
    //       if (this.founders[founder].user_about != null && this.founders[founder].user_about) {
    //         founderModel.about = this.founders[founder].user_about;
    //       }
    //       if (this.founders[founder].user_profile_image != null && this.founders[founder].user_profile_image) {
    //         founderModel.imageUrl = this.founders[founder].user_profile_image;
    //       }

    //       this.foundersData.push(founderModel);

    //     }
    //   }

    //   this.founders_count = this.foundersData.length;

    // }

    // // Investor data
    // this.investors = this.resData.investors;
    // this.investorsData.splice(0, this.investorsData.length);
    // if (this.investors.length > 0) {
    //   for (var investor in this.investors) {

    //     if (this.investors[investor].user_address != null && this.investors[investor].user_address && toFilterContent == this.investors[investor].user_address) {

    //       var investorModel = new Investors();
    //       if (this.investors[investor].firstname != null && this.investors[investor].firstname) {
    //         investorModel.investorName = this.investors[investor].firstname;
    //       }
    //       if (this.investors[investor].investor_title != null && this.investors[investor].investor_title) {
    //         investorModel.title = this.investors[investor].investor_title;
    //       } else {
    //         investorModel.title = "NA";
    //       }
    //       if (this.investors[investor].title != null && this.investors[investor].title) {
    //         investorModel.organazitionName = this.investors[investor].title;
    //       } else {
    //         investorModel.organazitionName = "NA";
    //       }
    //       if (this.investors[investor].sector_most_excited != null && this.investors[investor].sector_most_excited) {
    //         investorModel.sector = this.investors[investor].sector_most_excited;
    //       }
    //       if (this.investors[investor].user_about != null && this.investors[investor].user_about) {
    //         investorModel.about = this.investors[investor].user_about;
    //       }
    //       if (this.investors[investor].user_profile_image != null && this.investors[investor].user_profile_image) {
    //         investorModel.imageUrl = this.investors[investor].user_profile_image;
    //       }

    //       this.investorsData.push(investorModel);

    //     }
    //   }

    //   this.investors_count = this.investorsData.length;

    // }

    // Startups Data
    this.startups = this.resData.startups;
    this.startupsData.splice(0, this.startupsData.length);

    if (this.startups.length > 0) {
      for (var startup in this.startups) {

        if (this.startups[startup].address1 != null && this.startups[startup].address1 && toFilterContent == this.startups[startup].address1) {
          var startupModel = new Startups();
          if (this.startups[startup].id != null && this.startups[startup].id) {
            startupModel.id = this.startups[startup].id;
          }
          if (this.startups[startup].title != null && this.startups[startup].title) {
            startupModel.startupName = this.startups[startup].title;
          }
          if (this.startups[startup].address1 != null && this.startups[startup].address1) {
            startupModel.location = this.startups[startup].address1;
          }
          if (this.startups[startup].founder_name = !null && this.startups[startup].founder_name) {
            startupModel.foundersName = this.startups[startup].founder_name;
          }
          if (this.startups[startup].startup_falls_under != null && this.startups[startup].startup_falls_under) {
            startupModel.sectors = this.startups[startup].startup_falls_under;
          }
          if (this.startups[startup].stage_are_you_in != null && this.startups[startup].stage_are_you_in) {
            startupModel.stage = this.startups[startup].stage_are_you_in;
          }
          if (this.startups[startup].select_funding_round != null && this.startups[startup].select_funding_round) {
            startupModel.foundingRound = this.startups[startup].select_funding_round;
          }
          if (this.startups[startup].past_investors != null && this.startups[startup].past_investors) {
            startupModel.investors = this.startups[startup].past_investors;
          } else {
            startupModel.investors = "NA";
          }
          if (this.startups[startup].logo_url != null && this.startups[startup].logo_url) {
            startupModel.imageUrl = this.startups[startup].logo_url;
          }
          this.startupsData.push(startupModel);
        }

      }

      this.startup_count = this.startupsData.length;

    }

    // Organization Data
    this.organizations = this.resData.organizations;
    this.organizationsData.splice(0, this.organizationsData.length);

    console.log("Anillll" + this.resData.organizations.length);

    if (this.organizations.length > 0) {
      for (var organization in this.organizations) {

        if (this.organizations[organization].address1 != null && this.organizations[organization].address1 && toFilterContent == this.organizations[organization].address1) {
          var organizationModel = new Organizations();
          if (this.organizations[organization].id != null && this.organizations[organization].id) {
            organizationModel.id = this.organizations[organization].id;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.organizationName = this.organizations[organization].title;
          }
          if (this.organizations[organization].address1 != null && this.organizations[organization].address1) {
            organizationModel.location = this.organizations[organization].address1;
          }
          if (this.organizations[organization].title != null && this.organizations[organization].title) {
            organizationModel.investors = this.organizations[organization].title;
          }

          if (this.organizations[organization].sector_most_excited != null && this.organizations[organization].sector_most_excited) {
            organizationModel.sectors = this.organizations[organization].sector_most_excited;
          }

          if (this.organizations[organization].mincheck != null && this.organizations[organization].mincheck) {
            organizationModel.minCheckSize = this.organizations[organization].mincheck;
          }

          if (this.organizations[organization].maxcheck != null && this.organizations[organization].maxcheck) {
            organizationModel.maxCheckSize = this.organizations[organization].maxcheck;
          }

          if (this.organizations[organization].which_stage_usually_invest != null && this.organizations[organization].which_stage_usually_invest) {
            organizationModel.stage = this.organizations[organization].which_stage_usually_invest;
          }
          if (this.organizations[organization].user_about != null && this.organizations[organization].user_about) {
            organizationModel.minTraction = this.organizations[organization].user_about;
          }
          if (this.organizations[organization].region_you_invest_in != null && this.organizations[organization].region_you_invest_in) {
            organizationModel.geography = this.organizations[organization].region_you_invest_in;
          }
          if (this.organizations[organization].logo_url != null && this.organizations[organization].logo_url) {
            organizationModel.imageUrl = this.organizations[organization].logo_url;
          }
          this.organizationsData.push(organizationModel);

        }

      }

      this.organization_count = this.organizationsData.length;

    }


  }

  searchByKeyword() {

    this.reset_color_change();

    var value = $('#searchBox').val();

    const body = {
      search: value
    };
        this.loading = true;
    this.commonApiService.getSearchData(body).subscribe(
      response => {
        this.loading = false;
        if (this.firstTime) {
          this.firstTime = false;

        }

        if (response.status == 200) {

          this.resData = response.json();

          if (this.resData.founders.length == 0 && this.resData.investors.length == 0 && this.resData.startups.length == 0 && this.resData.organizations.length == 0) {

            this.showError("No data found for this search", 'Oops!');

            this.founders_count = this.resData.founders.length;
            this.investors_count = this.resData.investors.length;
            this.startup_count = this.resData.startups.length;
            this.organization_count = this.resData.organizations.length;
            
          }

          // Founder data
          this.founders = this.resData.founders;

          this.foundersData.splice(0, this.foundersData.length);

          if (this.founders.length > 0) {

            for (var founder in this.founders) {

              var founderModel = new Founders();

              if (this.founders[founder].id != null && this.founders[founder].id) {
                founderModel.id = this.founders[founder].id;
              }

              if (this.founders[founder].firstname != null && this.founders[founder].firstname) {
                founderModel.founderName = this.founders[founder].firstname;
              }

              if (this.founders[founder].founder_title != null && this.founders[founder].founder_title) {
                founderModel.title = this.founders[founder].founder_title;
              }

              if (this.founders[founder].title != null && this.founders[founder].title) {
                founderModel.startupName = this.founders[founder].title;
              }

              if (this.founders[founder].user_address != null && this.founders[founder].user_address) {
                founderModel.location = this.founders[founder].user_address;
              }

              if (this.founders[founder].user_about != null && this.founders[founder].user_about) {
                founderModel.about = this.founders[founder].user_about;
              }

              if (this.founders[founder].user_profile_image != null && this.founders[founder].user_profile_image) {
                founderModel.imageUrl = this.founders[founder].user_profile_image;
              }

              this.foundersData.push(founderModel);
            }

            this.founders_count = this.foundersData.length;

          }

          // Investor data
          this.investors = this.resData.investors;

          this.investorsData.splice(0, this.investorsData.length);

          if (this.investors.length > 0) {

            for (var investor in this.investors) {

              var investorModel = new Investors();

              if (this.investors[investor].id != null && this.investors[investor].id) {
                investorModel.id = this.investors[investor].id;
              }

              if (this.investors[investor].firstname != null && this.investors[investor].firstname) {
                investorModel.investorName = this.investors[investor].firstname;
              }

              if (this.investors[investor].investor_title != null && this.investors[investor].investor_title) {
                investorModel.title = this.investors[investor].investor_title;
              } else {
                investorModel.title = "NA";
              }

              if (this.investors[investor].title != null && this.investors[investor].title) {
                investorModel.organazitionName = this.investors[investor].title;
              } else {
                investorModel.organazitionName = "NA";
              }

              if (this.investors[investor].sector_most_excited != null && this.investors[investor].sector_most_excited) {
                investorModel.sector = this.investors[investor].sector_most_excited;
              }

              if (this.investors[investor].user_about != null && this.investors[investor].user_about) {
                investorModel.about = this.investors[investor].user_about;
              }

              if (this.investors[investor].user_profile_image != null && this.investors[investor].user_profile_image) {
                investorModel.imageUrl = this.investors[investor].user_profile_image;
              }
              this.investorsData.push(investorModel);
            }

            this.investors_count = this.investorsData.length;

          }

          // Startups Data
          this.startups = this.resData.startups;

          this.startupsData.splice(0, this.startupsData.length);

          if (this.startups.length > 0) {

            for (var startup in this.startups) {

              var startupModel = new Startups();

              if (this.startups[startup].id != null && this.startups[startup].id) {
                startupModel.id = this.startups[startup].id;
              }

              if (this.startups[startup].title != null && this.startups[startup].title) {
                startupModel.startupName = this.startups[startup].title;
              }

              if (this.startups[startup].address1 != null && this.startups[startup].address1) {
                startupModel.location = this.startups[startup].address1;
              }

              if (this.startups[startup].founder_name = !null && this.startups[startup].founder_name) {
                startupModel.foundersName = this.startups[startup].founder_name;
              }

              if (this.startups[startup].startup_falls_under != null && this.startups[startup].startup_falls_under) {
                startupModel.sectors = this.startups[startup].startup_falls_under;
              }

              if (this.startups[startup].stage_are_you_in != null && this.startups[startup].stage_are_you_in) {
                startupModel.stage = this.startups[startup].stage_are_you_in;
              }

              if (this.startups[startup].select_funding_round != null && this.startups[startup].select_funding_round) {
                startupModel.foundingRound = this.startups[startup].select_funding_round;
              }

              if (this.startups[startup].past_investors != null && this.startups[startup].past_investors) {
                startupModel.investors = this.startups[startup].past_investors;
              } else {
                startupModel.investors = "NA";
              }

              if (this.startups[startup].logo_url != null && this.startups[startup].logo_url) {
                startupModel.imageUrl = this.startups[startup].logo_url;
              }
              this.startupsData.push(startupModel);

            }

            this.startup_count = this.startupsData.length;


          }


          // Organization Data
          this.organizations = this.resData.organizations;

          this.organizationsData.splice(0, this.organizationsData.length);

          if (this.organizations.length > 0) {

            for (var organization in this.organizations) {

              var organizationModel = new Organizations();

              if (this.organizations[organization].id != null && this.organizations[organization].id) {
                organizationModel.id = this.organizations[organization].id;
              }

              if (this.organizations[organization].title != null && this.organizations[organization].title) {
                organizationModel.organizationName = this.organizations[organization].title;
              }

              if (this.organizations[organization].address1 != null && this.organizations[organization].address1) {
                organizationModel.location = this.organizations[organization].address1;
              }

              if (this.organizations[organization].title != null && this.organizations[organization].title) {
                organizationModel.investors = this.organizations[organization].title;
              }

              if (this.organizations[organization].sector_most_excited != null && this.organizations[organization].sector_most_excited) {
                organizationModel.sectors = this.organizations[organization].sector_most_excited;
              }

              if (this.organizations[organization].mincheck != null && this.organizations[organization].mincheck) {
                organizationModel.minCheckSize = this.organizations[organization].mincheck;
              }

              if (this.organizations[organization].maxcheck != null && this.organizations[organization].maxcheck) {
                organizationModel.maxCheckSize = this.organizations[organization].maxcheck;
              }

              if (this.organizations[organization].which_stage_usually_invest != null && this.organizations[organization].which_stage_usually_invest) {
                organizationModel.stage = this.organizations[organization].which_stage_usually_invest;
              }

              if (this.organizations[organization].user_about != null && this.organizations[organization].user_about) {
                organizationModel.minTraction = this.organizations[organization].user_about;
              }

              if (this.organizations[organization].region_you_invest_in != null && this.organizations[organization].region_you_invest_in) {
                organizationModel.geography = this.organizations[organization].region_you_invest_in;
              }

              if (this.organizations[organization].logo_url != null && this.organizations[organization].logo_url) {
                organizationModel.imageUrl = this.organizations[organization].logo_url;
              }

              this.organizationsData.push(organizationModel);
            }

            this.organization_count = this.organizationsData.length;

          }

          if (this.resData.startup != null && this.resData.startup.length > 0) {
            $("#startup_text").css("font-weight", "600");
            $("#founder_text").css("font-weight", "400");
            $("#investor_text").css("font-weight", "400");
            $("#organization_text").css("font-weight", "400");


            $("#panel-group-startup").css("display", "");
            $("#panel-group-investor").css("display", "none");
            $("#panel-group-organization").css("display", "none");
            $("#panel-group-founder").css("display", "none");
          }
          else if (this.resData.founders != null && this.resData.founders.length > 0) {

            $("#startup_text").css("font-weight", "400");
            $("#founder_text").css("font-weight", "600");
            $("#investor_text").css("font-weight", "400");
            $("#organization_text").css("font-weight", "400");


            $("#panel-group-startup").css("display", "none");
            $("#panel-group-investor").css("display", "none");
            $("#panel-group-organization").css("display", "none");
            $("#panel-group-founder").css("display", "");

          } else if (this.resData.investors != null && this.resData.investors.length > 0) {

            $("#startup_text").css("font-weight", "400");
            $("#founder_text").css("font-weight", "400");
            $("#investor_text").css("font-weight", "600");
            $("#organization_text").css("font-weight", "400");


            $("#panel-group-startup").css("display", "none");
            $("#panel-group-investor").css("display", "");
            $("#panel-group-organization").css("display", "none");
            $("#panel-group-founder").css("display", "none");

          } else if (this.resData.organizations != null && this.resData.organizations.length > 0) {

            $("#startup_text").css("font-weight", "400");
            $("#founder_text").css("font-weight", "400");
            $("#investor_text").css("font-weight", "400");
            $("#organization_text").css("font-weight", "600");


            $("#panel-group-startup").css("display", "none");
            $("#panel-group-investor").css("display", "none");
            $("#panel-group-organization").css("display", "");
            $("#panel-group-founder").css("display", "none");

          }


        } else if (response.status == 400) {
          this.showError(response.json().msg, 'Oops!');
        }

      }, error => {
        this.loading = false;
        this.resData = error.json();
        this.showError(JSON.stringify(this.resData.msg), 'Oops!');

      }


    );


  }

  showSuccess(message, header) {
    this.toastr.success(message, header);
  }

  showError(message, header) {
    this.toastr.error(message, header);
  }

  goToHome() {
    this.router.navigate(['']);
  }

  stageClicked_color_change() {

    $("#stage").css("border-color", "#4bffc8");
    $("#sector").css("border-color", "#4b4f58");
    $("#location_button").css("border-color", "#4b4f58");
  }

  sectorClicked_color_change() {

    $("#stage").css("border-color", "#4b4f58");
    $("#sector").css("border-color", "#4bffc8");
    $("#location_button").css("border-color", "#4b4f58");
  }

  locationClicked_color_change() {

    $("#stage").css("border-color", "#4b4f58");
    $("#sector").css("border-color", " #4b4f58");
    $("#location_button").css("border-color", "#4bffc8");
  }

  reset_color_change() {

    $("#stage").css("border-color", "#4b4f58");
    $("#sector").css("border-color", "#4b4f58");
    $("#location_button").css("border-color", "#4b4f58");
  }

}