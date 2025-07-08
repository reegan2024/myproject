import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
logout() {
localStorage.removeItem('userId');
localStorage.removeItem('userName');
this._authen.canAccess();

}

@Input() user="";

username: any;
/* home() {
this._appbody.appbody=true;

}
 */
/* about() {
  this._appbody.appbody=false;
  
  }
 */
  constructor(private _appbody:AppComponent, public _authen: AuthService) { 

    //console.log(_authen.isAuthenticated);

  }

  ngOnInit(): void {
//this._authen.canAccess();     
console.log(this._authen.isAuthenticated());
/* if(this._authen.isAuthenticated()){
this.username=localStorage.getItem("username");
} */
  }



}
