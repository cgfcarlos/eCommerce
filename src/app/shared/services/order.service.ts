import { ShoppingCartService } from './shopping-cart.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }

  getOrder(orderId: string) {
    return this.db.object('/orders/' + orderId);
  }

}
