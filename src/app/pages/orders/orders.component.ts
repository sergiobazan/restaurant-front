import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from './Order';
import { OrderService } from './order.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishType } from '../home/models/Dish';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit {
  orders: Order[] = []
  restaurantId: number | null = null
  orderStatus = ['Pending', 'Confirmed', 'Delivered'].map((os, idx) => ({ id: idx, name: os }))
  paymentStatus = ['Pending', 'Paid'].map((os, idx) => ({ id: idx, name: os }))

  selectedStatus: string | null = ''

  dateSelected: string = 'today'

  constructor(private service: OrderService, private router: ActivatedRoute, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.restaurantId = parseInt(this.router.snapshot.paramMap.get('restaurantId')!);
    this.getOrders();
  }

  protected getOrders() {
    this.service.getOrdersByRestaurant(this.restaurantId!, this.dateSelected).subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.data;
          return;
        }
        return this.toaster.error('Error loading Orders');
      },
      error: () => this.toaster.error('Error loading Orders'),
    })
  }

  protected getStarterDishName(order: Order) {
    return order.dishes.find(dish => dish.type === DishType.STARTED)?.name || 'N/A';
  }
  protected getMainDishName(order: Order) {
    return order.dishes.find(dish => dish.type === DishType.MAIN_COURSE)?.name  || 'N/A';
  }

  protected getDefaultStatus(order: Order) {
    return this.orderStatus.find(os => os.name.toLowerCase().includes(order.status.toLowerCase()))?.id;
  }

  protected getDefaultPaymentStatus(order: Order) {
    return this.paymentStatus.find(os => os.name.toLowerCase().includes(order.paymentStatus.toLowerCase()))?.id;
  }

  onStatusChange(newOrderStatus: string, orderId: number): void {
    this.service.updateOrderStatus(orderId, parseInt(newOrderStatus)).subscribe({
      next: (response) => {
        if (response.success) {
          return;
        }
        return this.toaster.error(response.message);
      },
      error: () => this.toaster.error("Error updating status order")
    });
  }

  onPaymentStatusChange(newPaymentStatus: string, orderId: number) {
    this.service.updatePaymentStatus(orderId, parseInt(newPaymentStatus)).subscribe({
      next: (response) => {
        if (response.success) {
          return;
        }
        return this.toaster.error(response.message);
      },
      error: () => this.toaster.error("Error updating payment status")
    });
  }

  handleDateFilter() {
    this.getOrders()
  }
}

