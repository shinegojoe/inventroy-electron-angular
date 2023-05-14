import { ElectronService } from 'ngx-electron';
import { itemStr } from '../shared/apiString';
import { Injectable } from '@angular/core';
import { IID, IUpgradeItem, IFieldSearch, IFieldSearchAndId } from '../shared/plyload';
import { IItem } from '../shared/model'


@Injectable({
    providedIn: 'root',
})
export class ItemService {
  constructor(private _electronService: ElectronService) {

  }

  list() {
    return this._electronService.ipcRenderer.sendSync(itemStr.list);
  }

  setIsCurrentFalse(payload: IID) {
    return this._electronService.ipcRenderer.sendSync(itemStr.setIsCurrentFalse, payload);
  }

  add(item: IItem) {
    // const data: IItem = {
    //   name: "xx",
    //   serialNo: "qqq",
    //   venderId: 1
    // }
    return this._electronService.ipcRenderer.sendSync(itemStr.add, item);
  }

  getHistoryList(historyId: number) {
    const payload = {id: historyId};
    return this._electronService.ipcRenderer.sendSync(itemStr.getHistoryList, payload);

  }

  upgradeItem(item: IItem, oldId: number, historyId: number) {
    const payload: IUpgradeItem = {
      item: item,
      oldId: oldId,
      historyId: historyId
    }
    return this._electronService.ipcRenderer.sendSync(itemStr.upgradeItem, payload);

  }

  listByVenderId(venderId: number) {
    return this._electronService.ipcRenderer.sendSync(itemStr.listByVenderId, venderId);

  }

  listByLikeField(payload: IFieldSearch) {
    return this._electronService.ipcRenderer.sendSync(itemStr.listByLikeField, payload);
  }

  listByLikeFieldAndVenderId(payload: IFieldSearch, venderId: number) {
    const newPayLoad: IFieldSearchAndId = {
      ...payload,
      id: venderId
    }
    return this._electronService.ipcRenderer.sendSync(itemStr.listByLikeFieldAndVenderId, newPayLoad);
  }
}
