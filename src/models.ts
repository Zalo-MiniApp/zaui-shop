export interface Restaurant {
  id: number
  name: string
  districtId: number
  location: Location
  views: number
  image: string
  address: string
  hours: {
    opening: Hours,
    closing: Hours,
  },
  days: {
    opening: number
    closing: number
  },
  hotline: string
  map: string
  rating: number
}

export interface District {
  id: number
  name: string
}

export interface Location {
  lat: number,
  long: number
}

export interface Menu {
  categories: Category[]
}

export interface Category {
  id: number
  name: string
  foods: Food[]
}

export interface Food {
  id: number
  name: string
  price: number
  description: string
  image: string
  categories: string[]
  extras: Extra[]
  options: Option[]
}

export interface Option {
  key: string
  label: string
  selected: boolean
}

export interface Extra {
  key: string
  label: string
  options: {
    key: string
    label: string
    selected?: boolean
  }[]
}

export interface Cart {
  items: CartItem[]
}

export interface CartItem {
  quantity: number
  food: Food
  note: string
}

export type Hours = [number, number, 'AM' | 'PM'];

export interface Booking {
  id: string
  restaurant: Restaurant
  cart?: Cart
  bookingInfo?: {
    date: Date
    hour: Hours
    table: string
    seats: number
  }
}

export type TabType = 'info' | 'menu' | 'book';
