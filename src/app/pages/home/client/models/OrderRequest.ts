
export interface OrderRequest {
  clientId: number
  menuId: number
  restaurantId: number
  description: string
  dishIds: number[]
}