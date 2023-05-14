import { Purchase, PurchaseItem, Order, Inventory, Item, Vender, OrderItem } from './model'

export interface IPurchaseIdVO {
  purchaseId: number
}

export interface IOrderIdVO {
  orderId: number
}

export interface IPurchaeVO {
  purchase: Purchase
  purchaseItemList: Array<PurchaseItemVO>
}

export class PurchaseItemVO {
  itemName: string = ""
  itemNo: string = ""
  amount: number = 0
  price: number = 0
  purchaseId: number = 0
  itemId: number = 0
  venderName: string = ""
  model: string = ""
  color: string = ""
  size: string = ""
  note: string = ""

}


export interface IInventoryItemVO {
  itemName: string
  itemNo: string
  date: string
  amount: number
  price: number
  itemId: number

}

export interface IOrderVO {
  order: Order
  orderItemVOList: Array<OrderItemVO>
  // purchaseItemList: Array<PurchaseItem>
}

export class OrderItemVO {
  id: number = 0;
  itemId: number = 0;
  sellPrice: number = 0;
  amount: number = 0;
  note: string = "";
  orderId: number = 0;
  isArrive: number = 0;
  arriveDate: string = "";
  inventoryId: number = 0;
  returnDate: string = "";
  model: string = "";
  size: string = "";
  color: string = "";
  itemName: string = "";
  venderName: string = "";
}

// export interface IOrderItemVO {
//   price: number
//   amount: number
//   note: string
//   itemName: string
//   itemNo: string
//   orderId: number

// }

export class PurchaseSearchResVO {
  date: string = ""
  amount: number = 0
  price: number = 0
  name: string = ""
  note: string = ""
  serialNo: string = ""
  venderName: string = ""
}

export interface IInventoryVO {
  item: Item,
  inventory: Inventory,
  purchaseItem: PurchaseItem
  vender: Vender
}

