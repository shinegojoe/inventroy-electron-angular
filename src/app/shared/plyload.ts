import { IItem, IOrder, IPurchase, IPurchaseItem, IOrderItem, PurchaseItem } from './model'


interface IID {
  id: number
}

interface IUpgradeItem {
  item: IItem,
  historyId: number,
  oldId: number
}

interface IAddPurchase {
  purchase: IPurchase,
  purchaseItem: Array<IPurchaseItem>
}

interface IAddItemPrice {
  price: number
  itemId: number
  createTime: string
}

interface IAddOrder {
  order: IOrder
  orderItemList: Array<IOrderItem>
}

interface IDateSearchById {
  id: number | string
  start: string
  end: string
}

export interface IDateSearch {
  start: string
  end: string
}

interface IFieldSearch {
  field: string
  val: string | any
}

interface IFieldSearchAndId {
  field: string
  val: string,
  id: number
}



export interface IUpdateField {
  id: number
  field: string
  val: any
}

export { IID, IUpgradeItem, IAddPurchase, IAddItemPrice, IAddOrder, IDateSearchById, IFieldSearch, IFieldSearchAndId }
