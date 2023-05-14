import { PurchaseItem, Resp } from '../../app/shared/model';
import { PurchaseItemService } from '../service/purchaseItemService';
const { ipcMain } = require('electron')
import { purchaseItemStr } from '../../app/shared/apiString'
import { InventoryService } from '../service/inventoryService';
import { IFieldSearch, IUpdateField } from '../../app/shared/plyload';
import { BaseDao } from '../dao/baseDao';
import { LoggerService } from '../service/loggerService';
import { DBManager } from '../utils/dbManager';


export class PurchaseItemController {
    purchaseItemService: PurchaseItemService
    inventoryService: InventoryService
    baseDao: BaseDao
    logger: LoggerService
    dbManager: DBManager
    constructor() {
        this.dbManager = DBManager.getInstance();
        this.logger = LoggerService.getInstance();
        this.purchaseItemService = new PurchaseItemService();
        this.inventoryService = new InventoryService();
        this.baseDao = new BaseDao("", "", "");
        this.routeInit();

    }

    routeInit() {
        this.update();
    }

    update() {
        ipcMain.on(purchaseItemStr.update, async(event: any, payload: PurchaseItem)=> {
            // update purchaeItem, and update inventroy amount and price
            // get the old purchaseItem amount first
            this.dbManager.isBegin = true;
            const db = this.baseDao.getDB();
            db.run("BEGIN");
            try {
                const oldItem = await this.purchaseItemService.get(payload.id);
                const amountDiff = payload.amount - oldItem.amount; 
                const res = await this.purchaseItemService.update(payload);
                const inventoryPayload: IFieldSearch = {
                    field: "purchaseItemId",
                    val: oldItem.id
                }
                const inventory = await this.inventoryService.gettByField(inventoryPayload);
                const newAmount = inventory.amount + amountDiff;
                await this.inventoryService.setAmount(newAmount, inventory.id);
                const x: IUpdateField = {
                    id: inventory.id,
                    field: 'price',
                    val: payload.price
                }
                await this.inventoryService.updateField(x);
                db.run("COMMIT");
                console.log("should not be here!!");
                const resp = new Resp<string>("success");
                event.returnValue = resp;

            } catch(e) {
                db.run("ROLLBACK");
                this.dbManager.isBegin = false;

                this.logger.error({ss: "sss", err: e});
                event.returnValue = new Resp<string>("add vender err!!", true);
            }
          
      
          })
    }

}