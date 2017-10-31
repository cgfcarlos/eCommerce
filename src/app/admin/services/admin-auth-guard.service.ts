import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authService.user$
      .switchMap(user => this.userService.get(user.uid))
      .map(appUser => appUser.isAdmin);
  }
}
