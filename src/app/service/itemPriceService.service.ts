import { ElectronService } from 'ngx-electron';
import { itemPriceStr } from '../shared/apiString';
import { Injectable } from '@angular/core';
import { IID, IUpgradeItem, IAddItemPrice } from '../shared/plyload';
import { IItem, ItemPrice } from '../shared/model'


@Injectable({
    providedIn: 'root',
})
export class ItemPriceService {

    constructor(private _electronService: ElectronService) {

    }

    getPriceHistoryList(historyId: number): Array<ItemPrice> {
        const payload: IID = {
            id: historyId
        };
        return this._electronService.ipcRenderer.sendSync(itemPriceStr.getPriceHistoryList, payload);
    }

    addPrice(price: number, itemId: number, updateTime: string) {
      const payload: IAddItemPrice = {
        price: price,
        itemId: itemId,
        createTime: updateTime
      };
      return this._electronService.ipcRenderer.sendSync(itemPriceStr.addPrice, payload);


    }

}
