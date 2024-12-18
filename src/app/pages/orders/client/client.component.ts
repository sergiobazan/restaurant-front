import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DishType } from '../../home/models/Dish';
import { Order } from './models/Order';

@Component({
  selector: 'app-order-client',
  templateUrl: './client.component.html',
  styleUrls: []
})
export class ClientOrderComponent implements OnInit {
  clientId: number | null = null;
  orders: Order[] = [];

  dateSelected: string = 'today';

  constructor(private service: ClientService, private router: ActivatedRoute, private toaster: ToastrService) {}
  
  ngOnInit(): void {
    this.clientId = parseInt(this.router.snapshot.paramMap.get("clientId")!);
    this.getOrders();
  }

  private getOrders() {
    this.service.getClientOrders(this.clientId!, this.dateSelected).subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.data;
          return;
        }
        return this.toaster.error(response.message);
      },
      error: () => this.toaster.error("Error loading orders")
    });
  }

  protected getStarterDishName(order: Order) {
    return order.dishes.find(dish => dish.type === DishType.STARTED)?.name || 'N/A';
  }
  protected getMainDishName(order: Order) {
    return order.dishes.find(dish => dish.type === DishType.MAIN_COURSE)?.name  || 'N/A';
  }

  handleDateFilter() {
    this.getOrders()
  }
}
