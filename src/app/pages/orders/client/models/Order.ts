import { Dish, OrderStatus, PaymentStatus } from "../../Order"

export interface Order {
  id: number
  name: string
  restaurantName: string
  description: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  createdAt: Date
  dishes: Dish[]
}