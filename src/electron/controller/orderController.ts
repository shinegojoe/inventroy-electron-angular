const { ipcMain } = require('electron')
import { orderStr } from '../../app/shared/apiString';
import { IAddOrder, IFieldSearch } from '../../app/shared/plyload';
import { OrderService } from '../service/orderService';
import { OrderItemSerivce } from '../service/orderItemService';
import { IOrderVO, IOrderIdVO, OrderItemVO } from '../../app/shared/vo';
import { ItemService } from '../service/itemService';
import { Inventory, Order, PurchaseItem, Vender } from '../../app/shared/model';
import { InventoryService } from '../service/inventoryService';
import { VenderService } from '../service/venderService';
import { PurchaseItemService } from '../service/purchaseItemService';


export class OrderController {

  orderService: OrderService
  orderItemService: OrderItemSerivce
  itemService: ItemService
  inventoryService: InventoryService
  venderService: VenderService
  purchaseItemService: PurchaseItemService
  constructor() {
    this.orderService = new OrderService();
    this.orderItemService = new OrderItemSerivce();
    this.itemService = new ItemService();
    this.inventoryService = new InventoryService();
    this.venderService = new VenderService();
    this.purchaseItemService = new PurchaseItemService();
    this.routeInit();
  }

  private routeInit() {
    this.add();
    this.list();
    this.listByItemField();
    this.listByLikeField();
    this.chechSuck();
    this.get();
    this.listIOrderVOByField();
    this.update();
  }

  add() {
    ipcMain.on(orderStr.add, async (event: any, payload: IAddOrder) => {
      // add order return insereted id, set id orderId for orderItemList, insert
      const orderId = await this.orderService.add(payload.order);
      console.log("orderId: ", orderId);
      for (let orderItem of payload.orderItemList) {
        orderItem.orderId = orderId;
        await this.orderItemService.add(orderItem);
        // todo ..reduce the amount
        const inventoryItem = await this.inventoryService.get(orderItem.inventoryId);
        console.log("old: ", orderItem.amount, "in: ", inventoryItem.amount);
        const newAmount = inventoryItem.amount - orderItem.amount;
        console.log("new: ", newAmount, "id: ", inventoryItem.id);
        await this.inventoryService.setAmount(newAmount, inventoryItem.id);

      }
      event.returnValue = orderId;
    })

  }


  list() {
    ipcMain.on(orderStr.list, async (event: any, payload: any) => {
      const res: Array<IOrderVO> = [];
      const orderList = await this.orderService.list();
      for (let order of orderList) {
        const orderItemVOList: Array<OrderItemVO> = [];
        const orderItemList = await this.orderItemService.listByOrderId(order.id);
        for(let orderItem of orderItemList) {
          const vo = await this.orderItemService.getOrderItemVO(orderItem.id, orderItem.itemId);
          // console.log("vo: ", vo);
          orderItemVOList.push(vo);
        }
        const item: IOrderVO = {
          order: order,
          orderItemVOList: orderItemVOList,
        }
        res.push(item);
      }
      event.returnValue = res;
    })

  }

  listIOrderVOByField() {
    ipcMain.on(orderStr.listIOrderVOByField, async (event: any, payload: IFieldSearch) => {
      const res: Array<IOrderVO> = [];
      const orderList = await this.orderService.listByField(payload);
      for (let order of orderList) {
        const orderItemVOList: Array<OrderItemVO> = [];
        const orderItemList = await this.orderItemService.listByOrderId(order.id);
        for(let orderItem of orderItemList) {
          const vo = await this.orderItemService.getOrderItemVO(orderItem.id, orderItem.itemId);
          // console.log("vo: ", vo);
          orderItemVOList.push(vo);
        }
        const item: IOrderVO = {
          order: order,
          orderItemVOList: orderItemVOList,
        }
        res.push(item);
      }
      event.returnValue = res;
    })
  }


  listByItemField() {
    // get itemIds => get order=> get orderItemVO
    ipcMain.on(orderStr.listByItemField, async (event: any, payload: IFieldSearch) => {

      const res: Array<IOrderVO> = [];
      // const itemList = await this.itemService.listByField(payload);

      const orderIdList: Array<IOrderIdVO> = await this.orderItemService.listByItemField(payload);
      for (let idItem of orderIdList) {
        const orderItemVOList: Array<OrderItemVO> = [];
        const orderId = idItem.orderId;
        const order = await this.orderService.get(orderId);
        const orderItemList = await this.orderItemService.listByOrderId(orderId);
        for(let orderItem of orderItemList) {
          const vo = await this.orderItemService.getOrderItemVO(orderItem.id, orderItem.itemId);
          console.log("vo: ", vo);
          orderItemVOList.push(vo);
        }
        const item: IOrderVO = {
          order: order,
          orderItemVOList: orderItemVOList,
        }
        res.push(item);
      }

      event.returnValue = res;
    })
  }


  listByLikeField() {
    ipcMain.on(orderStr.listByLikeField, async (event: any, payload: IFieldSearch) => {
      const res = await this.orderService.listByLikeField(payload);
      event.returnValue = res;
    })
  }

  chechSuck() {
    ipcMain.on(orderStr.checkSuck, async (event: any, payload: IFieldSearch) => {
      const res = await this.orderService.checkSuck(payload);
      event.returnValue = res;
    })
  }

  get() {
    ipcMain.on(orderStr.get, async (event: any, id: number) => {
      const res = await this.orderService.get(id);
      event.returnValue = res;
    })
  }

  update() {
    ipcMain.on(orderStr.update, async (event: any, payload: Order) => {
      const res = await this.orderService.update(payload);
      event.returnValue = res;
    })
  }



}
