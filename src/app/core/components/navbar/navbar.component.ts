import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private cartService: ShoppingCartService) {}

  async ngOnInit() {
    // Obtiene si el usuario esta logeado o no
    // Si esta loggeado lo devuelve si no null
    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      console.log(this.appUser);
    });
    // Obtiene un observable de forma asincrona sin necesidad de subscribirse
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
