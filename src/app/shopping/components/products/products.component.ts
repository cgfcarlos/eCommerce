import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filteredProducts: Product[] = [];
  products$;
  products: Product[] = [];
  category;
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService, private productService: ProductService, private route: ActivatedRoute) {

  }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) : this.products;
  }

  private populateProducts() {
    this.productService.getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
    });
  }
}
