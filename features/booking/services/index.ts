export const bookingService = {
  defaultFee: 5,

  getPriceWithFee(price: number): number {
    return this.defaultFee + price;
  },
};