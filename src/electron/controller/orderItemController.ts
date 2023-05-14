const { ipcMain } = require('electron')
import { orderItemStr } from '../../app/shared/apiString';
import { OrderItem } from '../../app/shared/model';
import { OrderItemSerivce } from '../service/orderItemService';
import { InventoryService } from '../service/inventoryService';
import { IDateSearch } from '../../app/shared/plyload';

export class OrderItemController {
    orderItemService: OrderItemSerivce
    inventoryService: InventoryService
    constructor() {
        this.orderItemService = new OrderItemSerivce();
        this.inventoryService = new InventoryService();
        this.routeInit();
    }

    private routeInit() {
        this.add();
        this.list();
        this.returnItem();
        this.setArrive();
        this.returnListByDate();
    
    }

    add() {
        ipcMain.on(orderItemStr.add, async (event: any, payload: any) => {
            // const res = await this.inventoryService.add(payload);
           //  event.returnValue = res;
        })

    }

    list() {
        ipcMain.on(orderItemStr.list, async (event: any, payload: any) => {
            // const res = await this.inventoryService.add(payload);
           //  event.returnValue = res;
        })

    }


    returnItem() {
        ipcMain.on(orderItemStr.returnItem, async (event: any, orderItem: OrderItem) => {
            const res = await this.orderItemService.update(orderItem);
            const inventoryItem = await this.inventoryService.get(orderItem.inventoryId);
            const newAmount = inventoryItem.amount + orderItem.amount;
            await this.inventoryService.setAmount(newAmount, inventoryItem.id);
            event.returnValue = res;
        })
    }

    setArrive() {
        ipcMain.on(orderItemStr.setArrive, async (event: any, orderItem: OrderItem) => {
            const res = await this.orderItemService.update(orderItem);
            event.returnValue = res;
        })
    }

    returnListByDate() {
        ipcMain.on(orderItemStr.returnListByDate, async (event: any, payload: IDateSearch) => {
            const res = await this.orderItemService.returnListByDate(payload);
            event.returnValue = res;
        })
    }
}