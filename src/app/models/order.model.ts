export class Order {
  orderId: any;
  orderNo!: number;
  orderDate: any;
  grandTotal: number = 0;
  paymentTotal: number = 0;
  totalDue!: number;
  pharmacyId: number = 0;
}
