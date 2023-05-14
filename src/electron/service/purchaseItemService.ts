import { PurchaseItemDao } from '../dao/purchaseItemDao';
import { IPurchaseItem, PurchaseItem, Vender, Item} from '../../app/shared/model';
import { IDateSearchById, IFieldSearch } from '../../app/shared/plyload';
import { VenderDao } from '../dao/venderDao';
import { ItemDao } from '../dao/itemDao';
import { IPurchaeVO, PurchaseItemVO } from '../../app/shared/vo';

export class PurchaseItemService {

  purchaseItemDao: PurchaseItemDao
  venderDao: VenderDao
  itemDao: ItemDao
  constructor() {
    this.purchaseItemDao = new PurchaseItemDao();
    this.venderDao = new VenderDao();
    this.itemDao = new ItemDao();
  }

  async get(id: number, db=null) {
    const res = await this.purchaseItemDao.get<PurchaseItem>(id);
    if(res.length > 0) {
      return res[0];
    } else {
      return new PurchaseItem();
    }
  }

  async add(body: IPurchaseItem) {
    return await this.purchaseItemDao.add(body);
  }

  async listByPurchaseId(purchaseId: number) {
    const resList = await this.purchaseItemDao.listByPurchaseId(purchaseId);
    const newList: Array<PurchaseItemVO> = []
    for(let itemVO of resList) {

      const item = await this.itemDao.get<Item>(itemVO.itemId);
      if(item.length > 0) {
        const venderList = await this.venderDao.get<Vender>(item[0].venderId);
        if(venderList.length > 0) {
          const v = venderList[0];
          itemVO.venderName = v.name;
          newList.push(itemVO);
        }
      }
      
    }

    return newList;
  }

  public async purchaseIdsByVenderId(venderId: number) {
    // return purchaseIds which the purchaseItem contains venderId
    return await this.purchaseItemDao.purchaseIdsByVenderId(venderId);
  }

  public async update(payload: PurchaseItem) {
    return await this.purchaseItemDao.update(payload);
  }
}
