import { ItemDao } from '../dao/itemDao';
import { IItem, Item } from '../../app/shared/model';
import { IFieldSearch, IFieldSearchAndId } from '../../app/shared/plyload';


export class ItemService {
  itemDao: ItemDao

  constructor() {
    this.itemDao = new ItemDao();
  }

  public async list() {
    return await this.itemDao.list();
  }

  public async get(id: number) {
    const res = await this.itemDao.get<Item>(id);
    if(res.length > 0) {
      return res[0];
    } else {
      return new Item();
    }
  }

  async listByField(payload: IFieldSearch) {
    return await this.itemDao.listByField(payload);
  }

  public async add(item: IItem): Promise<number> {
    const res = await this.itemDao.add(item);
    // console.log("res: ", res);
    // if(res.length > 0) {
    //   const id = res[0]["last_insert_rowid()"];
    //   console.log("id: ", id);
    //   return id;
    // }
    return res;
  }

  public async setIsCurrentFalse(id: number) {
    // return await this.itemDao.setIsCurrent(id, 0);
  }

  public async setHistoryId(id: number, historyId: number) {
    // return await this.itemDao.setHistoryId(id, historyId);
  }

  public async getHistoryList(historyId: number) {
    // return await this.itemDao.getHistoryList(historyId);
  }

  public async getBySerialNo(serialNo: string) {
    // const res = await this.itemDao.getBySerialNo(serialNo);
    // if(res.length>0) {
    //   return res[0];
    // } else {
    //   return null;
    // }
  }

  public async listByvenderId(venderId: number) {
    // const res = await this.itemDao.listByVenderId(venderId);
    // return res;
  }

  public async listByLikeField(payload: IFieldSearch) {
    return this.itemDao.listByLikeField<Item>(payload);
  }

  public async listByLikeFieldAndVenderId(payload: IFieldSearchAndId) {
    return this.itemDao.listByLikeFieldAndVenderId(payload);
  }

}
