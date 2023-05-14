import { InventoryDao } from '../dao/inventoryDao';
import { IInventory, Inventory } from '../../app/shared/model';
import { IFieldSearch, IUpdateField } from '../../app/shared/plyload';


export class InventoryService {
  inventoryDao: InventoryDao
  constructor() {
    this.inventoryDao = new InventoryDao();
  }

  async add(body: IInventory) {
    const res = await this.inventoryDao.add(body);
    return res;
  }

  async get(id: number, db=null) {
    const res = await this.inventoryDao.get<Inventory>(id);
    if(res.length > 0) {
      return res[0];
    } else {
      return new Inventory();
    }
  }

  async gettByField(payload: IFieldSearch) {
    const res = await this.inventoryDao.listByField<Inventory>(payload);
    if(res.length > 0) {
      return res[0];
    } else {
      return new Inventory();
    }
  }

  async list() {
    return await this.inventoryDao.list<Inventory>();
  }

  async listByHistoryId(historyId: number) {
    return await this.inventoryDao.listByHistoryId(historyId);
  }

  async listByField(payload: IFieldSearch) {
    return await this.inventoryDao.listByField<Inventory>(payload);
  }

  async setAmount(amount: number, id: number) {
    return await this.inventoryDao.setAmount(amount, id);
  }

  purchaseSearchByVenderIdVO() {

  }

  purchaseSearchLikeItemNameVO() {

  }

  async updateField(payload: IUpdateField) {
    return await this.inventoryDao.updateField(payload);
  }


}
