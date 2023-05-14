import { PurchaseDao } from '../dao/purchaseDao';
import { IPurchase, Purchase } from '../../app/shared/model';
import { IDateSearchById, IFieldSearch } from '../../app/shared/plyload';

export class PurchaseService {
  purchaseDao: PurchaseDao;
  constructor() {
    this.purchaseDao = new PurchaseDao();
  }

  public async add(body: IPurchase): Promise<number> {
    const id = await this.purchaseDao.add(body);
    return id;
  }

  public async getByIdAndDate(payload: IDateSearchById) {
    const res = await this.purchaseDao.getByIdAndDate(payload);
    if(res.length > 0) {
      return res[0];
    } else {
      return new Purchase();
    }
  }

  // public async listByPurchaseIdAndDate(payload: IDateSearchById) {
  //   const res = await this.purchaseDao.listByPurchaseIdAndDate(payload);
  //   return res;
  // }

  public async listByPurchaseNoAndDate(payload: IDateSearchById) {
    const res = await this.purchaseDao.listByPurchaseNoAndDate(payload);
    return res;
  }

  // public async list(): Promise<Array<Purchase>> {
  //   return await this.purchaseDao.list();
  // }

  public async listLimitTen(): Promise<Array<Purchase>> {
    return await this.purchaseDao.listLimitTen();
  }

  public async listByLikeField(payload: IFieldSearch) {
    return await this.purchaseDao.listByLikeField(payload);
  }

  public async listByField(payload: IFieldSearch) {
    return await this.purchaseDao.listByField(payload);
  }

  public async setIsDone(id: number) {
    return await this.purchaseDao.setIsDone(id);
  }

  public async searchAllUnpay() {
    return await this.purchaseDao.searchAllUnpay();

  }








}
