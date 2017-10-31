import { CategoryService } from './category.service';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  // tslint:disable-next-line:max-line-length
  constructor(private categoryService: CategoryService, private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this.user$ =  afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return  Observable.of(null);
      });
  }

}
