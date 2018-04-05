import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Pipe, PipeTransform, ViewChild, ViewContainerRef } from '@angular/core';
import * as $ from 'jquery';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Compiler } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
import { ActivatedRoute, Params } from "@angular/router";
import { CommonapiService } from "../services/commonapi.service";
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from "@angular/router";
import { selectedItems } from './seletedItems';


@Component({
    selector: 'app-edit-angel',
    templateUrl: './edit-angel.component.html',
    styleUrls: ['./edit-angel.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class EditAngelComponent implements OnInit {


    public userName_api: any[];
    public pastInvestments_api: any[];
    username: any;
    username_thedoor_check: any;
    auto_location_data: any = "";
    field: string = "";
    bioValue: string = "";
    personalUrl: string = "";
    tipFounders: string = "";
    selectedItems_sector_most = [];
    selectedItems_sector_least = [];
    public loading = false;

    least_data = [];
    minCheck: any;
    maxCheck: any;
    selectedItems3_roundInvest = [];
    traction_align: string = "N";
    traction_item: any = "";
    usernameData = ['MESSY', 'door.co', 'udemy'];
    show_label: true;
    pastInvestments: any;
    imageSrc = "";
    imageSrc2 = "";
    heroImageUrl = "";
    heroImageUrl2 = "assets/user_placeholder.png";
    sector_item = "";
    lat: any;
    lng: any;
    address: any;
    dropdownList = [];
    dropdownList2 = [];
    dropdownList3 = [];
    dropdownSettings = {}; dropdownSettings2 = {}; dropdownSettings3 = {};
    align2 = false;
    data: any;
    data2: any;
    cropperSettings: CropperSettings;
    croppedWidth: number;
    croppedHeight: number;
    cropperSettings2: CropperSettings;
    public resData: any;
    round_item_angel = '';


    public selectAll: any;
    public deselectAll: any;
    public selectAll_most: any;
    public deselectAll_most: any;
    public selectAll_round: any;
    public deselectAll_round: any;

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

    @ViewChild('cropper', undefined)
    @ViewChild('data', undefined)
    @ViewChild('cropper2', undefined)
    @ViewChild('data2', undefined)
    cropper: ImageCropperComponent;
    constructor(private router: Router, private _compiler: Compiler, private commonApiService: CommonapiService, private activatedRoute: ActivatedRoute,
        public toastr: ToastsManager, public vcr: ViewContainerRef, private localStorageService: LocalStorageService) {

        let jwttoken = this.userModel.root_user.jwt_token;

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
        //this.cropperSettings.preserveSize=true;
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


        //this.cropperSettings.noFileInput = true;

        this.data = {};
        this.data2 = {};

        this.toastr.setRootViewContainerRef(vcr);
    }

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
        this._compiler.clearCache();



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
            { id: '1', itemName: 'Pre-seed' },
            { id: '2', itemName: 'Seed' },
            { id: '3', itemName: 'Series A' },
            { id: '4', itemName: 'Series B' },
            { id: '5', itemName: 'Series C' },
            { id: '6', itemName: 'Series D' },
            { id: '7', itemName: 'Series +' },

        ];


        this.dropdownSettings = {
            singleSelection: false,
            text: "Select",
            enableSearchFilter: false,
            classes: "selected-list c-btn",
            badgeShowLimit: 2,
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All'
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

        };

        if (localStorage.getItem("userModel")) {

            // set user name
            if (this.userModel.root_user.username != null && this.userModel.root_user.username) {
                this.username = this.userModel.root_user.username;
                this.username_thedoor_check = this.userModel.root_user.username;
            }

            // set user about
            if (this.userModel.root_user.user_about != null && this.userModel.root_user.user_about) {
                this.bioValue = this.userModel.root_user.user_about;
            }

            // set user address
            if (this.userModel.root_user.user_address != null && this.userModel.root_user.user_address) {
                this.address = this.userModel.root_user.user_address;
                this.lat = this.userModel.root_user.user_latitude;
                this.lng = this.userModel.root_user.user_longitude;

            }

            // set user personal url
            if (this.userModel.investor_details.personalUrl != null && this.userModel.investor_details.personalUrl) {
                this.personalUrl = this.userModel.investor_details.personalUrl;
                // this.persnl_url_show=true;
            }

            // set user min check size 
            if (this.userModel.investor_company_details.mincheck != null && this.userModel.investor_company_details.mincheck) {
                this.minCheck = this.userModel.investor_company_details.mincheck;
            }

            // set user max check size
            if (this.userModel.investor_company_details.maxcheck != null && this.userModel.investor_company_details.maxcheck) {
                this.maxCheck = this.userModel.investor_company_details.maxcheck;
            }

            // set sector least excited
            if (this.userModel.investor_details.sector_least_excited != null && this.userModel.investor_details.sector_least_excited) {

                var stringToSplit = this.userModel.investor_details.sector_least_excited;

                if (stringToSplit.indexOf(',') >= 0) {
                    var splittedString = stringToSplit.split(',');
                    if (stringToSplit != null && stringToSplit.length > 0) {

                        for (var oneDropdown in this.dropdownList) {
                            if (stringToSplit.trim().indexOf(this.dropdownList[oneDropdown].itemName) > -1) {
                                var selectedItemsModel = new selectedItems();
                                selectedItemsModel.id = this.dropdownList[oneDropdown].id;
                                selectedItemsModel.itemName = this.dropdownList[oneDropdown].itemName;
                                this.selectedItems_sector_least.push(selectedItemsModel);
                            }
                        }

                        this.selectAll = this.selectedItems_sector_least.length;
                    }
                } else {
                    if (stringToSplit.trim() == "All") {
                        this.selectedItems_sector_least = this.dropdownList;

                        this.selectAll = this.selectedItems_sector_least.length;

                    } else {
                        for (var oneDropdown in this.dropdownList) {
                            if (stringToSplit.trim() == this.dropdownList[oneDropdown].itemName) {
                                var selectedItemsModel = new selectedItems();
                                selectedItemsModel.id = this.dropdownList[oneDropdown].id;
                                selectedItemsModel.itemName = this.dropdownList[oneDropdown].itemName;
                                this.selectedItems_sector_least.push(selectedItemsModel);
                            }

                        }

                        this.selectAll = this.selectedItems_sector_least.length;


                    }

                }

            }

            // set sector most excited
            if (this.userModel.investor_details.sector_most_excited != null && this.userModel.investor_details.sector_most_excited) {
                var stringToSplit = this.userModel.investor_details.sector_most_excited;

                if (stringToSplit.indexOf(',') >= 0) {
                    var splittedString = stringToSplit.split(',');
                    if (stringToSplit != null && stringToSplit.length > 0) {

                        for (var oneDropdown in this.dropdownList2) {
                            if (stringToSplit.trim().indexOf(this.dropdownList2[oneDropdown].itemName) > -1) {
                                var selectedItemsModel = new selectedItems();
                                selectedItemsModel.id = this.dropdownList2[oneDropdown].id;
                                selectedItemsModel.itemName = this.dropdownList2[oneDropdown].itemName;
                                this.selectedItems_sector_most.push(selectedItemsModel);
                            }
                        }

                        this.selectAll_most = this.selectedItems_sector_most.length;

                    }
                } else {
                    if (stringToSplit.trim() == "All") {
                        this.selectedItems_sector_most = this.dropdownList2;

                        this.selectAll_most = this.selectedItems_sector_most.length;

                    } else {
                        for (var oneDropdown in this.dropdownList2) {
                            if (stringToSplit.trim() == this.dropdownList2[oneDropdown].itemName) {
                                var selectedItemsModel = new selectedItems();
                                selectedItemsModel.id = this.dropdownList2[oneDropdown].id;
                                selectedItemsModel.itemName = this.dropdownList2[oneDropdown].itemName;
                                this.selectedItems_sector_most.push(selectedItemsModel);
                            }

                        }
                        this.selectAll_most = this.selectedItems_sector_most.length;

                    }

                }
            }

            // set user background image
            if (this.userModel.root_user.user_hero_image != null && this.userModel.root_user.user_hero_image) {
                this.heroImageUrl = this.userModel.root_user.user_hero_image;
            }

            // set user profile pic
            if (this.userModel.root_user.user_profile_image != null && this.userModel.root_user.user_profile_image) {
                this.heroImageUrl2 = this.userModel.root_user.user_profile_image;
            }

            // set tips 4 founders
            if (this.userModel.investor_details.tipsForFounder != null && this.userModel.investor_details.tipsForFounder) {
                this.tipFounders = this.userModel.investor_details.tipsForFounder;
            }

            // set round where invest
            if (this.userModel.investor_details.which_stage_usually_invest != null && this.userModel.investor_details.which_stage_usually_invest) {
                var stringToSplit = this.userModel.investor_details.which_stage_usually_invest;

                if (stringToSplit.indexOf(',') >= 0) {
                    var splittedString = stringToSplit.split(',');
                    if (stringToSplit != null && stringToSplit.length > 0) {

                        for (var oneDropdown in this.dropdownList3) {
                            if (stringToSplit.trim().indexOf(this.dropdownList3[oneDropdown].itemName) > -1) {
                                var selectedItemsModel = new selectedItems();
                                selectedItemsModel.id = this.dropdownList3[oneDropdown].id;
                                selectedItemsModel.itemName = this.dropdownList3[oneDropdown].itemName;
                                this.selectedItems3_roundInvest.push(selectedItemsModel);
                            }
                        }

                        this.selectAll_round = this.selectedItems3_roundInvest.length;

                    }
                } else {
                    if (stringToSplit.trim() == "All") {
                        this.selectedItems3_roundInvest = this.dropdownList3;

                        this.selectAll_round = this.selectedItems3_roundInvest.length;

                    } else {
                        for (var oneDropdown in this.dropdownList3) {
                            if (stringToSplit.trim() == this.dropdownList3[oneDropdown].itemName) {
                                var selectedItemsModel = new selectedItems();
                                selectedItemsModel.id = this.dropdownList3[oneDropdown].id;
                                selectedItemsModel.itemName = this.dropdownList3[oneDropdown].itemName;
                                this.selectedItems3_roundInvest.push(selectedItemsModel);
                            }

                        }

                        this.selectAll_round = this.selectedItems3_roundInvest.length;

                    }

                }
            }


            // set require traction-align
            if (this.userModel.investor_company_details.traction_align != null && this.userModel.investor_company_details.traction_align) {
                var traction_align_check = this.userModel.investor_company_details.traction_align;
                if (traction_align_check == "Y") {
                    this.align2 = true;
                    this.traction_align = 'Y';
                } else {
                    this.align2 = false;
                    this.traction_align = 'N';
                }
            }


            // set require traction_item
            if (this.userModel.investor_company_details.traction_item != null && this.userModel.investor_company_details.traction_item) {
                this.traction_item = this.userModel.investor_company_details.traction_item;
            }


            // set past investment
            if (this.userModel.investor_company_details.past_investments) {
                this.pastInvestments = this.userModel.investor_company_details.past_investments;
            }
        }




    }
    autoCompleteCallback(selectedData: any) {

        this.auto_location_data = selectedData.data;

        this.address = this.auto_location_data.formatted_address;

        this.lat = this.auto_location_data.geometry.location.lat
        this.lng = this.auto_location_data.geometry.location.lng;

    }
    ngAfterViewInit() {

        /*Validation color functionality start here */

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

        $('#min_check_size').on('keyup', function () {
            if ($('#min_check_size').val() != "") {
                $(this).css('border-bottom', 'solid 2px blue');
            }
        }).blur(function () {
            $(this).css('border-bottom', 'solid 1px #bbbbbb');
        });

        $('#max_check_size').on('keyup', function () {
            if ($('#max_check_size').val() != "") {
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

        /*Validation color functionality end here */

        var y = this.usernameData.length;
        // var ob[]=this.usernameData[]; 
        $('.custom-autocomplete__input input').attr("placeholder", "Enter  location").addClass('your-class').css("color", "#4b4f58");

        // $('#username').key(function(){
        //     for(var i=0;i<y;i++){
        //    if($('#username').val()==this.usernameData){
        //         $(this).addClass('.invalid_user');
        //    }}
        // });

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


    onclick() {
        $('#fileInput').trigger('click');
    }

    onclick2() {
        $('#fileInput2').trigger('click');
    }
    /* end upload image function */


    public least: string;
    public most: string;
    public round: string;

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
    onSelectAll_round(event: any) {
        this.selectAll_round = event.length;
    }
    onDeSelectAll_round(event: any) {
        this.deselectAll_round = event.length;
    }


    angel_submit() {

        this.least = "";
        this.most = "";
        this.round = "";
        if (this.selectedItems_sector_least.length == this.selectAll || this.selectedItems_sector_least.length == this.dropdownList2.length) {
            this.least = "All" + ", ";
            this.selectAll = ""
        }
        else {
            for (var l = 0; l < this.selectedItems_sector_least.length; l++) {

                this.least = this.least + this.selectedItems_sector_least[l].itemName + ", ";

            }
        }

        if (this.selectedItems_sector_most.length == this.selectAll_most || this.selectedItems_sector_most.length == this.dropdownList.length) {
            this.most = "All" + ", ";
            this.selectAll_most = ""
        }
        else {
            for (var l = 0; l < this.selectedItems_sector_most.length; l++) {

                this.most = this.most + this.selectedItems_sector_most[l].itemName + ", ";

            }

        }
        if (this.selectedItems3_roundInvest.length == this.selectAll_round || this.selectedItems3_roundInvest.length == this.dropdownList3.length) {
            this.round = "All" + ", ";
            this.selectAll_round = ""
        }
        else {
            for (var l = 0; l < this.selectedItems3_roundInvest.length; l++) {

                this.round = this.round + this.selectedItems3_roundInvest[l].itemName + ", ";

            }
        }

        var x = this.traction_align;
        if (x == "Y") {
            this.traction_align = "Y"
        } else {
            // traction = "no";
            // this.traction_item = "";
            this.traction_align = "N";
            this.traction_item = "";
        }

        var username = $('#username').val();
        var count: number = 0;
        var c = JSON.stringify(this.selectedItems_sector_most);
        var location = $('#search_places').val();
        var bio = $('#bio').val();
        var min_check_size = $('#min_check_size').val();
        var max_check_size = $('#max_check_size').val();
        var min_check$ = this.minCheck;
        var max_check$ = this.maxCheck;


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
        if (min_check_size == "") {
            count++;
            $('#min_check_size').css('border-bottom', 'solid 2px red');
        }
        if (max_check_size == "") {
            count++;
            $('#max_check_size').css('border-bottom', 'solid 2px red');



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


            let jwtToken = this.userModel.root_user.jwt_token;


            if (this.hero) {
                // do nothing
            } else {
                this.hero = this.heroImageUrl;
            }

            if (this.dp) {
                // do nothing
            } else {
                this.dp = this.heroImageUrl2;
            }

            let fd = new FormData();
            fd.append('hero', this.hero);
            fd.append('profile', this.dp);
            fd.append('bio', this.bioValue);
            fd.append('username', this.username_thedoor_check);
            // fd.append('location', this.auto_location_data);
            fd.append('address', this.address);
            fd.append('lat', this.lat);
            fd.append('lng', this.lng);

            fd.append('personalUrl', this.personalUrl);
            fd.append('tipFounders', this.tipFounders);
            fd.append('selectedItems_sector_least', this.least.slice(0, -2));
            fd.append('selectedItems_sector_most', this.most.slice(0, -2));
            fd.append('round_item_angel', this.round.slice(0, -2));

            fd.append('minCheck', min_check$);
            fd.append('maxCheck', max_check$);
            // fd.append('round_item_angel', JSON.stringify(this.selectedItems3_roundInvest));
            fd.append('traction_align', this.traction_align);
            fd.append('traction_item', this.traction_item);
            fd.append('pastInvestments', this.pastInvestments);
            fd.append('type', '22');


        this.loading = true;

            this.commonApiService.updateAngel(jwtToken, fd).subscribe(
                response => {
                            this.loading = false;

                    this.resData = response.json();

                    console.log(response + 'abcdsjdfhjds');
                    if (response.status == 200) {
                        // this.showSuccess(this.resData.msg, "Success!");

                        localStorage.setItem("userModel", JSON.stringify(this.resData));

                        this.router.navigate(['angel-investor-profile']);
                    }
                    else if (response.status == 400) {
                        this.showError(this.resData.msg, "Oops!");
                    }

                }, err => {
                            this.loading = false;
                    this.resData = err.json();
                    this.showError(this.resData.msg, 'Oops!');
                    console.log(this.resData.msg);
                }
            );

        }
        else {
            this.showError('Please complete all required fields.', 'Error!');
        }

    }


    onOpen(item: any) {

        $('.demo1 .selected-list .c-btn').css('border-bottom', 'solid 1px #bbbbbb');
    }


    //others  impportent method
    yes_align() {
        this.align2 = true;

    }
    no_align() {
        this.align2 = false;

    }

    //cropper
    fileChangeListener($event) {

        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };

        myReader.readAsDataURL(file);
    }
    fileChangeListener2($event) {

        var image: any = new Image();
        var file: File = $event.target.files[0];
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };

        myReader.readAsDataURL(file);
    }

    public image: any;
    public image2: any;
    public hero: any;
    public dp: any;
    setImage(event: any) {

        this.image = FileList = event.target.files[0];
        this.hero = this.image;
    }
    setImage2(event: any) {

        this.image2 = FileList = event.target.files[0];
        this.dp = this.image2
    }


    set_hero_image() {

        $("#picHero").attr("src", this.data.image);

    }

    set_logo_image() {
        $("#picLogo").attr("src", this.data2.image);

    }



    //TOASTER FUNCTION
    showSuccess(message, header) {
        this.toastr.success(message, header);
    }

    showError(message, header) {
        this.toastr.error(message, header);
    }
    //cropper end

    // fileChangeListener(event: any) {
    //      console.log(event);
    //     if (event.target.files && event.target.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             this.heroImageUrl2 = event.target.result;
    //         }
    //         reader.readAsDataURL(event.target.files[0]);
    //     }
    // }
    public refresh() {
        window.location.reload();
    }

    check_username() {

        this.username = $('#username').val();

        if (this.username.startsWith("thedoor.co/")) {
            this.username_thedoor_check = this.username.replace("thedoor.co/", "");
        }
        else {
            this.username_thedoor_check = $('#username').val();
        }

        // for (var i = 0; i < this.userName_api.length; i++) {
        //     if ($('#username').val() == this.userName_api[i] || $('#username').val() == null || $('#username').val() == "") {

        //         $('#username').removeClass('valid_user').addClass('invalid_user');

        //         return;


        //     }
        //     else {

        //         $('#username').removeClass('invalid_user').addClass('valid_user');

        //     }
        // }
        for (var i = 0; i < this.userName_api.length; i++) {
            if (this.username_thedoor_check == this.userName_api[i] || this.username_thedoor_check == null || this.username_thedoor_check == "") {

                $('#username').removeClass('valid_user').addClass('invalid_user');
                console.log(this.username[i]);
                this.username_thedoor_check = this.username_thedoor_check;
                console.log('latest name' + this.username_thedoor_check);
                return;


            }
            else {

                $('#username').removeClass('invalid_user').addClass('valid_user');

            }

        }
        this.username_thedoor_check = this.username_thedoor_check;
        console.log('latest name' + this.username_thedoor_check);
    }

}
