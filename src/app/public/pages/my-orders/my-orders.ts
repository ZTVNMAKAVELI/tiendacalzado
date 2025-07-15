import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderService, Order } from '../../../core/services/order.service';
import { StorageService } from '../../../core/services/storage.service';
import { LoaderComponent } from '../../../shared/components/loader/loader';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, LoaderComponent, DatePipe, RouterLink],
  templateUrl: './my-orders.html',
  styleUrls: ['./my-orders.scss'] 
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  error: string | null = null;
  username: string = '';

  expandedOrderId: number | null = null;

  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const user = this.storageService.getUser();
    if (user && user.name) {
      this.username = user.name;
    } else {
      this.username = 'Usuario';
    }
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.error = null; 
    this.orderService.getMyOrders().subscribe({
      next: (data) => {

        this.orders = data.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los pedidos:', err);
        this.error = "No se pudo cargar tu historial de pedidos. Por favor, inténtalo de nuevo más tarde.";
        this.isLoading = false;
      }
    });
  }

  toggleOrderDetails(orderId: number): void {
    if (this.expandedOrderId === orderId) {
      this.expandedOrderId = null;
    } else {
      this.expandedOrderId = orderId;
    }
  }
}
