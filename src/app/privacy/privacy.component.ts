import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
     window.scroll(0,0);
  } home(){
    this.router.navigate(['']);
  }
login() {
    this.router.navigate(['login']);

  } 
}
