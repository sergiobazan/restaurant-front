export interface Dish {
  id: number
  name: string
  description: string
  unitPrice: number
  type: DishType
  available: boolean
}

export enum DishType {
  STARTED = 'STARTED',
  MAIN_COURSE = 'MAIN_COURSE',
  EXTRA = 'EXTRA'
}