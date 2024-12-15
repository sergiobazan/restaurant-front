import { Dish } from "./Dish"

export interface Menu {
  id: number
  name: string
  date: Date
  price: number
  dishes: Dish[]
}