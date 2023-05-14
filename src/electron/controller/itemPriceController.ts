const { ipcMain } = require('electron')
import { itemPriceStr } from '../../app/shared/apiString';
import { IID, IUpgradeItem, IAddItemPrice } from '../../app/shared/plyload';
import { IItem } from '../../app/shared/model';

import { ItemPriceService } from '../service/itemPriceService';


export class ItemPriceController {
    itemPriceService: ItemPriceService
    constructor() {
        this.itemPriceService = new ItemPriceService();
        this.routeInit();
    }

    private routeInit() {
        this.getPriceHistoryList();
        this.add();
    }

    getPriceHistoryList() {
        ipcMain.on(itemPriceStr.getPriceHistoryList, async (event: any, payload: IID) => {
            console.log("payload: ", payload);
            const itemId = payload.id;
            const res = await this.itemPriceService.getPriceHistoryList(itemId);
            event.returnValue = res;
        })
    }

    add() {
      ipcMain.on(itemPriceStr.addPrice, async(event: any, payload: IAddItemPrice)=> {
        const res = await this.itemPriceService.addPrice(payload);
        event.returnValue = res;

      })

    }


}
