import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
contactpage() {
throw new Error('Method not implemented.');
}
cowpage:boolean=false;
henpage:boolean=true;
housepage:boolean=true;

showhousepage() {
  this.henpage=true;
  this.cowpage=true;
  this.housepage=false;


}
showhenpage() {
  this.henpage=false;
  this.cowpage=true;
  this.housepage=true;

}
showhomepage() {
  this.henpage=true;
  this.cowpage=true;
  this.housepage=true;

}

showcowpage() {
  this.henpage=true;
  this.cowpage=false;
  this.housepage=true;

  
}

  constructor(public _auth:AuthService) { }

  ngOnInit(): void {
  this._auth.canAccess();
  }

}
