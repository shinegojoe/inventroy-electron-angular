import { ItemPriceDao } from '../dao/itemPriceDao';
import { IAddItemPrice } from '../../app/shared/plyload';

export class ItemPriceService {
    itemPriceDao: ItemPriceDao
    constructor() {
        this.itemPriceDao = new ItemPriceDao();
    }

    public async getPriceHistoryList(itemId: number) {
        return await this.itemPriceDao.getPriceHistoryList(itemId);
    }

    public async addPrice(body: IAddItemPrice) {
      return await this.itemPriceDao.add(body);
    }
}
