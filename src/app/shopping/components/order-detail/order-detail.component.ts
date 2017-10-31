import { OrderService } from '../../../shared/services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  order: any;
  orderId: string;
  date: Date;
  subscription: Subscription;
  subscriptionOrder: Subscription;
  isCollapsed = true;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe(param => {
      this.orderId = param.get('id');
    });
    this.subscriptionOrder = this.orderService.getOrder(this.orderId).subscribe(order => {
      this.order = order;
      this.date = new Date(order.datePlaced);
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionOrder.unsubscribe();
  }

}
