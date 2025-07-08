import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router:Router) { }
  public isAuthenticated(): boolean {
    if (localStorage.getItem("userId") !== null) {
      return true;
    }
    return false;
  }

  public canAccess(){
    if(!this.isAuthenticated()){
      this._router.navigate(['login']);
    }
  }

public getToken(){
  return localStorage.getItem('token')||null;  
}
}
