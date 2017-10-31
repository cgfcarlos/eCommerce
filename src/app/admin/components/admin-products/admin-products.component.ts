import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemsCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = products;

      this.initialazeTable(products);
    });
  }

  filter(query: string) {
    const filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

      this.initialazeTable(filteredProducts);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initialazeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0})
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemsCount = count);
  }

  reloadItems(params) {
    if (this.tableResource) {
      this.tableResource.query(params)
      .then(items => this.items = items);
    }
  }

}
