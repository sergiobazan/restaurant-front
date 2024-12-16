export interface RestaurantRequest {
  name: string
  address: string
  description: string
  openAt: Date
  closeAt: Date
  ownerId: number
}