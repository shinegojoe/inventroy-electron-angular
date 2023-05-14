

export interface ICategory {
  name: string,
  code: string
}

export interface IVender {
  id?: number
  name: string
  serialNo: string
  phone: string,
  address: string,
  note: string
}


export class Vender implements IVender {
  phone: string = "";
  address: string = "";
  note: string = "";
  id: number = 0;
  name: string = "";
  serialNo: string = "";
}

export interface IItem {
  id?: number
  venderId: number
  name: string
  serialNo: string

}

export class Item implements IItem {
  id: number = 0;
  venderId: number = 0;
  name: string = "";
  serialNo: string = "";
}

export interface IOrder {
  id?: number
  recipient: string
  purchaser: string
  driver: string
  recipientPhone: string
  purchaserPhone: string
  driverPhone: string
  address: string
  orderItemId: number
  createDate: string
  isClosed: number
  totalPrice: number
  note: string
  serialNo: string
  receiptDate: string
  payment: string
  isSuck: number

}

export class Order implements IOrder {
  payment: string = "";
  isSuck: number = 0;
  receiptDate: string = "";
  id: number = 0;
  recipient: string = "";
  purchaser: string = "";
  driver: string = "";
  recipientPhone: string = "";
  purchaserPhone: string = "";
  driverPhone: string = "";
  address: string = "";
  orderItemId: number = 0;
  createDate: string = "";
  isClosed: number = 0;
  totalPrice: number = 0;
  note: string = "";
  serialNo: string = "";
  
  

}

export interface IOrderItem {
  id?: number
  itemId: number
  sellPrice: number
  amount: number
  note: string
  orderId: number
  inventoryId: number
  isArrive: number
  arriveDate: string
  returnDate: string
}

export interface IPurchase {
  id?: number
  serialNo: string
  createDate: string
  payment: string
  totalPrice: number
  note: string
  isDone: number

}

export interface IPurchaseItem {
  id?: number
  itemId: number
  amount: number
  price: number
  purchaseId: number
  size: string
  color: string
  model: string
  note: string

}

export interface IInventory {
  id?: number
  itemId: number
  returnDate: string
  amount: number
  price: number
  purchaseId: number
  createDate: string
  purchaseItemId: number
}

export interface IItemPrice {
  id?: number
  price: number
  itemId: number
  createTime: string
}

export class OrderItem implements IOrderItem {
  returnDate: string = "";
  isArrive: number = 0;
  arriveDate: string = "";
  id: number = 0;
  itemId: number = 0;
  sellPrice: number = 0;
  amount: number = 0;
  note: string = "";
  orderId: number = 0;
  inventoryId: number = 0; 

}

export class Purchase implements IPurchase {
  isDone: number = 0;
  note: string = "";
  createDate: string = "";
  payment: string = "";
  id: number = 0;
  serialNo: string = "";
  totalPrice: number = 0;


}

export class PurchaseItem implements IPurchaseItem {
  size: string = "";
  color: string = "";
  model: string = "";
  id: number = 0;
  itemId: number = 0;
  amount: number = 0;
  price: number = 0;
  purchaseId: number = 0;
  note: string = "";

}

export class Inventory implements IInventory {
  purchaseItemId: number = 0;
  id: number = 0;
  itemId: number = 0;
  returnDate: string = "";
  amount: number = 0;
  price: number = 0;
  purchaseId: number = 0;
  createDate: string = "";
}

export class ItemPrice implements IItemPrice {
  id: number = 0;
  price: number = 0;
  itemId: number = 0;
  createTime: string = "";
}

export interface IResp {
  err: boolean
  data: any
}

export class Resp<T> implements IResp {
err: boolean = false
data: T
constructor(data: T, isErr: boolean = false) {
  this.data = data;
  this.err = isErr;
}

}



