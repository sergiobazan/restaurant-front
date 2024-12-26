import { Menu } from "./Menu"

export interface Restaurant {
  id: number
  name: string
  address: string
  description: string
  openAt: Date
  closeAt: Date
  menu: Menu
  slug: string
}