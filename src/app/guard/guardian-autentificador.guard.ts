import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardianAutentificadorGuard implements CanActivate {
  estadoUser: boolean = false;
  constructor(
    private authSvc: AuthServiceService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authSvc.getUserLogged().pipe(map(aux => {
      if (aux === null || aux === undefined) {
        this.router.navigate(['/login']);
        console.log("Guardian: Ahora el user NOOOO esta logeado");
        return false;
      }
      else {
        console.log("Guardian: Ahora el user esta logeado");
        return true;
      }
    }))
  }
  
}
