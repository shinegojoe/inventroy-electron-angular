import { ElectronService } from 'ngx-electron';
import { inventoryStr } from '../shared/apiString';
import { Injectable } from '@angular/core';
import { IID, IUpgradeItem, IUpdateField } from '../shared/plyload';
import { IInventory, Inventory } from '../shared/model'
import { IInventoryItemVO, IInventoryVO } from '../shared/vo';



@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  constructor(private _electronService: ElectronService) {


  }
  add(body: IInventory) {
    const res = this._electronService.ipcRenderer.sendSync(inventoryStr.add, body);
    return res;
  }

  list(): Array<IInventoryVO> {
    return this._electronService.ipcRenderer.sendSync(inventoryStr.list);
  }

  getBySerialNo(itemNo: string) {
    // const id = "AX2-3";
    return this._electronService.ipcRenderer.sendSync(inventoryStr.searchByItemNo, itemNo);

  }

  searchByItemId(itemId: number): Array<IInventoryVO> {
    return this._electronService.ipcRenderer.sendSync(inventoryStr.searchByItemId, itemId);
  }

  setAmount(amount: number, id: number) {
    const payload: IUpdateField = { 
      field: "amount",
      val: amount,
      id: id
    }
    return this._electronService.ipcRenderer.sendSync(inventoryStr.updateAmount, payload);
  }

}
