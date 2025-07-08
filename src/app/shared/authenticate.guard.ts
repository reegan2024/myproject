import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

constructor(private authservice:AuthService,private _router:Router){

}
  canActivate(){
      if(this.authservice.isAuthenticated()){
        return true;
      }
      else
      {
        this._router.navigate(['login']);
        return false;
      }
  }
  
}
