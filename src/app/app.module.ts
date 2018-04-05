import { Component, NgModule } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import {RecaptchaModule} from 'ng-recaptcha';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { CustomFormsModule } from 'ng2-validation'
import { PassdatabetweenService } from './services/passdatabetween.service'
//import { Ng4DropdownModule } from 'ng4-material-dropdown';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { CoolLoadingIndicatorModule } from 'angular2-cool-loading-indicator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { RlTagInputModule } from 'angular2-tag-input';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { TagInputModule } from 'ngx-chips';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { ImageUploadModule } from 'ng2-imageupload';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { MatSelectModule, MatDialogModule, MatRadioModule } from '@angular/material';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { LocalStorageModule } from 'angular-2-local-storage';
import { LoadingModule } from 'ngx-loading';



import { CommonapiService } from './services/commonapi.service';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
// import { VerifyemailComponent } from './verifyemail/verifyemail.component';

import { SignupFormComponent } from './signup-form/signup-form.component';
import { VerifyRegistrationComponent } from './verify-registration/verify-registration.component';
import { VerifyUserEmailComponent } from './verify-user-email/verify-user-email.component';
import { FounderReregistrationComponent } from './founder-reregistration/founder-reregistration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CountdownPipe } from './founder-reregistration/count';
import { AngelInvestorRegistrationComponent } from './angel-investor-registration/angel-investor-registration.component';
import { InvestorRegistrationComponent } from './investor-registration/investor-registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchviewComponent } from './searchview/searchview.component';
import { FounderProfileComponent } from './founder-profile/founder-profile.component';
import { StartupProfileComponent } from './startup-profile/startup-profile.component';
import { AngelInvestorProfileComponent } from './angel-investor-profile/angel-investor-profile.component';
import { InvestorProfileComponent } from './investor-profile/investor-profile.component';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { EditAngelComponent } from './edit-angel/edit-angel.component';
import { EditInvestorComponent } from './edit-investor/edit-investor.component';
import { FounderComponent } from './founder/founder.component';
import { StartupComponent } from './startup/startup.component';

import { InvestorComponent } from './investor/investor.component';
import { OrganizationComponent } from './organization/organization.component';
import { AngelComponent } from './angel/angel.component';
import { PublicprofileComponent } from './publicprofile/publicprofile.component';
import { EditfounderComponent } from './editfounder/editfounder.component';

let providers = {
  "linkedin": {
    "clientId": "818dsi4eznsgs7"
  }
}


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsOfServiceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'signup-form', component: SignupFormComponent },
  { path: 'verify-success', component: VerifyRegistrationComponent },
  { path: 'verify-email/:token/:user', component: VerifyUserEmailComponent },
  { path: 'founder-register/:token', component: FounderReregistrationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'angel-investor-register/:token', component: AngelInvestorRegistrationComponent },
  { path: 'investor-register/:token', component: InvestorRegistrationComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'search-view', component: SearchviewComponent },
  { path: 'founder-profile', component: FounderProfileComponent },
  { path: 'startup-profile', component: StartupProfileComponent },
  { path: 'angel-investor-profile', component: AngelInvestorProfileComponent },
  { path: 'investor-profile', component: InvestorProfileComponent },
  { path: 'organization-profile', component: OrganizationProfileComponent },
  { path: 'edit-angel', component: EditAngelComponent },
  { path: 'edit-investor', component: EditInvestorComponent },
  { path: 'edit-founder', component: EditfounderComponent },

 { path: 'search-founder', component: FounderComponent },
 { path: 'search-investor', component: InvestorComponent },
 { path: 'search-startup', component: StartupComponent },
 { path: 'search-organization', component: OrganizationComponent },
 { path: 'search-angel', component: AngelComponent },

  { path: ':publicusername', component: PublicprofileComponent },



];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PrivacyComponent,
    TermsOfServiceComponent,
    RegistrationComponent,
    LoginComponent,

    SignupFormComponent,

    VerifyRegistrationComponent,

    VerifyUserEmailComponent,
    FounderReregistrationComponent, ForgotPasswordComponent,
    CountdownPipe, AngelInvestorRegistrationComponent, InvestorRegistrationComponent,
    ResetPasswordComponent, ImageCropperComponent, SearchviewComponent, FounderProfileComponent,
    StartupProfileComponent, AngelInvestorProfileComponent, InvestorProfileComponent,
    OrganizationProfileComponent, EditAngelComponent, EditInvestorComponent, FounderComponent,
    StartupComponent, InvestorComponent, OrganizationComponent, AngelComponent, PublicprofileComponent,
    EditfounderComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(routes),
    HttpClientModule, HttpModule, ModalModule.forRoot(), BootstrapModalModule
    , Angular2SocialLoginModule, CustomFormsModule, ReCaptchaModule, CoolLoadingIndicatorModule
    , BrowserAnimationsModule, BusyModule, ToastModule.forRoot(),
    RlTagInputModule, AngularMultiSelectModule, TagInputModule,
    ImageUploadModule, ReactiveFormsModule,
    Ng4GeoautocompleteModule.forRoot(), MatSelectModule, MatDialogModule, MatRadioModule,
    Ng2DeviceDetectorModule.forRoot(), Ng2AutoCompleteModule, LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),LoadingModule
  ],
  providers: [PassdatabetweenService, CommonapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
platformBrowserDynamic().bootstrapModule(AppModule);
