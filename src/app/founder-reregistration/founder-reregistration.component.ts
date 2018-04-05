import { Component, NgZone, OnInit, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { Observable } from 'rxjs/Observable';
import * as $ from 'jquery';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Pipe, PipeTransform, ViewContainerRef } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
import { CommonapiService } from "../services/commonapi.service";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';


// declare var $: any;
@Component({
    selector: 'app-founder-reregistration',
    templateUrl: './founder-reregistration.component.html',
    styleUrls: ['./founder-reregistration.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class FounderReregistrationComponent implements OnInit {

    public userName_api: any;
    public startupName_api: any;
    public pastInvestors_api: any;
    public exitStartup_api: any;
    public can_help: any;
    public need_help: any;
    public bio: any;
    public twitter: any = "";
    public linkedin: any = "";
    public title: any;
    public res: any;
    public past: any = "";
    public existing_startup: any;
    public lat_founder: any;
    lng_founder: any;
    address_founder: any;
    public lat_startup: any;
    lng_startup: any;
    address_startup: any;
    public userSettings: any = {
        showCurrentLocation: false,
        resOnSearchButtonClickOnly: false,
        inputPlaceholderText: 'Enter Location',
        recentStorageName: 'componentData3',
        showSearchButton: false,
        showRecentSearch: false

    };
    //cropper var
    data: any;
    data2: any;
    data3: any;
    data4: any;
    cropperSettings: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    cropperSettings2: CropperSettings;
    username: any;
    username_thedoor_check: any;
    profilename_thedoor_check: any;
    aboutC: any;
    public resData: any;
    public selectAll_can: any;
    public deselectAll_can: any;
    public selectAll_need: any;
    public deselectAll_need: any;
    public can: string;
    public need: string;
    public loading = false;


    @ViewChild('cropper', undefined)
    @ViewChild('data', undefined)
    @ViewChild('cropper2', undefined)
    @ViewChild('data2', undefined)
    @ViewChild('cropper3', undefined)
    @ViewChild('data3', undefined)
    @ViewChild('cropper4', undefined)
    @ViewChild('data4', undefined)
    cropper: ImageCropperComponent;


    constructor(public router: Router, private activatedRoute: ActivatedRoute, private commonApiService: CommonapiService,
        public toastr: ToastsManager, public vcr: ViewContainerRef) {

        this.activatedRoute.params.subscribe((params: Params) => {
            let jwttoken = params['token'];
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

            this.commonApiService.getProfiles(jwttoken).subscribe(
                response => {
                    this.resData = JSON.stringify(response.result);
                    console.log(response);
                    this.startupName_api = response;


                }, err => {
                    this.resData = JSON.stringify(err);
                    console.log(this.resData);
                }
            )

            this.commonApiService.getPastInvestors(jwttoken).subscribe(
                response => {
                    this.resData = JSON.stringify(response.result);
                    console.log('resp' + response);
                    this.pastInvestors_api = response;


                }, err => {
                    this.resData = JSON.stringify(err);
                    console.log(this.resData);
                }
            )

            this.commonApiService.getPastInvestments(jwttoken).subscribe(
                response => {
                    this.resData = JSON.stringify(response.result);
                    console.log('resp' + response);
                    this.exitStartup_api = response;


                }, err => {
                    this.resData = JSON.stringify(err);
                    console.log(this.resData);
                }
            )

        })


        this.toastr.setRootViewContainerRef(vcr);
        this.can_help = ''; this.need_help = '';
        // this.auto_location_data1 = '';
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


    field: string = "";
    /*   image data */
    imageSrc = "";
    imageSrc2 = "";
    imageSrc3 = "";
    imageSrc4 = "";
    heroImageUrl = "";
    heroImageUrl2 = "assets/user_placeholder.png";
    heroImageUrl3 = "assets/startup_placeholder.png";
    heroImageUrl4 = "";
    auto_location_data1: any;
    auto_location_data2: any;
    sector_item = '';
    stage_item = '';

    are_raised_item = '';
    have_raised_item = '';
    round_item1 = '';
    round_item2 = '';
    experience_item = '';
    team_item = '';
    areas_item = '';
    gender_item = '';
    age_item = '';
    LGBT_item = '';
    ethnicity_item = '';
    comp_type_item = '';
    traction_item = '';
    revenue_range_item = '';
    year_item = '';
    defense: any = "";
    patent_item = '';
    dropdownList_canHelp = [];
    selectedItems_canHelp = [];
    
    dropdownSettings_canHelp = {};
    dropdownList_needHelp = [];
    selectedItems_needHelp = [];
    dropdownSettings_needHelp = {};
    logo_hero: any;
    logo: any;
    startupname: any;
    profilename: any;
    url: any;
    /*SECTOR DATA*/
    sectors = [
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

    /*ARE RAISED DATA*/
    are_raised = [
        { value: '$0', viewValue: '$0' },
        { value: '$10,000-$25,000', viewValue: '$10,000-$25,000' },
        { value: '$25,000-$50,000', viewValue: '$25,000-$50,000' },
        { value: '$50,000-$100,000', viewValue: '$50,000-$100,000' },
        { value: '$100,000-$250,000', viewValue: '$100,000-$250,000' },
        { value: '$250,000-$500,000', viewValue: '$250,000-$500,000' },
        { value: '$500,000-$1,000,000', viewValue: '$500,000-$1,000,000' },
        { value: '$1,000,000-$2,000,000', viewValue: '$1,000,000-$2,000,000' },
        { value: '$2,000,000+', viewValue: '$2,000,000+' },

    ];

    /*HAVE RAISED DATA*/
    have_raised = [
        { value: '$0', viewValue: '$0' },
        { value: '$10,000-$25,000', viewValue: '$10,000-$25,000' },
        { value: '$25,000-$50,000', viewValue: '$25,000-$50,000' },
        { value: '$50,000-$100,000', viewValue: '$50,000-$100,000' },
        { value: '$100,000-$250,000', viewValue: '$100,000-$250,000' },
        { value: '$250,000-$500,000', viewValue: '$250,000-$500,000' },
        { value: '$500,000-$1,000,000', viewValue: '$500,000-$1,000,000' },
        { value: '$1,000,000-$2,000,000', viewValue: '$1,000,000-$2,000,000' },
        { value: '$2,000,000+', viewValue: '$2,000,000+' },

    ];

    /*STGES DATA*/
    stages = [
        { value: 'Idea', viewValue: 'Idea' },
        { value: 'Prototype/MVP', viewValue: 'Prototype/MVP' },
        { value: 'Live - No traction', viewValue: 'Live - No traction' },
        { value: 'Revenue traction', viewValue: 'Revenue traction' },
        { value: 'User traction', viewValue: 'User traction' },

    ];

    /*ROUNDS1 DATA*/
    rounds1 = [
        { value: 'Pre-seed', viewValue: 'Pre-seed' },
        { value: 'Seed', viewValue: 'Seed' },
        { value: 'Series A', viewValue: 'Series A' },
        { value: 'Series B', viewValue: 'Series B' },
        { value: 'Series C', viewValue: 'Series C' },
        { value: 'Series D', viewValue: 'Series D' },
        { value: 'Series +', viewValue: 'Series +' },

    ];

    /*ROUNDS1 DATA*/
    rounds2 = [
        { value: 'Pre-seed', viewValue: 'Pre-seed' },
        { value: 'Seed', viewValue: 'Seed' },
        { value: 'Series A', viewValue: 'Series A' },
        { value: 'Series B', viewValue: 'Series B' },
        { value: 'Series C', viewValue: 'Series C' },
        { value: 'Series D', viewValue: 'Series D' },
        { value: 'Series +', viewValue: 'Series +' },

    ];

    /*Date DATA*/
    date = [
        { value: 'Pre-seed', viewValue: 'Pre-seed' },
        { value: 'Seed', viewValue: 'Seed' },
        { value: 'Series A', viewValue: 'Series A' },
        { value: 'Series B', viewValue: 'Series B' },
        { value: 'Series C', viewValue: 'Series C' },
        { value: 'Series D', viewValue: 'Series D' },
        { value: 'Series +', viewValue: 'Series +' },

    ];

    /*Experience DATA*/
    experiences = [
        { value: '1', viewValue: '1' },
        { value: '2', viewValue: '2' },
        { value: '3', viewValue: '3' },
        { value: '4', viewValue: '4' },
        { value: '5', viewValue: '5' },
        { value: '6', viewValue: '6' },
        { value: '7', viewValue: '7' },
        { value: '8', viewValue: '8' },
        { value: '9', viewValue: '9' },
        { value: '10+', viewValue: '10+' },
    ];

    /*Team-Size DATA*/
    teams = [
        { value: '1-10', viewValue: '1-10' },
        { value: '11-50', viewValue: '11-50' },
        { value: '51-200', viewValue: '51-200' },
        { value: '201-500', viewValue: '201-500' },
        { value: '501-1000', viewValue: '500-1000' },
        { value: '1000+', viewValue: '1000+' },

    ];

    areas = [

        { value: 'Analytics', viewValue: 'Analytics' },
        { value: 'Development', viewValue: 'Development' },
        { value: 'Financial modeling', viewValue: 'Financial modeling' },
        { value: 'Fundraising', viewValue: 'Fundraising' },
        { value: 'Growth Hacking', viewValue: 'Growth Hacking' },
        { value: 'Introductions', viewValue: 'Introductions' },
        { value: 'Legal', viewValue: 'Legal' },
        { value: 'Marketing', viewValue: 'Marketing' },
        { value: 'Online Advertising', viewValue: 'Online Advertising' },
        { value: 'Partnership Strategy', viewValue: 'Partnership Strategy' },
        { value: 'Pitching', viewValue: 'Pitching' },
        { value: 'Pricing strategy', viewValue: 'Pricing strategy' },
        { value: 'Product Management', viewValue: 'Product Management' },
        { value: 'Product Market/Fit', viewValue: 'Product Market/Fit' },
        { value: 'Public Relations', viewValue: 'Public Relations' },
        { value: 'Referrals', viewValue: 'Referrals' },
        { value: 'Sales/BizDev', viewValue: 'Sales/BizDev' },
        { value: 'Social Media', viewValue: 'Social Media' },
        { value: 'Talent/Human Capital', viewValue: 'Talent/Human Capital' },
        { value: 'Traffic/SEO', viewValue: 'Traffic/SEO' },
        { value: 'UI/UX', viewValue: 'UI/UX' },
        { value: 'User acquisition', viewValue: 'User acquisition' },
        { value: 'User Personas', viewValue: 'User Personas' },

    ];

    genders = [
        { value: 'Female', viewValue: 'Female' },
        { value: 'Male', viewValue: 'Male' },
        { value: 'Transgender', viewValue: 'Transgender' },
        { value: 'Trans Female', viewValue: 'Trans Female' },
        { value: 'Trans Male', viewValue: 'Trans Male' },
        { value: 'Genderqueer', viewValue: 'Genderqueer' },
        { value: 'Agender', viewValue: 'Agender' },
        { value: 'Androgynous', viewValue: 'Androgynous' },
        { value: 'Other', viewValue: 'Other' },
        { value: 'I decline to state', viewValue: 'I decline to state' },

    ];

    ages = [
        { value: '12-17', viewValue: '12-17' },
        { value: '18-24', viewValue: '18-24' },
        { value: '25-34', viewValue: '25-34' },
        { value: '35-44', viewValue: '35-44' },
        { value: '45-54', viewValue: '45-54' },
        { value: '55+', viewValue: '55+' },


    ];

    ethnicities = [
        { value: 'African Descent/Black', viewValue: 'African Descent/Black' },
        { value: 'Hispanic/Latinx', viewValue: 'Hispanic/Latinx' },
        { value: 'East Asian (including Chinese, Japanese, Korean, Mongolian, Tibetan, and Taiwanese)', viewValue: 'East Asian (including Chinese, Japanese, Korean, Mongolian, Tibetan, and Taiwanese)' },
        { value: 'Middle Eastern', viewValue: 'Middle Eastern' },
        { value: 'Native Americans/Alaskan Natives/First Nations', viewValue: 'Native Americans/Alaskan Natives/First Nations' },
        { value: 'Pacific Islander', viewValue: 'Pacific Islander' },
        { value: 'South Asian (including Bangladeshi, Bhutanese, Indian, Nepali, Pakistani, and Sri Lankan)', viewValue: 'South Asian (including Bangladeshi, Bhutanese, Indian, Nepali, Pakistani, and Sri Lankan)' },
        { value: 'Southeast Asian (Including Burmese, Cambodian, Singaporean, Laotian, Thai, Filipino and Vietnamese', viewValue: 'Southeast Asian (Including Burmese, Cambodian, Singaporean, Laotian, Thai, Filipino and Vietnamese' },
        { value: 'White', viewValue: 'White' },
        { value: 'I declare not to state', viewValue: 'I declare not to state' },
    ];

    LGBTS = [
        { value: 'Yes', viewValue: 'Yes' },
        { value: 'No', viewValue: 'No' },
        { value: 'I decline to state', viewValue: 'I decline to state' },

    ];
    comp_types = [
        { value: 'Convertible Note', viewValue: 'Convertible Note' },
        { value: 'Equity', viewValue: 'Equity' },
        { value: 'Bridge', viewValue: 'Bridge' },

    ];
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

    /*Team-Size DATA*/
    patents = [
        { value: 'Yes', viewValue: 'Yes' },
        { value: 'No', viewValue: 'No' },


    ];



    // current_date = (new Date()).getFullYear();

    // years = [this.current_date, this.current_date - 1, this.current_date - 2, this.current_date - 3, this.current_date - 4,
    // this.current_date - 5, this.current_date - 6, this.current_date - 7,
    // this.current_date - 8, this.current_date - 9, this.current_date - 10,
    // this.current_date - 11, this.current_date - 12, this.current_date - 13,
    // this.current_date - 14, this.current_date - 15, this.current_date - 16,
    // this.current_date - 17, this.current_date - 18, this.current_date - 19,
    // this.current_date - 20, this.current_date - 21, this.current_date - 22, this.current_date - 23, '< ' + (this.current_date - 23)



    // ];

 years_new = [
    { value: '2018', viewValue: '2018' },
    { value: '2017', viewValue: '2017' },
    { value: '2016', viewValue: '2016' },
    { value: '2015', viewValue: '2015' },
   { value: '2014', viewValue: '2014' },
   { value: '2013', viewValue: '2013' },
   { value: '2012', viewValue: '2012' },
   { value: '2011', viewValue: '2011' },
   { value: '2010', viewValue: '2010' },
   { value: '2009', viewValue: '2009' },
   { value: '2008', viewValue: '2008' },
   { value: '2007', viewValue: '2007' },
    { value: '2006', viewValue: '2006' },
   { value: '2005', viewValue: '2005' },
   { value: '2004', viewValue: '2004' },
    { value: '2003', viewValue: '2003' },
   { value: '2002', viewValue: '2002' },
    { value: '2001', viewValue: '2001' },
   { value: '2000', viewValue: '2000' },
   { value: '1999', viewValue: '1999' },
   { value: '1998', viewValue: '1998' }, 
      { value: '1997', viewValue: '1997' },
   { value: '1996', viewValue: '1996' }, 
    { value: '< 1996', viewValue: '<1996' }, 
   


  ];



    public requestAutocompleteItemsFake1 = (text: string): Observable<string[]> => {
        return Observable.of([
            'Analytics', 'Development', 'Financial modeling', 'Fundraising', 'Growth Hacking', 'Introductions', 'Legal', 'Marketing',
            'Online Advertising', 'Partnership Strategy', 'Pitching', 'Pricing Strategy', 'Product Management',
            'Product Market/Fit', 'Public Relations', 'Referrals', 'Sales/BizDev', 'Social Media', 'Talent/Human Capital',
            'Traffic/SEO', 'UI/UX', 'User acquistiion', 'User Personas'
        ]);
    }
    public requestAutocompleteItemsFake2 = (text: string): Observable<string[]> => {
        return Observable.of([
            'Analytics', 'Development', 'Financial modeling', 'Fundraising', 'Growth Hacking', 'Introductions', 'Legal', 'Marketing',
            'Online Advertising', 'Partnership Strategy', 'Pitching', 'Pricing Strategy', 'Product Management',
            'Product Market/Fit', 'Public Relations', 'Referrals', 'Sales/BizDev', 'Social Media', 'Talent/Human Capital',
            'Traffic/SEO', 'UI/UX', 'User acquistiion', 'User Personas'
        ]);
    };
    ngOnInit() {

        window.scroll(0, 0);

        this.dropdownList_canHelp = [
            { id: '1', itemName: 'Analytics' },
            { id: '2', itemName: 'Development' },
            { id: '3', itemName: 'Financial modeling' },
            { id: '4', itemName: 'Fundraising' },
            { id: '5', itemName: 'Growth Hacking' },
            { id: '6', itemName: 'Introductions' },
            { id: '7', itemName: 'Legal' },
            { id: '8', itemName: 'Marketing' },
            { id: '9', itemName: 'Online Advertising' },
            { id: '10', itemName: 'Partnership Strategy' },
            { id: '11', itemName: 'Pitching' },
            { id: '12', itemName: 'Pricing strategy ' },
            { id: '13', itemName: 'Product Management' },
            { id: '14', itemName: 'Product Market/Fit' },
            { id: '15', itemName: 'Public Relations' },
            { id: '16', itemName: 'Referrals' },
            { id: '17', itemName: ' Sales / BizDev' },
            { id: '18', itemName: 'Social Media' },
            { id: '19', itemName: 'Talent / Human Capital' },
            { id: '20', itemName: 'Traffic/SEO' },
            { id: '21', itemName: 'UI/UX ' },
            { id: '22', itemName: 'User acquisition' },
            { id: '23', itemName: 'User Personas' },

        ];

        this.dropdownList_needHelp = [
            { id: '1', itemName: 'Analytics' },
            { id: '2', itemName: 'Development' },
            { id: '3', itemName: 'Financial modeling' },
            { id: '4', itemName: 'Fundraising' },
            { id: '5', itemName: 'Growth Hacking' },
            { id: '6', itemName: 'Introductions' },
            { id: '7', itemName: 'Legal' },
            { id: '8', itemName: 'Marketing' },
            { id: '9', itemName: 'Online Advertising' },
            { id: '10', itemName: 'Partnership Strategy' },
            { id: '11', itemName: 'Pitching' },
            { id: '12', itemName: 'Pricing strategy ' },
            { id: '13', itemName: 'Product Management' },
            { id: '14', itemName: 'Product Market/Fit' },
            { id: '15', itemName: 'Public Relations' },
            { id: '16', itemName: 'Referrals' },
            { id: '17', itemName: ' Sales / BizDev' },
            { id: '18', itemName: 'Social Media' },
            { id: '19', itemName: 'Talent / Human Capital' },
            { id: '20', itemName: 'Traffic/SEO' },
            { id: '21', itemName: 'UI/UX ' },
            { id: '22', itemName: 'User acquisition' },
            { id: '23', itemName: 'User Personas' },

        ];

        this.dropdownSettings_canHelp = {
            singleSelection: false,
            text: "Select",
            enableSearchFilter: false,
            classes: "selected-list c-btn",
            badgeShowLimit: 3,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            limitSelection: 3

        };
        this.dropdownSettings_needHelp = {
            singleSelection: false,
            text: "Select",
            enableSearchFilter: false,
            classes: "selected-list c-btn",
            badgeShowLimit: 3,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            limitSelection: 3

        };



    }

    ngAfterViewInit() {
        $('.custom-autocomplete__input input').attr("placeholder", "Enter  location").addClass('your-class').css("color", "#4b4f58");
        $('.md-textarea ng-pristine ng-valid ng-touched').attr("placeholder", "Enter  location");

        // Steppers                
        $(document).ready(function () {
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

            $('div.setup-panel-2 div a.btn-amber').trigger('click');
        });

        $(".step-5").css("background-color", "#1EFFFE");
        $(".step-6").css("background-color", "white");
        $(".step-7").css("background-color", "white");

        $('#part1-next').click(function () {
            // $(".step-5").css("background-color", "blue");
            // $(".step-6").css("background-color", "#1EFFFE");
            // $(".step-7").css("background-color", "white");
            // $(".startup_button").css("display", "block");


        });
        $('#part2-next').click(function () {
            $(".step-5").css("background-color", "blue");
            // $(".step-6").css("background-color", "blue");
            $(".step-6").css("background-color", "#1EFFFE");
        });
        $('#part2-prev').click(function () {
            $(".step-5").css("background-color", "#1EFFFE");
            $(".step-6").css("background-color", "white");
            $(".step-7").css("background-color", "white");
            $(".startup_button").css("display", "none");
            $(".startup_button2").css("display", "none");
            $(".or_txt").css("display", "none");
        });
        $('#part3-next').click(function () {

        });
        $('#part3-prev').click(function () {
            $(".step-5").css("background-color", "blue");
            $(".step-6").css("background-color", "#1EFFFE");
            $(".step-7").css("background-color", "white");
        });
        $(".mat-select-value").css("color", "#858b95");
        $(".mat-select-value").click(function () {
            if ($(".mat-option-text").select()) {

                $(this).css("color", "#4b4f58")
            } else {

            }
        });

        /*Validation color functionality start here */
        //part-1
        $('#username').on('keyup', function () {
            if ($('#username').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#bio').on('keyup', function () {
            if ($('#bio').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        // $('#twitter').on('keyup', function () {
        //     if ($('#twitter').val() != "") {
        //         $(this).css('border-bottom', 'solid 2px blue');
        //     }
        // }).blur(function () {
        //     $(this).css('border-bottom', 'solid 1px #bbbbbb');
        // });

        // $('#linkedin').on('keyup', function () {
        //     if ($('#linkedin').val() != "") {
        //         $(this).css('border-bottom', 'solid 2px blue');

        //     }
        // }).blur(function () {
        //     $(this).css('border-bottom', 'solid 1px #bbbbbb');
        // });

        $('#title').on('keyup', function () {
            if ($('#title').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');

            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '.demo #search_places', function () {
            if ($('.demo #search_places').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        })
        $(document).on('blur', '.demo #search_places', function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '#tag1 .ng2-tag-input[_ngcontent-c14]', function () {

            $(this).css('border-bottom', 'solid 2px blue');

        })
        $(document).on('blur', '#tag1 .ng2-tag-input[_ngcontent-c14]', function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '#tag2 .ng2-tag-input[_ngcontent-c14]', function () {

            $(this).css('border-bottom', 'solid 2px blue');

        })
        $(document).on('blur', '#tag2 .ng2-tag-input[_ngcontent-c14]', function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '#lgbt', function () {

            $('.lgbt_1 .mat-form-field-underline').css('border-bottom', 'solid 2px blue');

        })
        $(document).on('blur', '#lgbt', function () {
            $('.lgbt_1 .mat-form-field-underline').css('border-bottom', 'solid 1px #bbbbbb');
        });
        //end part-1

        //part-2 startup_profile
        $('#startup').on('keyup', function () {
            if ($('#startup').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#startup_profile').on('keyup', function () {
            if ($('#startup_profile').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#comp_url').on('keyup', function () {
            if ($('#comp_url').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#desc_cmp').on('keyup', function () {
            if ($('#desc_cmp').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#sector').on('keyup', function () {

            $('.bst_sector .mat-form-field-underline').css('border-bottom', 'solid 2px blue');
        }).blur(function () {
            $('.bst_sector .mat-form-field-underline').css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '.demo2 #search_places', function () {
            if ($('.demo2 #search_places').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        })
        $(document).on('blur', '.demo2 #search_places', function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });


        $(document).on('keyup', '#people', function () {
            $('.people_team .mat-form-field-underline').css('border-bottom', 'solid 2px blue');
        })
        $(document).on('blur', '#people', function () {
            $('.people_team .mat-form-field-underline').css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '#stage_cmp', function () {
            $('.stage_company .mat-form-field-underline').css('border-bottom', 'solid 2px blue');
        })
        $(document).on('blur', '#stage_cmp', function () {
            $('.stage_company .mat-form-field-underline').css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '#look_raising', function () {
            $('.much_raising .mat-form-field-underline').css('border-bottom', 'solid 2px blue');
        })
        $(document).on('blur', '#look_raising', function () {
            $('.much_raising .mat-form-field-underline').css('border-bottom', 'solid 1px #bbbbbb');
        });

        $(document).on('keyup', '#fund_round', function () {
            $('.fund .mat-form-field-underline').css('border-bottom', 'solid 2px blue');
        })
        $(document).on('blur', '#fund_round', function () {
            $('.fund .mat-form-field-underline').css('border-bottom', 'solid 1px #bbbbbb');
        });
        //end part-1

        /*Validation color functionality end here */

    }

    /* start upload image function */
    public hero: any
    // readUrl(event: any) {
    //     this.hero = FileList = event.target.files;
    //     if (event.target.files && event.target.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.heroImageUrl = event.target.result;
    //         }
    //         reader.readAsDataURL(event.target.files[0]);
    //     }
    // }
    public dp: any
    // readUrl2(event: any) {
    //     this.dp = FileList = event.target.files;
    //     if (event.target.files && event.target.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.heroImageUrl2 = event.target.result;
    //         }
    //         reader.readAsDataURL(event.target.files[0]);
    //     }
    // }
    // readUrl3(event: any) {
    //     if (event.target.files && event.target.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.heroImageUrl3 = event.target.result;
    //         }
    //         reader.readAsDataURL(event.target.files[0]);
    //     }
    // }
    // readUrl4(event: any) {
    //     if (event.target.files && event.target.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.heroImageUrl4 = event.target.result;
    //         }
    //         reader.readAsDataURL(event.target.files[0]);
    //     }
    // }


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

    /*  location  auto complete method */

    autoCompleteCallback1(selectedData: any) {
        this.auto_location_data1 = selectedData.data;



        this.address_startup = this.auto_location_data1.formatted_address;
        console.log(this.address_startup);
        this.lat_startup = this.auto_location_data1.geometry.location.lat
        this.lng_startup = this.auto_location_data1.geometry.location.lng;

    }
    autoCompleteCallback2(selectedData: any) {
        this.auto_location_data2 = selectedData.data;
        // console.log(this.auto_location_data2)
        // var abc= this.auto_location_data2.formatted_address;
        // console.log(abc)
        this.address_founder = this.auto_location_data2.formatted_address;

        this.lat_founder = this.auto_location_data2.geometry.location.lat
        this.lng_founder = this.auto_location_data2.geometry.location.lng;
    }

    onSelectAll_can(event: any) {
        this.selectAll_can = event.length;
        console.log(this.selectAll_can);
    }
    onDeSelectAll_can(event: any) {
        this.deselectAll_can = event.length;
        console.log(this.deselectAll_can);
    }
    onSelectAll_need(event: any) {
        this.selectAll_need = event.length;
        console.log(this.selectAll_need);
    }
    onDeSelectAll_need(event: any) {
        this.deselectAll_need = event.length;
        console.log(this.deselectAll_need);
    }

    backToHome() {
        this.router.navigate(['']);
    }




    part1_next() {

        this.can = "";
        this.need = "";


        if (this.selectedItems_canHelp.length == this.selectAll_can || this.selectedItems_canHelp.length == this.dropdownList_canHelp.length) {
            this.can = "All" + ", "; this.selectAll_can = ""
        }
        else {
            for (var l = 0; l < this.selectedItems_canHelp.length; l++) {
                this.can = this.can + this.selectedItems_canHelp[l].itemName + ", ";
            }
        }
        if (this.selectedItems_needHelp.length == this.selectAll_need || this.selectedItems_needHelp.length == this.dropdownList_needHelp.length) {
            this.need = "All" + ", ";
            this.selectAll_need = ""
        }
        else {
            for (var l = 0; l < this.selectedItems_needHelp.length; l++) {
                this.need = this.need + this.selectedItems_needHelp[l].itemName + ", ";
            }
        }
   
        var username = $('#username').val();
        var bio = $('#bio').val();
        var location = $('.demo #search_places').val();

        var twitter_check = this.twitter;
        //    var linkedin=$('#linkedin').val(); var c = JSON.stringify(this.selectedItems);
        var title = $('#title').val();

        

        var can_help = JSON.stringify(this.selectedItems_canHelp);
        var need_help = JSON.stringify(this.selectedItems_needHelp);

        // var need_help=this.need_help[0];
        var LGBT = this.LGBT_item;


        var count: number = 0;
        // var c = JSON.stringify(this.selectedItems);
        // var location = $('#search_places').val();



        if (username == "") {
            count++;
            $('#username').css('border-bottom', 'solid 2px red');
        }

        if (bio == "") {
            count++;
            $('#bio').css('border-bottom', 'solid 2px red');

        }

        if (location == "") {
            count++;
            $('.demo #search_places').css('border-bottom', 'solid 2px red');
        }


        if (title == "") {
            count++;
            $('#title').css('border-bottom', 'solid 2px red');
        }

        if (can_help == "" || can_help == "[]") {
            count++;
            $('#tag1 .selected-list .c-btn').css('border-bottom', 'solid 2px red');

        }
        if (need_help == "" || need_help == "[]") {
            count++;
            $('#tag2 .selected-list .c-btn').css('border-bottom', 'solid 2px red');

        }

        if (LGBT == "") {
            count++;
            $('.lgbt_1 .mat-form-field-underline').css({ "border-bottom": "solid 2px red", 'margin-top': '12px' });
        }

        if (count == 0) {


            if (twitter_check) {
                if (twitter_check.startsWith('@')) {
                } else {
                    twitter_check = '@' + twitter_check;
                }
            }
            console.log('twitter' + twitter_check);


            this.activatedRoute.params.subscribe((params: Params, ) => {
                let jwtToken = params['token'];
                let fd = new FormData();
                fd.append('hero', this.hero);
                fd.append('profile', this.dp);
                fd.append('username', this.username_thedoor_check);
                fd.append('bio', this.bio);
                // fd.append('location', this.auto_location_data2);
                fd.append('address', this.address_founder);
                fd.append('lat', this.lat_founder);
                fd.append('lng', this.lng_founder);
                fd.append('twitter', twitter_check);
                fd.append('linkedin', this.linkedin);
                fd.append('title', this.title);
                // fd.append('items1', JSON.stringify(this.selectedItems_canHelp));
                // fd.append('items2', JSON.stringify(this.selectedItems_needHelp));
                fd.append('items1', this.can.slice(0, -2));
                fd.append('items2', this.need.slice(0, -2));
                fd.append('ethnicity_item', this.ethnicity_item);
                fd.append('gender_item', this.gender_item);
                fd.append('LGBT_item', this.LGBT_item);
                fd.append('age_item', this.age_item);
                fd.append('type', '1');
                console.log(fd);
                console.log(this.gender_item);
       this.loading = true;

                this.commonApiService.update(jwtToken, fd).subscribe(
                    response => {
                                this.loading = false;
                        this.res = response.json();

                        console.log(response);
                        if (response.status == 200) {
                            this.showSuccess(this.res.msg, "Success!");
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
            })
            //others circle color and show button functionality here
            $(".step-5").css("background-color", "blue");
            $(".step-6").css("background-color", "#1EFFFE");
            $(".step-7").css("background-color", "white");
            $(".startup_button").css("display", "block");
            $(".startup_button2").css("display", "block");
            $(".or_txt").css("display", "block");

            //end here

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

            allNextBtn.click(function () {
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

            //Start API Work Here

            console.log('next API');
            //             this.activatedRoute.params.subscribe((params: Params,) => {
            //  let jwtToken = params['token'];
            //  let fd = new FormData(); 
            //  fd.append('hero',this.hero);
            //  fd.append('profile',this.dp);
            //  fd.append('username', this.username);
            //  fd.append('bio', this.bio);
            //  fd.append('location',this.auto_location_data2);
            //  fd.append('twitter',this.twitter);
            //  fd.append('linkedin',this.linkedin);
            //  fd.append('title',this.title);
            //  fd.append('items1',JSON.stringify(this.selectedItems_canHelp));
            //  fd.append('items2',JSON.stringify(this.selectedItems_needHelp));
            //  fd.append('ethnicity_item',this.ethnicity_item);
            //  fd.append('gender_item',this.gender_item);
            //  fd.append('LGBT_item',this.LGBT_item);
            //  fd.append('age_item',this.age_item);
            //  fd.append('ethnicity_item',this.ethnicity_item);
            //   fd.append('type','1');
            //   console.log(fd);

            //  this.commonApiService.update(jwtToken,fd).subscribe(
            //  response => {
            //  this.res = response.json();

            //  console.log(response);
            //  if(response.status==200){
            //  this.showSuccess(this.res.msg, "Success!");
            //  }
            //  else if(response.status == 400){
            //  this.showError(this.res.msg, "ooopppss!");
            //  }

            //  },err=>{
            //  this.res = err.json();
            //  this.showError(this.res.msg, 'Oops!');
            //  console.log(this.res.msg);
            //  }
            //  );
            //  })
        }
        else {

            this.showError('Please complete all required fields', 'Error!');
            return false;
        }


    }

    submit() {
        console.log('submit')
        var startup = $('#startup').val();
        var startup_profile = $('#startup_profile').val();
        var comp_url = $('#comp_url').val();
        // var location = $('.demo2 #search_places').val();
        var location = this.auto_location_data1;

        // var loc = location[12];

        var desc_cmp = $('#desc_cmp').val();
        var sector = this.sector_item;
        var look_raising = this.have_raised_item;
        var people = this.team_item;
        var stage_cmp = this.stage_item;
        var fund_round = this.round_item1;

        var count: number = 0;


        if (startup == "") {
            count++;
            $('#startup').css('border-bottom', 'solid 2px red');
        }

        if (startup_profile == "") {
            count++;
            $('#startup_profile').css('border-bottom', 'solid 2px red');
        }

        if (comp_url == "") {
            count++;
            $('#comp_url').css('border-bottom', 'solid 2px red');
            $($('.demo2 #search_places').css('border-bottom', 'solid 2px blue'));

        }

        // if (loc=="f" || loc == "" ||loc== null || loc== undefined) {

        //     count++;

        //     $('.demo2 #search_places').css('border-bottom', 'solid 2px blue');



        // }

        if (desc_cmp == "") {
            count++;
            $('#desc_cmp').css('border-bottom', 'solid 2px red');

        }
        if (sector == "") {
            count++;
            $('.bst_sector .mat-form-field-underline').css('border-bottom', 'solid 2px red');
        }
        if (people == "") {
            count++;
            $('.people_team .mat-form-field-underline').css('border-bottom', 'solid 2px red');
        }
        if (stage_cmp == "") {
            count++;
            $('.stage_company .mat-form-field-underline').css('border-bottom', 'solid 2px red');
        }


        if (look_raising == "") {
            count++;
            $('.much_raising .mat-form-field-underline').css({ "border-bottom": "solid 2px red", 'margin-top': '12px' });
        }

        if (fund_round == "") {
            count++;
            $('.fund .mat-form-field-underline').css({ "border-bottom": "solid 2px red", 'margin-top': '12px' });
        }

        if (count == 0) {
            // var navListItems = $('div.setup-panel-2 div a'),
            //     allWells = $('.setup-content-2'),
            //     allNextBtn = $('.nextBtn-2'),
            //     allPrevBtn = $('.prevBtn-2');

            // allWells.hide();

            // navListItems.click(function (e) {
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
            //     var curStep = $(this).closest(".setup-content-2"),
            //         curStepBtn = curStep.attr("id"),
            //         nextStepSteps = $('div.setup-panel-2 div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            //         curInputs = curStep.find("input[type='text'],input[type='url']"),
            //         isValid = true;

            //     $(".form-group").removeClass("has-error");
            //     for (var i = 0; i < curInputs.length; i++) {
            //         if (!curInputs[i]) {
            //             isValid = false;
            //             $(curInputs[i]).closest(".form-group").addClass("has-error");
            //         }
            //     }

            //     if (isValid)
            //         nextStepSteps.removeAttr('disabled').trigger('click');
            // });

            this.activatedRoute.params.subscribe((params: Params, ) => {
                let jwtToken = params['token'];
                let fd = new FormData();
                fd.append('hero', this.logo_hero);
                fd.append('profile', this.logo);
                fd.append('startupname', this.startupname);
                fd.append('profilename', this.profilename_thedoor_check);
                fd.append('url', this.url);
                fd.append('aboutC', this.aboutC);
                // fd.append('location', this.auto_location_data1);
                fd.append('address', this.address_startup);
                fd.append('lat', this.lat_startup);
                fd.append('lng', this.lng_startup);
                fd.append('sector_item', this.sector_item);
                fd.append('year_item', this.year_item);
                fd.append('team_item', this.team_item);
                fd.append('stage_item', this.stage_item);
                fd.append('are_raised_item', this.are_raised_item);
                fd.append('have_raised_item', this.have_raised_item);
                fd.append('round_item1', this.round_item1);
                fd.append('comp_type_item', this.comp_type_item);
                //    fd.append('traction_item', this.traction_item);
                fd.append('revenue_range', this.revenue_range_item);
                fd.append('past', this.past);
                fd.append('experience_item', this.experience_item);
                fd.append('patent_item', this.patent_item);
                fd.append('defense', this.defense);
                console.log(this.year_item);
                
                this.commonApiService.update1(jwtToken, fd).subscribe(
                    response => {
                        this.res = response.json();
                        console.log(response);

                        if (response.status == 200) {
                            // this.showSuccess(this.res.msg, "Success!");

                           localStorage.setItem("userModel", JSON.stringify(this.res));

                            this.router.navigate(['founder-profile']);

                        }
                        else if (response.status == 400) {
                            this.showError(this.res.msg, "ooopppss!");
                        }
                    }, err => {
                        this.res = err.json();
                        this.showError(this.res.msg, "ooopppss!");
                        
                    }
                )


            })


        }
        else {
            console.log(count);

            this.showError('Please complete all required fields', 'Error!');
            return false;
        }

    }
    //TOASTER FUNCTION
    showSuccess(message, header) {
        this.toastr.success(message, header);
    }

    showError(message, header) {
        this.toastr.error(message, header);
    }

    /*MULTI DROP-DOWN FUNCTIONS START HERE */
    onOpen(item: any) {

        $('#tag1 .selected-list .c-btn').css('border-bottom', 'solid 1px #bbbbbb');
    }

    onOpen2(item: any) {

        $('#tag2 .selected-list .c-btn').css('border-bottom', 'solid 1px #bbbbbb');
    }

    /*MULTI DROP-DOWN FUNCTIONS END HERE */

    /* CROPPER FUNCTION*/
    public image: any;
    public image2: any;
    public image3: any;
    public image4: any;

    setImage(event: any) {
        this.image = FileList = event.target.files[0];
        this.hero = this.image;
    }
    setImage2(event: any) {

        this.image2 = FileList = event.target.files[0];
        this.dp = this.image2;
    }
    setImage3(event: any) {

        this.image3 = FileList = event.target.files[0];
        this.logo_hero = this.image3;

    }
    setImage4(event: any) {

        this.image4 = FileList = event.target.files[0];
        this.logo = this.image4;

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
        var test_name;

        this.username = $('#username').val();
        if (this.username.startsWith("thedoor.co/")) {
            this.username_thedoor_check = this.username.replace("thedoor.co/", "");
        }
        else {
            this.username_thedoor_check = $('#username').val();
        }
        console.log('new name' + this.username_thedoor_check);

        for (var i = 0; i < this.userName_api.length; i++) {
            if (this.username_thedoor_check == this.userName_api[i] || this.username_thedoor_check == null || this.username_thedoor_check == "") {

                $('#username').removeClass('valid_user').addClass('invalid_user');
                console.log(this.username[i]);
                // this.username_thedoor_check = "@" + this.username_thedoor_check;
                this.username_thedoor_check = "" + this.username_thedoor_check;


                return;


            }
            else {

                $('#username').removeClass('invalid_user').addClass('valid_user');



            }

        }
        //  this.username_thedoor_check = "@" + this.username_thedoor_check;
        this.username_thedoor_check = "" + this.username_thedoor_check;
        console.log('latest name' + this.username_thedoor_check);
    }

    check_startupName() {
        console.log('checkstrt');
        console.log(this.startupName_api);
        this.profilename = $('#startup_profile').val();

        if (this.profilename.startsWith("thedoor.co/")) {
            this.profilename_thedoor_check = this.profilename.replace("thedoor.co/", "");
        }
        else {
            this.profilename_thedoor_check = $('#startup_profile').val();
        }
        for (var i = 0; i < this.startupName_api.length; i++) {
            console.log('checkstrt');

            if (this.profilename_thedoor_check == this.startupName_api[i] || this.profilename_thedoor_check == null || this.profilename_thedoor_check == "") {

                $('#startup_profile').removeClass('valid_user').addClass('invalid_user');

                // this.profilename_thedoor_check = "@" + this.profilename_thedoor_check;
                this.profilename_thedoor_check = "" + this.profilename_thedoor_check;

                return;


            }
            else {

                $('#startup_profile').removeClass('invalid_user').addClass('valid_user');



            }


        }
        //  this.profilename_thedoor_check = "@" + this.profilename_thedoor_check;
        this.profilename_thedoor_check = "" + this.profilename_thedoor_check;

        console.log('latest name' + this.profilename_thedoor_check);
    }

    joinStartup() {


        this.activatedRoute.params.subscribe((params: Params, ) => {
            let jwtToken = params['token'];
            console.log(jwtToken);

            const body = {
                startupname: this.existing_startup

            };
            console.log(body);
            this.commonApiService.joinStartup(jwtToken, body).subscribe(
                response => {
                    this.resData = response.json();

                    console.log(response);
                    if (response.status == 200) {
                        this.showSuccess(this.resData.msg, "Success!");

                        localStorage.setItem("userModel", JSON.stringify(this.resData));


                        this.router.navigate(['founder-profile']);


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
        })
    }
}
