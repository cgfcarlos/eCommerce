import { Product } from './../models/product';
import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }

    return cartId;

  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const items$ = this.getItem(cartId, product.$key);
    items$.take(1).subscribe(item => {
      const quantity = (item.quantity || 0) + change;
      if (quantity === 0) {
        items$.remove();
      } else {
        items$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity});
      }
    });
  }

}
