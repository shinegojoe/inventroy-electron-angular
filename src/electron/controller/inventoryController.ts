const { ipcMain } = require('electron')
import { inventoryStr } from '../../app/shared/apiString';
import { InventoryService } from '../service/inventoryService';
import { IInventory, PurchaseItem, Item, Inventory, Vender } from '../../app/shared/model';
import { ItemService } from '../service/itemService';
import { PurchaseItemService } from '../service/purchaseItemService';
import { VenderService } from '../service/venderService';
import { IInventoryVO } from '../../app/shared/vo';
import { IFieldSearch, IUpdateField } from 'src/app/shared/plyload';

export class InventoryController {
  inventoryService: InventoryService
  itemService: ItemService
  purchaseItemService: PurchaseItemService
  venderService: VenderService
  constructor() {
    this.inventoryService = new InventoryService();
    this.itemService = new ItemService();
    this.purchaseItemService = new PurchaseItemService();
    this.venderService = new VenderService();
    this.routeInit();
  }

  private routeInit() {
    this.add();
    this.list();
    // this.searchByItemNo();
    this.searchByItemId();
    this.updateField();

  }

  public add() {
    ipcMain.on(inventoryStr.add, async (event: any, payload: IInventory) => {
      const res = await this.inventoryService.add(payload);
      event.returnValue = res;
    })
  }

  private makeVOData(item: Item, inventory: Inventory, purchaseItem: PurchaseItem, vender: Vender) {
    const res: IInventoryVO = {
      item: item,
      inventory: inventory,
      purchaseItem: purchaseItem,
      vender: vender
    }
    return res;
  }

  searchByItemId() {
    ipcMain.on(inventoryStr.searchByItemId, async (event: any, itemId: number) => {
      const res: Array<IInventoryVO> = [];
      const payload: IFieldSearch = {
        field: "itemId",
        val: itemId
      }
      const inventoryList = await this.inventoryService.listByField(payload);
      for(let inventory of inventoryList) {
        const purchaseItem = await this.purchaseItemService.get(inventory.purchaseItemId);
        const item = await this.itemService.get(inventory.itemId);
        const vender = await this.venderService.get(item.venderId);
        const x: IInventoryVO = this.makeVOData(item, inventory, purchaseItem, vender);
        res.push(x);
      }
      event.returnValue = res;
    });
  }

  list() {
    ipcMain.on(inventoryStr.list, async (event: any, payload: IInventory) => {
      const res: Array<IInventoryVO> = [];
      const inventoryList = await this.inventoryService.list();
      for(let inventory of inventoryList) {
        const purchaseItem = await this.purchaseItemService.get(inventory.purchaseItemId);
        const item = await this.itemService.get(inventory.itemId);
        const vender = await this.venderService.get(item.venderId);
        const x: IInventoryVO = this.makeVOData(item, inventory, purchaseItem,vender);
        res.push(x);
      }
      event.returnValue = res;
    })
  }

  // searchByItemNo() {
  //   // get item.history by serialNo, then get the inventory list by historyId
  //   ipcMain.on(inventoryStr.searchByItemNo, async (event: any, serialNo: string) => {
  //     const item = await this.itemService.getBySerialNo(serialNo);
  //     if(item !== null) {
  //       const res = await this.inventoryService.listByHistoryId(item.historyId);
  //       event.returnValue = res;
  //     }
  //     event.returnValue = null;
  //   })
  //   // const item = await this.itemService.getBySerialNo(itemNo);


  // }

  purchaseSearchLikeItemName() {

  }

  purchaseSearchByVenderId() {

  }



  updateField() {
    ipcMain.on(inventoryStr.updateAmount, async (event: any, payload: IUpdateField) => {
      const inventoryList = await this.inventoryService.updateField(payload);
      event.returnValue = 0;
    })
  }


}
