import { DishType } from "../home/models/Dish"

export interface Order {
  id: number
  restaurantId: number
  menuId: number
  clientId: number
  clientName: string
  description: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  dishes: Dish[]
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID'
}

interface Dish {
  id: number
  name: string
  type: DishType
}