import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})
export class TermsOfServiceComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
     window.scroll(0,0);
  }
home(){
    this.router.navigate(['']);
  
  }
 login() {
    this.router.navigate(['login']);

  } 
}
