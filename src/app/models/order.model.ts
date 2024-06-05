export class Order {
  orderId: any;
  orderNo!: number;
  orderDate: any;
  grandTotal: number = 0;
  pharmacyId: number = 0;
  isApproved!: boolean;
  isDelivered!:boolean;
}
