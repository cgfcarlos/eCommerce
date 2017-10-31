import { OrderService } from '../../../shared/services/order.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {};
  userSubscription: Subscription;
  userId: string;
  @Input('cart') cart: ShoppingCart;


  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private orderService: OrderService, private router: Router, private cartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);

    const x = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })
    };

    const result = await this.orderService.placeOrder(x);
    this.cartService.clearCart();
    this.router.navigate(['/order-success', result.key]);
  }

}
