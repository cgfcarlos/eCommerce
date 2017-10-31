import { Product } from '../../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../shared/services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  filteredProducts: Product[] = [];
  categories$;
  @Input('category') category;

  products: Product[] = [];
  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) : this.products;
    });
  }

  ngOnInit() {
  }

}
