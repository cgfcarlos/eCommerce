import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;

  constructor(private cartSercice: ShoppingCartService) { }

  ngOnInit() {
  }

}
