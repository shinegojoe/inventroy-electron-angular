const { ipcMain } = require('electron')
import { itemStr } from '../../app/shared/apiString';
import { ItemService } from '../service/itemService';
import { IID, IUpgradeItem, IFieldSearch, IFieldSearchAndId } from '../../app/shared/plyload';
import { IItem } from '../../app/shared/model';


export class ItemController {
  itemService: ItemService
  constructor() {
    this.itemService = new ItemService();
    this.routeInit();
  }

  private routeInit() {
    this.list();
    this.add();
    this.setIsCurrentFalse();
    this.getHistoryList();
    this.upgradeItem();
    this.listByVenderId();
    this.listByLikeField();
    this.listByLikeFieldAndVenderId();
  }



  public list() {
    ipcMain.on(itemStr.list, async (event: any, arg: any) => {
      const res = await this.itemService.list();
      event.returnValue = res;
    })
  }

  public add() {
    ipcMain.on(itemStr.add, async (event: any, payload: IItem) => {
      const id = await this.itemService.add(payload);
      // await this.itemService.setHistoryId(id, id);
      event.returnValue = id;
    })
  }

  public upgradeItem() {
    ipcMain.on(itemStr.upgradeItem, async (event: any, payload: IUpgradeItem) => {
      const id = await this.itemService.add(payload.item);
      await this.itemService.setHistoryId(id, payload.historyId);
      await this.itemService.setIsCurrentFalse(payload.oldId);

      event.returnValue = id;
    })
  }

  public setIsCurrentFalse() {
    ipcMain.on(itemStr.setIsCurrentFalse, async (event: any, payload: IID) => {
      console.log("payload: ", payload);
      const res = await this.itemService.setIsCurrentFalse(payload.id);
      event.returnValue = res;
    })
  }

  public getHistoryList() {
    ipcMain.on(itemStr.getHistoryList, async (event: any, payload: IID) => {
      console.log("hisId: ", payload);
      const res = await this.itemService.getHistoryList(payload.id);
      event.returnValue = res;
    })
  }

  public listByVenderId() {
    ipcMain.on(itemStr.listByVenderId, async (event: any, payload: number) => {
      // console.log("hisId: ", payload);
      const res = await this.itemService.listByvenderId(payload);
      event.returnValue = res;
    })
  }

  public listByLikeField() {
    ipcMain.on(itemStr.listByLikeField, async (event: any, payload: IFieldSearch) => {
      const res = await this.itemService.listByLikeField(payload);
      event.returnValue = res;
    })
  }

  public listByLikeFieldAndVenderId() {
    ipcMain.on(itemStr.listByLikeFieldAndVenderId, async (event: any, payload: IFieldSearchAndId) => {
      const res = await this.itemService.listByLikeFieldAndVenderId(payload);
      event.returnValue = res;
    })
  }
}
