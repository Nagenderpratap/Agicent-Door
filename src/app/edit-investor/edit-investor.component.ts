import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Pipe, PipeTransform, ViewContainerRef, ViewChild } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CommonapiService } from "../services/commonapi.service";
import { selectedItems } from './seletedItems';

@Component({
    selector: 'app-edit-investor',
    templateUrl: './edit-investor.component.html',
    styleUrls: ['./edit-investor.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class EditInvestorComponent implements OnInit {


    public userName_api: any;
    public pastInvestments_api: any;
    public exitOrganization_api: any;
    public existing_organization: any;
    public title: any;
    public username: any = "";
    public personal_url: any = "";
    public tip_founder: any = "";
    public fundname: any;
    public organization_url: any;
    public about: any;
    public fund_size: any = "";
    public min_check: any;
    public max_check: any;
    public align: any = "N";
    public past_investment: any = "";
    public res: any;
    public lat_investor: any;
    lng_investor: any;
    address_investor: any;
    public lat_organization: any;
    lng_organization: any;
    address_organization: any;
    username_thedoor_check: any = "";
    no_exits: any = "";
    //cropper var
    data: any;
    data2: any;
    data3: any;
    data4: any;
    cropperSettings: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    cropperSettings2: CropperSettings;
    public resData: any;
    investorBio: any;
    public loading = false;

    public selectAll: any;
    public deselectAll: any;
    public selectAll_most: any;
    public deselectAll_most: any;
    public selectAll_region: any;
    public deselectAll_region: any;
    public selectAll_round: any;
    public deselectAll_round: any;
    public selectAll_invest: any;
    public deselectAll_invest: any;

    userModel = JSON.parse(localStorage.getItem("userModel"));


    public userSettings: any = {
        showCurrentLocation: false,
        resOnSearchButtonClickOnly: false,
        inputPlaceholderText: 'Enter Location',
        recentStorageName: 'componentData3',
        inputString: this.userModel.root_user.user_address,
        showSearchButton: false,
        showRecentSearch: false

    };

    public userSettingsOrg: any = {
        showCurrentLocation: false,
        resOnSearchButtonClickOnly: false,
        inputPlaceholderText: 'Enter Location',
        recentStorageName: 'componentData3',
        inputString: this.userModel.investor_company_details.address1,
        showSearchButton: false,
        showRecentSearch: false

    };


    @ViewChild('cropper', undefined)
    @ViewChild('data', undefined)
    @ViewChild('cropper2', undefined)
    @ViewChild('data2', undefined)
    @ViewChild('cropper3', undefined)
    @ViewChild('data3', undefined)
    @ViewChild('cropper4', undefined)
    @ViewChild('data4', undefined)
    cropper: ImageCropperComponent;

    constructor(public toastr: ToastsManager, public vcr: ViewContainerRef, private activatedRoute: ActivatedRoute,
        private commonApiService: CommonapiService, public router: Router) {

        var jwttoken = this.userModel.root_user.jwt_token;


        this.commonApiService.getUsers(jwttoken).subscribe(
            response => {
                this.resData = JSON.stringify(response.result);
                console.log(response);
                this.userName_api = response;


            }, err => {
                this.resData = JSON.stringify(err);
                console.log(this.resData);
            }
        )

        this.commonApiService.getPastInvestments(jwttoken).subscribe(
            response => {
                this.resData = JSON.stringify(response.result);
                console.log(response);
                this.pastInvestments_api = response;


            }, err => {
                this.resData = JSON.stringify(err);
                console.log(this.resData);
            }
        )

        this.commonApiService.getPastInvestors(jwttoken).subscribe(
            response => {
                this.resData = JSON.stringify(response.result);
                console.log(response);
                this.exitOrganization_api = response;


            }, err => {
                this.resData = JSON.stringify(err);
                console.log(this.resData);
            }
        )


        this.toastr.setRootViewContainerRef(vcr);

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 470;
        this.cropperSettings.height = 170;
        this.cropperSettings.croppedWidth = 470;
        this.cropperSettings.croppedHeight = 170;
        this.cropperSettings.canvasWidth = 470;
        this.cropperSettings.canvasHeight = 170;
        this.cropperSettings.minWithRelativeToResolution = false;
        this.cropperSettings.minWidth = 470;
        this.cropperSettings.minHeight = 170;
        this.cropperSettings.cropperDrawSettings.strokeWidth = 500;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'transparent';

        this.cropperSettings2 = new CropperSettings();
        this.cropperSettings2.width = 200;
        this.cropperSettings2.height = 200;
        this.cropperSettings2.croppedWidth = 150;
        this.cropperSettings2.croppedHeight = 150;
        this.cropperSettings2.canvasWidth = 470;
        this.cropperSettings2.canvasHeight = 200;
        //  this.cropperSettings2.minWithRelativeToResolution=false;
        this.cropperSettings2.minWidth = 10;
        this.cropperSettings2.minHeight = 10;
        this.cropperSettings2.rounded = true;
        this.cropperSettings2.keepAspect = true;
        this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings2.cropperDrawSettings.strokeWidth = 0;
        //  this.cropperSettings2.cropperDrawSettings.strokeColor='transparent';
        this.data = {};
        this.data2 = {};
        this.data3 = {};
        this.data4 = {};


    }

    auto_location_data: any = "";
    auto_location_data2: any = "";
    field: string = "";
    heroImageUrl = "";
    heroImageUrl4 = "assets/user_placeholder.png";
    heroImageUrl3 = "";
    heroImageUrl2 = "assets/organization_placeholder.png";
    lead_item = "";
    sector_item = '';
    stage_item = "";
    fund_item = "";
    region_item = '';
    round_item = "";
    align2 = false;
    traction_item = "";

    dropdownList = [];
    dropdownList2 = [];
    dropdownList3 = [];
    dropdownList4 = [];
    dropdownList5 = [];

    selectedItems = [];
    selectedItems2 = [];
    selectedItems3 = [];
    selectedItems4 = [];
    selectedItems5 = [];

    dropdownSettings = {};
    dropdownSettings2 = {};
    dropdownSettings3 = {};
    dropdownSettings4 = {};
    dropdownSettings5 = {};


    /*Lead Options */
    leads = [
        { value: 'Yes', viewValue: 'Yes' },
        { value: 'No', viewValue: 'No' },
    ];

    /*SECTOR DATA*/
    sectors = [
        { value: 'All', viewValue: 'All' },
        { value: 'Artificial Intelligence', viewValue: 'Artificial Intelligence' },
        { value: 'AdTech', viewValue: 'AdTech' },
        { value: 'Automotive', viewValue: 'Automotive' },
        { value: 'B2B', viewValue: 'B2B' },
        { value: 'B2C', viewValue: 'B2C' },
        { value: 'Beauty', viewValue: 'Beauty' },
        { value: 'Big Data', viewValue: 'Big Data' },
        { value: 'Biometrics', viewValue: 'Biometrics' },
        { value: 'Blockchain', viewValue: 'Blockchain' },
        { value: 'CleanTech', viewValue: 'CleanTech' },
        { value: 'Consumer Lifestyle', viewValue: 'Consumer Lifestyle' },
        { value: 'Cryptocurrency', viewValue: 'Cryptocurrency' },
        { value: 'Drones', viewValue: 'Drones' },
        { value: 'E-commerce', viewValue: 'E-commerce' },
        { value: 'EdTech', viewValue: 'EdTech' },
        { value: 'Enterprise Software', viewValue: 'Enterprise Software' },
        { value: 'Fashion', viewValue: 'Fashion' },
        { value: 'GovTech', viewValue: 'GovTech' },
        { value: 'HealthTech', viewValue: 'HealthTech' },
        { value: 'Industrial Tech', viewValue: 'Industrial Tech' },
        { value: 'Internet of Things', viewValue: 'Internet of Things' },
        { value: 'Fintech', viewValue: 'Fintech' },
        { value: 'Food Analytics and Tech', viewValue: 'Food Analytics and Tech' },
        { value: 'Fraud Detection Software', viewValue: 'Fraud Detection Software' },
        { value: 'LegalTech', viewValue: 'LegalTech' },
        { value: 'LoveTech', viewValue: 'LoveTech' },
        { value: 'Retail', viewValue: 'Retail' },
        { value: 'Robotics', viewValue: 'Robotics' },
        { value: 'Sharing Economy', viewValue: 'Sharing Economy' },
        { value: 'Social Enterprise', viewValue: 'Social Enterprise' },
        { value: 'UrbanTech', viewValue: 'UrbanTech' },
        { value: 'Virtual Reality', viewValue: 'Virtual Reality' },
        { value: 'Other', viewValue: 'Other' },
    ];

    /*STAGES DATA*/
    stages = [
        { value: 'Idea', viewValue: 'Idea' },
        { value: 'Prototype/MVP', viewValue: 'Prototype/MVP' },
        { value: 'Live - No traction', viewValue: 'Live - No traction' },
        { value: 'Revenue traction', viewValue: 'Revenue traction' },
        { value: 'User traction', viewValue: 'User traction' },
    ];


    /*FUND DATA*/
    funds = [
        { value: 'Accelerator Program', viewValue: 'Accelerator Program' },
        { value: 'Angel Group', viewValue: 'Angel Group' },
        { value: 'Foundation Startup Program', viewValue: 'Foundation Startup Program' },
        { value: 'Corporate Fund', viewValue: 'Corporate Fund' },
        { value: 'Government Startup Program', viewValue: 'Government Startup Program' },
        { value: 'Sovereign Fund', viewValue: 'Sovereign Fund' },
        { value: 'University Startup Program', viewValue: 'University Startup Program' },
        { value: 'Venture Fund', viewValue: 'Venture Fund' },
    ];



    /*ROUNDS DATA*/
    rounds = [
        { value: 'Pre-seed', viewValue: 'Pre-seed' },
        { value: 'Seed', viewValue: 'Seed' },
        { value: 'Series A', viewValue: 'Series A' },
        { value: 'Series B', viewValue: 'Series B' },
        { value: 'Series C', viewValue: 'Series C' },
        { value: 'Series D', viewValue: 'Series D' },
        { value: 'Series +', viewValue: 'Series +' },
    ];

    /*TRACTION DATA*/
    tractions = [
        { value: '$0', viewValue: '$0' },
        { value: '$10,000-$25,000', viewValue: '$10,000-$25,000' },
        { value: '$25,000-$50,000', viewValue: '$25,000-$50,000' },
        { value: '$50,000-$100,000', viewValue: '$50,000-$100,000' },
        { value: '$100,000-$250,000', viewValue: '$100,000-$250,000' },
        { value: '$250,000-$500,000', viewValue: '$250,000-$500,000' },
        { value: '$500,000-$1,000,000', viewValue: '$500,000-$1,000,000' },
        { value: '$1,000,000+', viewValue: '$1,000,000+' },
    ];


    ngOnInit() {
        window.scroll(0, 0);

        this.dropdownList = [
            { id: '2', itemName: 'Artificial Intelligence' },
            { id: '3', itemName: 'AdTech' },
            { id: '4', itemName: 'Automotive' },
            { id: '5', itemName: 'B2B' },
            { id: '6', itemName: 'B2C' },
            { id: '7', itemName: 'Beauty' },
            { id: '8', itemName: 'Big Data' },
            { id: '9', itemName: 'Biometrics' },
            { id: '10', itemName: 'Blockchain' },
            { id: '11', itemName: 'CleanTech' },
            { id: '12', itemName: 'Consumer Lifestyle' },
            { id: '13', itemName: 'Cryptocurrency' },
            { id: '14', itemName: 'Drones' },
            { id: '15', itemName: 'E-commerce' },
            { id: '16', itemName: 'EdTech' },
            { id: '17', itemName: 'Enterprise Software' },
            { id: '18', itemName: 'Fashion' },
            { id: '19', itemName: 'GovTech' },
            { id: '20', itemName: 'HealthTech' },
            { id: '21', itemName: 'Industrial Tech' },
            { id: '22', itemName: 'Internet of Things' },
            { id: '23', itemName: 'Fintech' },
            { id: '24', itemName: 'Food Analytics and Tech' },
            { id: '25', itemName: 'Fraud Detection Software' },
            { id: '26', itemName: 'LegalTech' },
            { id: '27', itemName: 'LoveTech' },
            { id: '28', itemName: 'Retail' },
            { id: '29', itemName: 'Robotics' },
            { id: '30', itemName: 'Sharing Economy' },
            { id: '31', itemName: 'Social Enterprise' },
            { id: '32', itemName: 'UrbanTech' },
            { id: '33', itemName: 'Virtual Reality' },
            { id: '34', itemName: 'Other' },
        ];
        this.dropdownList2 = [
            { id: '2', itemName: 'Artificial Intelligence' },
            { id: '3', itemName: 'AdTech' },
            { id: '4', itemName: 'Automotive' },
            { id: '5', itemName: 'B2B' },
            { id: '6', itemName: 'B2C' },
            { id: '7', itemName: 'Beauty' },
            { id: '8', itemName: 'Big Data' },
            { id: '9', itemName: 'Biometrics' },
            { id: '10', itemName: 'Blockchain' },
            { id: '11', itemName: 'CleanTech' },
            { id: '12', itemName: 'Consumer Lifestyle' },
            { id: '13', itemName: 'Cryptocurrency' },
            { id: '14', itemName: 'Drones' },
            { id: '15', itemName: 'E-commerce' },
            { id: '16', itemName: 'EdTech' },
            { id: '17', itemName: 'Enterprise Software' },
            { id: '18', itemName: 'Fashion' },
            { id: '19', itemName: 'GovTech' },
            { id: '20', itemName: 'HealthTech' },
            { id: '21', itemName: 'Industrial Tech' },
            { id: '22', itemName: 'Internet of Things' },
            { id: '23', itemName: 'Fintech' },
            { id: '24', itemName: 'Food Analytics and Tech' },
            { id: '25', itemName: 'Fraud Detection Software' },
            { id: '26', itemName: 'LegalTech' },
            { id: '27', itemName: 'LoveTech' },
            { id: '28', itemName: 'Retail' },
            { id: '29', itemName: 'Robotics' },
            { id: '30', itemName: 'Sharing Economy' },
            { id: '31', itemName: 'Social Enterprise' },
            { id: '32', itemName: 'UrbanTech' },
            { id: '33', itemName: 'Virtual Reality' },
            { id: '34', itemName: 'Other' },
        ];
        this.dropdownList3 = [
            { id: '2', itemName: 'Artificial Intelligence' },
            { id: '3', itemName: 'AdTech' },
            { id: '4', itemName: 'Automotive' },
            { id: '5', itemName: 'B2B' },
            { id: '6', itemName: 'B2C' },
            { id: '7', itemName: 'Beauty' },
            { id: '8', itemName: 'Big Data' },
            { id: '9', itemName: 'Biometrics' },
            { id: '10', itemName: 'Blockchain' },
            { id: '11', itemName: 'CleanTech' },
            { id: '12', itemName: 'Consumer Lifestyle' },
            { id: '13', itemName: 'Cryptocurrency' },
            { id: '14', itemName: 'Drones' },
            { id: '15', itemName: 'E-commerce' },
            { id: '16', itemName: 'EdTech' },
            { id: '17', itemName: 'Enterprise Software' },
            { id: '18', itemName: 'Fashion' },
            { id: '19', itemName: 'GovTech' },
            { id: '20', itemName: 'HealthTech' },
            { id: '21', itemName: 'Industrial Tech' },
            { id: '22', itemName: 'Internet of Things' },
            { id: '23', itemName: 'Fintech' },
            { id: '24', itemName: 'Food Analytics and Tech' },
            { id: '25', itemName: 'Fraud Detection Software' },
            { id: '26', itemName: 'LegalTech' },
            { id: '27', itemName: 'LoveTech' },
            { id: '28', itemName: 'Retail' },
            { id: '29', itemName: 'Robotics' },
            { id: '30', itemName: 'Sharing Economy' },
            { id: '31', itemName: 'Social Enterprise' },
            { id: '32', itemName: 'UrbanTech' },
            { id: '33', itemName: 'Virtual Reality' },
            { id: '34', itemName: 'Other' },
        ];

        this.dropdownList5 = [
            { id: '1', itemName: 'Pre-seed' },
            { id: '2', itemName: 'Seed' },
            { id: '3', itemName: 'Series A' },
            { id: '4', itemName: 'Series B' },
            { id: '5', itemName: 'Series C' },
            { id: '6', itemName: 'Series D' },
            { id: '7', itemName: 'Series +' },

        ];
        /*REGIONS DATA*/
        this.dropdownList4 = [
            { id: '1', itemName: 'Africa' },
            { id: '2', itemName: 'Asia Pacific' },
            { id: '3', itemName: 'Europe' },
            { id: '4', itemName: 'Middle East' },
            { id: '5', itemName: 'North America' },
            { id: '6', itemName: 'South America' },
        ];

        this.dropdownSettings = {
            singleSelection: false,
            text: "Select",
            enableSearchFilter: false,
            classes: "selected-list c-btn",
            badgeShowLimit: 2,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',

        };

        this.dropdownSettings2 = {
            singleSelection: false,
            text: "Select",
            enableSearchFilter: false,
            classes: "selected-list c-btn",
            badgeShowLimit: 2,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All'
        };
        this.dropdownSettings3 = {
            singleSelection: false,
            text: "Select",
            enableSearchFilter: false,
            classes: "selected-list c-btn",
            badgeShowLimit: 2,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All'
        };

        this.dropdownSettings4 = {
            singleSelection: false,
            text: "Select",
            enableSearchFilter: false,
            classes: "selected-list c-btn",
            badgeShowLimit: 2,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All'
        };

        this.dropdownSettings5 = {
            singleSelection: false,
            text: "Select",
            enableSearchFilter: false,
            classes: "selected-list c-btn",
            badgeShowLimit: 2,

        };

        // setting 1st page data

        // set user title
        if (this.userModel.investor_details.investor_title != null && this.userModel.investor_details.investor_title) {
            this.title = this.userModel.investor_details.investor_title;
        }
        // set user address
        if (this.userModel.root_user.user_address != null && this.userModel.root_user.user_address) {
            this.address_investor = this.userModel.root_user.user_address;
            this.lat_investor = this.userModel.root_user.user_latitude;
            this.lng_investor = this.userModel.root_user.user_longitude;
        }
        // set username
        if (this.userModel.root_user.username != null && this.userModel.root_user.username) {
            this.username = this.userModel.root_user.username;
            this.username_thedoor_check = this.userModel.root_user.username;

        }
        // set user about
        if (this.userModel.root_user.user_about != null && this.userModel.root_user.user_about) {
            this.investorBio = this.userModel.root_user.user_about;
        }
        // set user profile image
        if (this.userModel.root_user.user_profile_image != null && this.userModel.root_user.user_profile_image) {
            this.heroImageUrl = this.userModel.root_user.user_profile_image;
        }
        // set user background image
        if (this.userModel.root_user.user_hero_image != null && this.userModel.root_user.user_hero_image) {
            this.heroImageUrl4 = this.userModel.root_user.user_hero_image;
        }
        // set user personal url
        if (this.userModel.investor_details.personalUrl != null && this.userModel.investor_details.personalUrl) {
            this.personal_url = this.userModel.investor_details.personalUrl;
        }
        // set tip for founder
        if (this.userModel.investor_details.tipsForFounder != null && this.userModel.investor_details.tipsForFounder) {
            this.tip_founder = this.userModel.investor_details.tipsForFounder;
        }
        // set least excited area
        if (this.userModel.investor_details.sector_least_excited != null && this.userModel.investor_details.sector_least_excited) {
            var stringToSplit = this.userModel.investor_details.sector_least_excited;
            if (stringToSplit.indexOf(',') >= 0) {
                var splittedString = stringToSplit.split(',');
                if (stringToSplit != null && stringToSplit.length > 0) {

                    for (var oneDropdown in this.dropdownList2) {
                        if (stringToSplit.trim().indexOf(this.dropdownList2[oneDropdown].itemName) > -1) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList2[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList2[oneDropdown].itemName;
                            this.selectedItems2.push(selectedItemsModel);
                        }
                    }
                    this.selectAll = this.selectedItems2.length;
                }
            } else {
                if (stringToSplit.trim() == "All") {
                    this.selectedItems2 = this.dropdownList2;
                    this.selectAll = this.selectedItems2.length;
                } else {
                    for (var oneDropdown in this.dropdownList2) {
                        if (stringToSplit.trim() == this.dropdownList2[oneDropdown].itemName) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList2[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList2[oneDropdown].itemName;
                            this.selectedItems2.push(selectedItemsModel);
                        }
                    }
                    this.selectAll = this.selectedItems2.length;
                }
            }
        }
        // set most excited area
        if (this.userModel.investor_details.sector_most_excited != null && this.userModel.investor_details.sector_most_excited) {
            var stringToSplit = this.userModel.investor_details.sector_most_excited;
            if (stringToSplit.indexOf(',') >= 0) {
                var splittedString = stringToSplit.split(',');
                if (stringToSplit != null && stringToSplit.length > 0) {
                    for (var oneDropdown in this.dropdownList) {
                        if (stringToSplit.trim().indexOf(this.dropdownList[oneDropdown].itemName) > -1) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList[oneDropdown].itemName;
                            this.selectedItems.push(selectedItemsModel);
                        }
                    }
                    this.selectAll_most = this.selectedItems.length;
                }
            } else {
                if (stringToSplit.trim() == "All") {
                    this.selectedItems = this.dropdownList;
                    this.selectAll_most = this.selectedItems.length;
                } else {
                    for (var oneDropdown in this.dropdownList2) {
                        if (stringToSplit.trim() == this.dropdownList2[oneDropdown].itemName) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList2[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList2[oneDropdown].itemName;
                            this.selectedItems.push(selectedItemsModel);
                        }
                    }
                    this.selectAll_most = this.selectedItems.length;
                }
            }
        }

        // setting 2nd page data

        // set organization name
        if (this.userModel.investor_company_details.title != null && this.userModel.investor_company_details.title) {
            this.fundname = this.userModel.investor_company_details.title;
        }
        // set organization address
        if (this.userModel.investor_company_details.address1 != null && this.userModel.investor_company_details.address1) {
            this.address_organization = this.userModel.investor_company_details.address1;
            this.lat_organization = this.userModel.investor_company_details.latitude;
            this.lng_organization = this.userModel.investor_company_details.longitude
        }

        // set organization about
        if (this.userModel.investor_company_details.startup_desc != null && this.userModel.investor_company_details.startup_desc) {
            this.about = this.userModel.investor_company_details.startup_desc;
        }
        // set website url
        if (this.userModel.investor_company_details.website_url != null && this.userModel.investor_company_details.website_url) {
            this.organization_url = this.userModel.investor_company_details.website_url;
        }
        // set background image
        if (this.userModel.investor_company_details.hero_logo_url != null && this.userModel.investor_company_details.hero_logo_url) {
            this.heroImageUrl3 = this.userModel.investor_company_details.hero_logo_url;
        }
        // set fund image
        if (this.userModel.investor_company_details.logo_url != null && this.userModel.investor_company_details.logo_url) {
            this.heroImageUrl2 = this.userModel.investor_company_details.logo_url;
        }
        // set min check size
        if (this.userModel.investor_company_details.mincheck != null && this.userModel.investor_company_details.mincheck) {
            this.min_check = this.userModel.investor_company_details.mincheck;
        }
        // set max check size
        if (this.userModel.investor_company_details.maxcheck != null && this.userModel.investor_company_details.maxcheck) {
            this.max_check = this.userModel.investor_company_details.maxcheck;
        }
        // set fund category
        if (this.userModel.investor_company_details.fund_category != null && this.userModel.investor_company_details.fund_category) {
            this.fund_item = this.userModel.investor_company_details.fund_category;
        }
        // set fund size
        if (this.userModel.investor_company_details.fund_size != null && this.userModel.investor_company_details.fund_size) {
            this.fund_size = this.userModel.investor_company_details.fund_size;
        }
        // set region you invest in
        if (this.userModel.investor_company_details.region_you_invest_in != null && this.userModel.investor_company_details.region_you_invest_in) {
            var stringToSplit = this.userModel.investor_company_details.region_you_invest_in;
            if (stringToSplit.indexOf(',') >= 0) {
                var splittedString = stringToSplit.split(',');
                if (stringToSplit != null && stringToSplit.length > 0) {

                    for (var oneDropdown in this.dropdownList4) {
                        if (stringToSplit.trim().indexOf(this.dropdownList4[oneDropdown].itemName) > -1) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList4[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList4[oneDropdown].itemName;
                            this.selectedItems4.push(selectedItemsModel);
                        }
                    }
                    this.selectAll_region = this.selectedItems4.length;
                }
            } else {
                if (stringToSplit.trim() == "All") {
                    this.selectedItems4 = this.dropdownList4;
                    this.selectAll_region = this.selectedItems4.length;
                } else {
                    for (var oneDropdown in this.dropdownList4) {
                        if (stringToSplit.trim() == this.dropdownList4[oneDropdown].itemName) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList4[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList4[oneDropdown].itemName;
                            this.selectedItems4.push(selectedItemsModel);
                        }
                    }
                    this.selectAll_region = this.selectedItems4.length;
                }
            }
        }
        // set lead
        if (this.userModel.investor_company_details.lead != null && this.userModel.investor_company_details.lead) {
            this.lead_item = this.userModel.investor_company_details.lead;
        }
        // set sector invest
        if (this.userModel.investor_details.intrested_area != null && this.userModel.investor_details.intrested_area) {
            var stringToSplit = this.userModel.investor_details.intrested_area;
            if (stringToSplit.indexOf(',') >= 0) {
                var splittedString = stringToSplit.split(',');
                if (stringToSplit != null && stringToSplit.length > 0) {
                    for (var oneDropdown in this.dropdownList3) {
                        if (stringToSplit.trim().indexOf(this.dropdownList3[oneDropdown].itemName) > -1) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList3[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList3[oneDropdown].itemName;
                            this.selectedItems3.push(selectedItemsModel);
                        }
                    }
                    this.selectAll_invest = this.selectedItems3.length;
                }
            } else {
                if (stringToSplit.trim() == "All") {
                    this.selectedItems3 = this.dropdownList3;
                    this.selectAll_invest = this.selectedItems3.length;
                } else {
                    for (var oneDropdown in this.dropdownList3) {
                        if (stringToSplit.trim() == this.dropdownList3[oneDropdown].itemName) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList3[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList3[oneDropdown].itemName;
                            this.selectedItems3.push(selectedItemsModel);
                        }
                    }
                    this.selectAll_invest = this.selectedItems3.length;
                }
            }
        }
        // set round invest
        if (this.userModel.investor_details.which_stage_usually_invest != null && this.userModel.investor_details.which_stage_usually_invest) {
            var stringToSplit = this.userModel.investor_details.which_stage_usually_invest;
            if (stringToSplit.indexOf(',') >= 0) {
                var splittedString = stringToSplit.split(',');
                if (stringToSplit != null && stringToSplit.length > 0) {
                    for (var oneDropdown in this.dropdownList5) {
                        if (stringToSplit.trim().indexOf(this.dropdownList5[oneDropdown].itemName) > -1) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList5[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList5[oneDropdown].itemName;
                            this.selectedItems5.push(selectedItemsModel);
                        }
                    }
                    this.selectAll_round = this.selectedItems5.length;
                }
            } else {
                if (stringToSplit.trim() == "All") {
                    this.selectedItems5 = this.dropdownList5;
                    this.selectAll_round = this.selectedItems5.length;
                } else {
                    for (var oneDropdown in this.dropdownList5) {
                        if (stringToSplit.trim() == this.dropdownList5[oneDropdown].itemName) {
                            var selectedItemsModel = new selectedItems();
                            selectedItemsModel.id = this.dropdownList5[oneDropdown].id;
                            selectedItemsModel.itemName = this.dropdownList5[oneDropdown].itemName;
                            this.selectedItems5.push(selectedItemsModel);
                        }
                    }
                    this.selectAll_round = this.selectedItems5.length;
                }
            }
        }
        // set require traction-align
        if (this.userModel.investor_company_details.traction_align != null && this.userModel.investor_company_details.traction_align) {
            var traction_align_check = this.userModel.investor_company_details.traction_align;
            if (traction_align_check == "Y") {
                this.align2 = true;
                this.align = 'Y';
            } else {
                this.align2 = false;
                this.align = 'N';
            }
        }
        // set require traction_item
        if (this.userModel.investor_company_details.traction_item != null && this.userModel.investor_company_details.traction_item) {
            this.traction_item = this.userModel.investor_company_details.traction_item;
        }
        // set exits
        if (this.userModel.investor_details.exits != null && this.userModel.investor_details.exits) {
            this.no_exits = this.userModel.investor_details.exits;
        }
        // set past investments
        if (this.userModel.investor_company_details.past_investments != null && this.userModel.investor_company_details.past_investments) {
            this.past_investment = this.userModel.investor_company_details.past_investments;
        }
    }
    autoCompleteCallback(selectedData: any) {
        this.auto_location_data = selectedData.data;
        console.log('data' + this.auto_location_data);
        this.address_investor = this.auto_location_data.formatted_address;
        console.log(this.address_investor)
        this.lat_investor = this.auto_location_data.geometry.location.lat
        this.lng_investor = this.auto_location_data.geometry.location.lng;

    }

    autoCompleteCallback2(selectedData: any) {
        this.auto_location_data2 = selectedData.data;

        this.address_organization = this.auto_location_data2.formatted_address;
        this.lat_organization = this.auto_location_data2.geometry.location.lat
        this.lng_organization = this.auto_location_data2.geometry.location.lng;

    }

    ngAfterViewInit() {

        // Steppers                
        $(document).ready(function () {

            var navListItems = $('div.setup-panel-2 div a'),
                allWells = $('.setup-content-2'),
                allNextBtn = $('.nextBtn-2'),
                allPrevBtn = $('.prevBtn-2');

            allWells.hide();

            // function vishad() {
            //     allNextBtn = $('.nextBtn-2');
            // }

            // navListItems.click(function (e) {
            $(document).on('click', 'div.setup-panel-2 div a', function (e) {
                // alert('omg');
                e.preventDefault();
                var $target = $($(this).attr('href')),
                    $item = $(this);

                if (!$item.hasClass('disabled')) {
                    navListItems.removeClass('btn-amber').addClass('btn-blue-grey');
                    $item.addClass('btn-amber');
                    allWells.hide();
                    $target.show();
                    $target.find('input:eq(0)').focus();
                }
            });

            $('div.setup-panel-2 div a.btn-amber').trigger('click');
        });




        $('.custom-autocomplete__input input').attr("placeholder", "Enter  location").addClass('your-class').css("color", "#4b4f58");
        $(".mat-select-value").css("color", "#858b95");
        $(".mat-select-value").click(function () {
            if ($(".mat-option-text").select()) {

                $(this).css("color", "#4b4f58")
            } else {

            }
        });

        /* steppers color */
        $(".step-4").css("background-color", "#1EFFFE");
        $(".step-7").css("background-color", "white");

        $('#part1-next').click(function () {
            // $(".step-4").css("background-color", "blue");
            // $(".step-7").css("background-color", "#1EFFFE");
        });



        $('#part3-prev').click(function () {
            $(".step-4").css("background-color", "#1EFFFE");
            $(".step-7").css("background-color", "white");
            $(".startup_button").css("display", "none");
            $(".startup_button2").css("display", "none");
            $(".or_txt").css("display", "none");
        });

        /*Validation color functionality start here */
        //part1
        $('#bio').on('keyup', function () {
            if ($('#bio').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#title').on('keyup', function () {
            if ($('#title').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#username').on('keyup', function () {
            if ($('#username').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', ' #search_places', function () {
            if ($('#search_places').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        })
        $(document).on('blur', '.demo #search_places', function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });
        //part-2
        $('#fundname').on('keyup', function () {
            if ($('#fundname').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#organization_url').on('keyup', function () {
            if ($('#organization_url').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#about').on('keyup', function () {
            if ($('#about').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '.demo_location #search_places', function () {
            $('.demo_location #search_places').css('border-bottom', 'solid 2px blue');
        })
        $(document).on('blur', '.demo_location #search_places', function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });
        $('#fund_category').on('keyup', function () {
            if ($('#fund_category').val() != "") {
                $('.fund_cat .mat-form-field-underline').css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $('.fund_cat .mat-form-field-underline').css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#round').on('keyup', function () {
            if ($('#round').val() != "") {
                $('.round_invst .mat-form-field-underline').css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $('.round_invst .mat-form-field-underline').css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#minimum_check').on('keyup', function () {
            if ($('#minimum_check').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#max_check').on('keyup', function () {
            if ($('#max_check').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        // if (sector == "" || sector == "[]") {
        //     count++;
        //     $('.demo3 .selected-list[_ngcontent-c11] .c-btn[_ngcontent-c11]').css('border-bottom', 'solid 2px red');

        // }

        /*Validation color functionality end here */

    }

    /* start upload image function */
    readUrl(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.heroImageUrl = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    readUrl2(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.heroImageUrl2 = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    readUrl3(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.heroImageUrl3 = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    readUrl4(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.heroImageUrl4 = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }


    onclick() {
        $('#fileInput').trigger('click');
    }

    onclick2() {
        $('#fileInput2').trigger('click');
    }

    onclick3() {
        $('#fileInput3').trigger('click');
    }

    onclick4() {
        $('#fileInput4').trigger('click');
    }

    /* end upload image function */

    yes_align() {
        this.align2 = true;

    }
    no_align() {
        this.align2 = false;

    }


    onSelectAll_most(event: any) {
        this.selectAll_most = event.length;
        console.log(this.selectAll_most);
    }
    onDeSelectAll_most(event: any) {
        this.deselectAll_most = event.length;
        console.log(this.deselectAll_most);
    }

    onSelectAll_least(event: any) {
        this.selectAll = event.length;
        console.log(this.selectAll);
    }
    onDeSelectAll_least(event: any) {
        this.deselectAll = event.length;
        console.log(this.deselectAll);
    }

    onSelectAll_region(event: any) {
        this.selectAll_region = event.length;
        console.log(this.selectAll_region);
    }
    onDeSelectAll_region(event: any) {
        this.deselectAll_region = event.length;
        console.log(this.deselectAll_region);
    }
    public least: string = "";
    public most: string = "";
    public region: string = "";

    next_button() {


        this.least = "";
        this.most = "";

        if (this.selectedItems2.length == this.selectAll || this.selectedItems2.length == this.dropdownList2.length) {
            this.least = "All" + ", ";
            this.selectAll = ""
        }
        else {
            for (var l = 0; l < this.selectedItems2.length; l++) {

                this.least = this.least + this.selectedItems2[l].itemName + ", ";

            }
        }

        if (this.selectedItems.length == this.selectAll_most || this.selectedItems2.length == this.dropdownList.length) {
            this.most = "All" + ", ";
            this.selectAll_most = ""
        }
        else {
            for (var l = 0; l < this.selectedItems.length; l++) {

                this.most = this.most + this.selectedItems[l].itemName + ", ";

            }

        }


        var count: number = 0;
        var c = JSON.stringify(this.selectedItems);
        var c2 = JSON.stringify(this.selectedItems2);
        var title = $('#title').val();
        var username = $('#username').val();
        var location = $('#search_places').val();
        var bio = $('#bio').val();
        if (title == "") {

            count++;
            $('#title').css('border-bottom', 'solid 2px red');
        }

        if (username == "") {
            count++;
            $('#username').css('border-bottom', 'solid 2px red');
        }

        if (location == "") {
            count++;
            $('#search_places').css('border-bottom', 'solid 2px red');

        }

        if (bio == "") {
            count++;
            $('#bio').css('border-bottom', 'solid 2px red');

        }
        if (c == "" || c == "[]") {
            count++;
            $('.demo1 .selected-list .c-btn').css('border-bottom', 'solid 2px red');

        }
        if (c2 == "" || c2 == "[]") {
            count++;
            $('.demo2 .selected-list .c-btn').css('border-bottom', 'solid 2px red');

        }


        if (count == 0) {

            //API wORKING HEre...
            let jwtToken = this.userModel.root_user.jwt_token;


            if (this.image) {
                // do nothing
            } else {
                this.image = this.heroImageUrl;
            }

            if (this.image2) {
                // do nothing
            } else {
                this.image2 = this.heroImageUrl4;
            }

            let fd = new FormData();
            fd.append('hero', this.image);
            fd.append('profile', this.image2);
            fd.append('title', this.title);
            fd.append('username', this.username_thedoor_check);
            fd.append('field', this.investorBio);
            fd.append('address', this.address_investor);
            fd.append('lat', this.lat_investor);
            fd.append('lng', this.lng_investor);
            fd.append('personal_url', this.personal_url);
            fd.append('tip_founder', this.tip_founder);
            fd.append('selectedItems', this.most.slice(0, -2));
            fd.append('selectedItems2', this.least.slice(0, -2));
            fd.append('type', '21');
            console.log(fd);

            this.commonApiService.investor(jwtToken, fd).subscribe(
                response => {
                    this.res = response.json();

                    console.log(response);
                    if (response.status == 200) {
                        var userName = this.res.root_user.firstname;
                        var investorName = this.res.investor_company_details.investor_name;

                        if (userName == investorName) {
                            this.showSuccess(this.res.msg, "Success!");
                        } else {
                            localStorage.setItem("userModel", JSON.stringify(this.res));
                            $('#exampleModal6').toggle();
                        }
                    }
                    else if (response.status == 400) {
                        this.showError(this.res.msg, "ooopppss!");
                    }

                }, err => {
                    this.res = err.json();
                    this.showError(this.res.msg, 'Oops!');
                    console.log(this.res.msg);
                }
            );


            $(".step-4").css("background-color", "blue");
            $(".step-7").css("background-color", "#1EFFFE");
            $(".startup_button").css("display", "block");
            $(".startup_button2").css("display", "block");
            $(".or_txt").css("display", "block");

            // $('#next').removeClass('btn btn-mdb-color btn-rounded float-right');
            // $('#next').addClass('btn btn-mdb-color btn-rounded nextBtn-2 float-right');

            //  var navListItems = $('div.setup-panel-2 div a'),
            //     allWells = $('.setup-content-2'),
            //     allNextBtn = $('.nextBtn-2'),
            //     allPrevBtn = $('.prevBtn-2');

            // allWells.hide();
            //  navListItems.click(function (e) {
            //     e.preventDefault();
            //     var $target = $($(this).attr('href')),
            //         $item = $(this);

            //     if (!$item.hasClass('disabled')) {
            //         navListItems.removeClass('btn-amber').addClass('btn-blue-grey');
            //         $item.addClass('btn-amber');
            //         allWells.hide();
            //         $target.show();
            //         $target.find('input:eq(0)').focus();
            //     }
            // });
            // allNextBtn.click(function () {
            $(document).on("click", '.nextBtn-2', function () {
                console.log('neextttttt')
                var curStep = $(this).closest(".setup-content-2"),
                    curStepBtn = curStep.attr("id"),
                    nextStepSteps = $('div.setup-panel-2 div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                    curInputs = curStep.find("input[type='text'],input[type='url']"),
                    isValid = true;

                $(".form-group").removeClass("has-error");
                for (var i = 0; i < curInputs.length; i++) {

                    if (!curInputs[i]) {
                        isValid = false;
                        $(curInputs[i]).closest(".form-group").addClass("has-error");
                    }
                }

                if (isValid)
                    nextStepSteps.removeAttr('disabled').trigger('click');

            });


        }
        else {

            this.showError('Please complete all required fields.', 'Error!');
            // var allWells = $('.setup-content-2');
            //    allWells.hide();
            //   $('#next').removeClass('btn btn-mdb-color btn-rounded nextBtn-2 float-right');
            return false;
        }


    }


    previous_button() {

        var navListItems = $('div.setup-panel-2 div a'),
            allWells = $('.setup-content-2'),
            allNextBtn = $('.nextBtn-2'),
            allPrevBtn = $('.prevBtn-2');

        allWells.hide();
        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                $item = $(this);

            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-amber').addClass('btn-blue-grey');
                $item.addClass('btn-amber');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        });
        allPrevBtn.click(function () {

            var curStep = $(this).closest(".setup-content-2"),
                curStepBtn = curStep.attr("id"),
                prevStepSteps = $('div.setup-panel-2 div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

            prevStepSteps.removeAttr('disabled').trigger('click');
        });

    }

    onSelectAll_round(event: any) {
        this.selectAll_round = event.length;
    }
    onDeSelectAll_round(event: any) {
        this.deselectAll_round = event.length;
    }

    onSelectAll_invest(event: any) {
        this.selectAll_invest = event.length;
    }
    onDeSelectAll_invest(event: any) {
        this.deselectAll_invest = event.length;
    }
    public round: string;
    public invest: string;

    submit_investor() {
        this.region = "";
        this.round = "";
        this.invest = "";

        if (this.selectedItems4.length == this.selectAll_region || this.selectedItems4.length == this.dropdownList4.length) {
            this.region = "All" + ", ";
            this.selectAll_region = ""
        }
        else {
            for (var l = 0; l < this.selectedItems4.length; l++) {

                this.region = this.region + this.selectedItems4[l].itemName + ", ";

            }
        }

        if (this.selectedItems5.length == this.selectAll_round || this.selectedItems5.length == this.dropdownList5.length) {
            this.round = "All" + ", ";
            this.selectAll_round = ""
        }
        else {
            for (var l = 0; l < this.selectedItems5.length; l++) {

                this.round = this.round + this.selectedItems5[l].itemName + ",";

            }
        }

        if (this.selectedItems3.length == this.selectAll_invest || this.selectedItems3.length == this.dropdownList3.length) {
            this.invest = "All" + ", ";
            this.selectAll_invest = ""
        }
        else {
            for (var l = 0; l < this.selectedItems3.length; l++) {

                this.invest = this.invest + this.selectedItems3[l].itemName + ", ";

            }
        }

        var x = this.align;
        if (x == "Y") {
            this.align = "Y"
        } else {
            // traction = "no";
            // this.traction_item = "";
            this.align = "N";
            this.traction_item = "";
        }

        var count: number = 0;

        var fundname = $('#fundname').val();
        var organization_url = $('#organization_url').val();
        var about = $('#about').val();
        var location = $('#search_places').val();
        var fund_category = $('#fund_category').val();
        var sector = JSON.stringify(this.selectedItems3);
        var fund_item = this.fund_item;
        var round_item = JSON.stringify(this.selectedItems5);
        var minimum_check = $('#minimum_check').val();
        var max_check = $('#max_check').val();
        var min_check$ = this.min_check;
        var max_check$ = this.max_check;

        if (fundname == "") {
            count++;
            $('#fundname').css('border-bottom', 'solid 2px red');
        }

        if (organization_url == "") {
            count++;
            $('#organization_url').css('border-bottom', 'solid 2px red');
        }

        if (about == "") {
            count++;
            $('#about').css('border-bottom', 'solid 2px red');
        }

        if (location == "") {

            count++;
            $('.demo_location #search_places').css('border-bottom', 'solid 2px red');

        }

        if (fund_item == "") {
            count++;
            $('.fund_cat .mat-form-field-underline').css('border-bottom', 'solid 2px red');

        }
        if (sector == "" || sector == "[]") {
            count++;
            $('.demo3 .selected-list .c-btn').css('border-bottom', 'solid 2px red');

        }
        if (round_item == "" || round_item == "[]") {
            count++;
            $('.demo4 .selected-list .c-btn').css('border-bottom', 'solid 2px red');
        }
        if (minimum_check == "") {
            count++;
            $('#minimum_check').css('border-bottom', 'solid 2px red');
        }
        if (max_check == "") {
            count++;
            $('#max_check').css('border-bottom', 'solid 2px red');
        }

        if (count == 0) {


            if (min_check$.startsWith('$')) {

            } else {
                min_check$ = '$' + min_check$;
            }
            if (max_check$.startsWith('$')) {

            } else {
                max_check$ = '$' + max_check$;
            }
            console.log(min_check$);
            console.log(max_check$);

            let jwtToken = this.userModel.root_user.jwt_token;

            if (this.image3) {
                // do nothing
            } else {
                this.image3 = this.heroImageUrl3;
            }

            if (this.image4) {
                // do nothing
            } else {
                this.image4 = this.heroImageUrl2;
            }

            let fd = new FormData();
            fd.append('hero', this.image3);
            fd.append('profile', this.image4);
            fd.append('fundname', this.fundname);
            fd.append('organization_url', this.organization_url);
            fd.append('address', this.address_organization);
            fd.append('lat', this.lat_organization);
            fd.append('lng', this.lng_organization);
            fd.append('about', this.about);
            fd.append('fund_item', this.fund_item);
            fd.append('fund_size', this.fund_size);
            fd.append('selectedItems4', this.region.slice(0, -2));
            fd.append('lead_item', this.lead_item);
            fd.append('selectedItems3', this.invest.slice(0, -2));
            fd.append('selectedItems5', this.round.slice(0, -2));
            fd.append('min_check', min_check$);
            fd.append('max_check', max_check$);
            fd.append('align', this.align);
            fd.append('traction_item', this.traction_item);
            fd.append('past_investment', this.past_investment);
            fd.append('exits', this.no_exits);


            console.log(fd);

        this.loading = true;
            this.commonApiService.investor1(jwtToken, fd).subscribe(
                response => {
                            this.loading = false;
                    this.res = response.json();

                    console.log(response);
                    if (response.status == 200) {
                        // this.showSuccess(this.res.msg, "Success!");


                        localStorage.setItem("userModel", JSON.stringify(this.res));

                        this.router.navigate(['investor-profile']);
                    }
                    else if (response.status == 400) {
                        this.showError(this.res.msg, "ooopppss!");
                    }

                }, err => {
                       this.loading = false;
                    this.res = err.json();
                    this.showError(this.res.msg, 'Oops!');
                    console.log(this.res.msg);
                }
            );


        }
        else {
            console.log('count' + count)
            this.showError('Please complete all required fields.', 'Error!');
        }

    }


    /*MULTI DROP-DOWN FUNCTIONS START HERE */

    onOpen1(item: any) {

        $('.demo1 .selected-list .c-btn').css('border-bottom', 'solid 1px #bbbbbb');
    }
    onOpen2(item: any) {

        $('.demo2 .selected-list .c-btn').css('border-bottom', 'solid 1px #bbbbbb');
    }
    onOpen3(item: any) {

        $('.demo3 .selected-list .c-btn').css('border-bottom', 'solid 1px #bbbbbb');
    }
    onOpen4(item: any) {

        $('.demo4 .selected-list .c-btn').css('border-bottom', 'solid 1px #bbbbbb');
    }

    /*MULTI DROP-DOWN FUNCTIONS END HERE */
    //TOASTER FUNCTION
    showSuccess(message, header) {
        this.toastr.success(message, header);
    }

    showError(message, header) {
        this.toastr.error(message, header);
    }

    /* CROPPER FUNCTION*/
    public image: any;
    public image2: any;
    public image3: any;
    public image4: any;

    setImage(event: any) {
        this.image = FileList = event.target.files[0];
    }
    setImage2(event: any) {

        this.image2 = FileList = event.target.files[0];

    }
    setImage3(event: any) {

        this.image3 = FileList = event.target.files[0];

    }
    setImage4(event: any) {

        this.image4 = FileList = event.target.files[0];

    }

    set_hero_image() {

        $("#picHero").attr("src", this.data.image);

    }

    set_logo_image() {
        $("#picLogo").attr("src", this.data2.image);

    }
    set_hero_image2() {

        $("#picHero2").attr("src", this.data3.image);

    }
    set_logo_image2() {

        $("#picLogo2").attr("src", this.data4.image);

    }

    check_username() {
        console.log('check');
        console.log(this.userName_api);
        this.username = $('#username').val();

        if (this.username.startsWith("thedoor.co/")) {
            this.username_thedoor_check = this.username.replace("thedoor.co/", "");
        }
        else {
            this.username_thedoor_check = $('#username').val();
        }

        for (var i = 0; i < this.userName_api.length; i++) {
            if (this.username_thedoor_check == this.userName_api[i] || this.username_thedoor_check == null || this.username_thedoor_check == "") {

                $('#username').removeClass('valid_user').addClass('invalid_user');
                console.log(this.username[i]);
                // this.username_thedoor_check = "@" + this.username_thedoor_check;
                this.username_thedoor_check = "" + this.username_thedoor_check;
                console.log('latest name' + this.username_thedoor_check);
                return;


            }
            else {

                $('#username').removeClass('invalid_user').addClass('valid_user');

            }

        }
        //   this.username_thedoor_check = "@" + this.username_thedoor_check;
        this.username_thedoor_check = "" + this.username_thedoor_check;
        console.log('latest name' + this.username_thedoor_check);
    }

    joinOrganization() {

        let jwtToken = this.userModel.root_user.jwt_token;
        console.log(jwtToken);

        const body = {
            organization: this.existing_organization

        };
        console.log(body);
        this.commonApiService.joinOrganization(jwtToken, body).subscribe(
            response => {
                this.resData = response.json();

                console.log(response);
                if (response.status == 200) {
                    this.showSuccess(this.resData.msg, "Success!");

                    localStorage.setItem("userModel", JSON.stringify(this.resData));
                    console.log(JSON.stringify(localStorage.getItem("userModel")));
                    this.router.navigate(['investor-profile']);

                }
                else if (response.status == 400) {
                    this.showError(this.resData.msg, "Oops!");
                }

            }, err => {
                this.resData = err.json();
                this.showError(this.resData.msg, 'Oops!');
                console.log(this.resData.msg);
            }
        );
    }

    gotoProfileActivity() {

 this.router.navigate(['investor-profile']);

 }
}
