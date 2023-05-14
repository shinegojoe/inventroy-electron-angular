import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IAddPurchase, IDateSearchById, IFieldSearch } from '../shared/plyload';
import { purchaseItemStr, purchaseStr} from '../shared/apiString';
import { IResp, Purchase, PurchaseItem, Resp } from '../shared/model';
import { IPurchaeVO } from '../shared/vo';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {

  constructor(private _electronService: ElectronService) {

  }

  add(body: IAddPurchase) {
    const res = this._electronService.ipcRenderer.sendSync(purchaseStr.add, body);
    console.log("add: ", res);
    return res;
  }

  list(): Array<IPurchaeVO> {
    const res = this._electronService.ipcRenderer.sendSync(purchaseStr.list);
    return res;
  }

  searchByVenderId(payload: IDateSearchById): Array<IPurchaeVO> {
    const res = this._electronService.ipcRenderer.sendSync(purchaseStr.searchByVenderId, payload);
    return res;
  }

  searchBypurchaseNo() {

  }

  listByLikeField(payload: IFieldSearch): Array<Purchase> {
    const res = this._electronService.ipcRenderer.sendSync(purchaseStr.listByLikeField, payload);
    return res;
  }

  searchByPurchaseNo(payload: IDateSearchById): Array<IPurchaeVO> {
    const res = this._electronService.ipcRenderer.sendSync(purchaseStr.searchByPurchaseNo, payload);
    return res;
  }

  setIsDone(id: number) {
    const res = this._electronService.ipcRenderer.sendSync(purchaseStr.setIsDone, id);
    return res;
  }

  updatePurchaseItem(item: PurchaseItem): IResp {
    const res = this._electronService.ipcRenderer.sendSync(purchaseItemStr.update, item);
    return res;
  }

  searchAllUnpay() {
    const res = this._electronService.ipcRenderer.sendSync(purchaseStr.searchAllUnpay);
    return res;
  }



}
