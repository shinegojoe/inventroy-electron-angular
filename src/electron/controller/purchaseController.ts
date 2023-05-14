import { IInventory, Item, IPurchaseItem } from './../../app/shared/model';
const { ipcMain } = require('electron')
import { purchaseStr, purchaseItemStr } from '../../app/shared/apiString';
import { IAddPurchase, IDateSearchById, IFieldSearch } from '../../app/shared/plyload';
import { PurchaseService } from '../service/purchaseService';
import { PurchaseItemService } from '../service/purchaseItemService';
import { InventoryService } from '../service/inventoryService';
import { IPurchaeVO, IPurchaseIdVO } from '../../app/shared/vo';
import { LoggerService } from '../../electron/service/loggerService';


export class PurchaseController {

  purchaseService: PurchaseService
  purchaseItemService: PurchaseItemService
  inventroyService: InventoryService
  logger: LoggerService
  constructor() {
    this.purchaseService = new PurchaseService();
    this.purchaseItemService = new PurchaseItemService();
    this.inventroyService = new InventoryService();
    this.logger = LoggerService.getInstance();
    this.routeInit();
  }

  private routeInit() {
    this.add();
    this.list();
    this.searchByVenderId();
    this.listByLikeField();
    this.searchByPurchaseNo();
    this.setIsDone();
    this.searchAllUnpay();
    
  }

  private makeInventoryBody(item: IPurchaseItem, purchaseId: number, createDate: string, purchaseItemId: number):IInventory  {
    const inventoryBody: IInventory = {
      itemId: item.itemId,
      returnDate: '',
      amount: item.amount,
      price: item.price,
      purchaseId: purchaseId,
      createDate: createDate,
      purchaseItemId: purchaseItemId
    }
    return inventoryBody;
  }

  add() {
    ipcMain.on(purchaseStr.add, async(event: any, payload: IAddPurchase)=> {
      // add new purchase,  add purchaseItemList
      const insertedId = await this.purchaseService.add(payload.purchase);
      console.log("inId: ", insertedId);

      for(let item of payload.purchaseItem) {
        item.purchaseId = insertedId;
        const id = await this.purchaseItemService.add(item);

        const inventoryBody = this.makeInventoryBody(item, insertedId, payload.purchase.createDate, id);
        this.logger.info({"inventory body: ": inventoryBody});
        await this.inventroyService.add(inventoryBody);
      }

      event.returnValue = insertedId;

    })
  }

  list() {
    ipcMain.on(purchaseStr.list, async(event: any, payload: any)=> {
      // add new purchase,  add purchaseItemList
      const res: Array<IPurchaeVO> = [];

      const purchaseList = await this.purchaseService.listLimitTen();

      for(let purchase of purchaseList) {
        console.log(purchase);
        const purchaseItemList = await this.purchaseItemService.listByPurchaseId(purchase.id);
        const item: IPurchaeVO = {
          purchase: purchase,
          purchaseItemList: purchaseItemList
        };
        res.push(item);
      }

      event.returnValue = res;
    })
  }


  searchByVenderId() {
    ipcMain.on(purchaseStr.searchByVenderId, async(event: any, payload: IDateSearchById)=> {
      const res: Array<IPurchaeVO> = [];
      const venderId = payload.id as number
      const purchaseIds: Array<IPurchaseIdVO> = await this.purchaseItemService.purchaseIdsByVenderId(venderId);
      const purchaseList = [];
      for(let item of purchaseIds) {
        const newPayload: IDateSearchById = {
          id: item.purchaseId,
          start: payload.start,
          end: payload.end
        }
        const purchase = await this.purchaseService.getByIdAndDate(newPayload);
        purchaseList.push(purchase);
      }
      console.log("purchaseIds: ", purchaseIds);
      console.log("purchaseList: ", purchaseList.length)

      for(let purchase of purchaseList) {
        const purchaseItemList = await this.purchaseItemService.listByPurchaseId(purchase.id);
        if(purchaseItemList.length > 0) {
          const item: IPurchaeVO = {
            purchase: purchase,
            purchaseItemList: purchaseItemList
          };
          res.push(item);
        }
      
      }
      event.returnValue = res;

    })
  }

  searchByPurchaseNo() {
    const res: Array<IPurchaeVO> = [];

    ipcMain.on(purchaseStr.searchByPurchaseNo, async(event: any, payload: IDateSearchById)=> {
      // const purchaseNo = payload.id as string;
      const purchaseList = await this.purchaseService.listByPurchaseNoAndDate(payload);
      console.log("purchaseList: ", purchaseList);
      for(let purchase of purchaseList) {
        const purchaseItemList = await this.purchaseItemService.listByPurchaseId(purchase.id);
        const item: IPurchaeVO = {
          purchase: purchase,
          purchaseItemList: purchaseItemList
        };
        res.push(item);
      }
      event.returnValue = res;

    });

  }

  public listByLikeField() {
    ipcMain.on(purchaseStr.listByLikeField, async (event: any, payload: IFieldSearch) => {
      const res = await this.purchaseService.listByLikeField(payload);
      event.returnValue = res;
    })
  }

  public setIsDone() {
    ipcMain.on(purchaseStr.setIsDone, async (event: any, id: number) => {
      await this.purchaseService.setIsDone(id);
      event.returnValue = 0;
    })
  }

  public searchAllUnpay() {
    ipcMain.on(purchaseStr.searchAllUnpay, async (event: any, payload: null) => {
      const res: Array<IPurchaeVO> = [];
      const purchaseList = await this.purchaseService.searchAllUnpay();
      for(let purchase of purchaseList) {
        console.log(purchase);
        const purchaseItemList = await this.purchaseItemService.listByPurchaseId(purchase.id);
        const item: IPurchaeVO = {
          purchase: purchase,
          purchaseItemList: purchaseItemList
        };
        res.push(item);
      }

      event.returnValue = res;
    })
  }

}
