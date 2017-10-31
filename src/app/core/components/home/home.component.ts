import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  filteredProducts: Product[] = [];
  categories$;
  products$;
  products: Product[] = [];
  subscription: Subscription;

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.subscription = this.productService.getAll().subscribe( products => {
      this.filteredProducts = this.products = products;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(categoryId) {
    this.filteredProducts = (categoryId) ?
    this.products.filter(p => p.category.toLowerCase() === categoryId) : this.products;
  }

  getProducts() {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products;
      });
  }

}
