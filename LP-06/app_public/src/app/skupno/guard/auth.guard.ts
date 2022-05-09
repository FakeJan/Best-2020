import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AvtentikacijaService } from '../storitve/avtentikacija.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private avtentikacijaStoritev: AvtentikacijaService, private router: Router, private location: Location) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var userRole= this.avtentikacijaStoritev.vrniTipUporabnika();
      if(userRole==null || route.data.role != userRole.tip){
        this.location.back();
        return false;
      }else{
        return true;
      }
  }
}
