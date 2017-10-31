import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckOutComponent } from 'app/shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from 'app/shopping/components/my-orders/my-orders.component';
import { OrderDetailComponent } from 'app/shopping/components/order-detail/order-detail.component';
import { OrderSuccessComponent } from 'app/shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from 'app/shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from 'app/shopping/components/products/products.component';
import { ShippingFormComponent } from 'app/shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from 'app/shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from 'app/shopping/components/shopping-cart/shopping-cart.component';
import { AuthGuardService } from 'shared/services/auth-guard.service';

import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService] },
      { path: 'my/orders/:id', component: OrderDetailComponent, canActivate: [AuthGuardService] },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
    ])
  ],
  declarations: [
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartComponent,
    ProductsComponent,
    MyOrdersComponent
  ]
})
export class ShoppingModule { }
