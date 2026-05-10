export interface StorageSpace{
  id: number
  userId: number
  tile: string
  description: string
  pricePerMonth: number
  sizeValue: number
  height: number
  width: number
  length: number
  sizeUnit: string
  spaceType: string // this should be a type
  status: string // this should be a type
  instantBooking: boolean
  features: string[]
  imageUrls: string[]
  address: Address;
}

export interface Address  {
  id: number
  title: string
  address1: string
  address2: string
  state: string
  city: string
  postcode: string
  country: string
  lat: number
  lng: number
}
