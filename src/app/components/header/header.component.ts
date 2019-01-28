import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentURL:any;
  action:string;
  link:string;

  constructor() {
    // this.currentURL = window.location.href.split('/');
    // this.action = (this.currentURL[3] == '') ? ' Sign in' : 'Register';
    // this.link = (this.currentURL[3] == '') ? 'login' : '';
    // console.log(this.action);
  }

  ngOnInit() {

  }

  goHome(){
    
  }

}
