// import { OrderItemDao } from '../dao/orderItemDao'
import { OrderItemDaoV2 } from '../dao/orderItemDaoV2';
import { IOrderItem, OrderItem } from '../../app/shared/model';
import { IDateSearch, IFieldSearch } from '../../app/shared/plyload';
import { OrderItemVO } from '../../app/shared/vo';

export class OrderItemSerivce {
    // orderItemDao: OrderItemDao
    orderItemDao: OrderItemDaoV2;
    constructor() {
        // this.orderItemDao = new OrderItemDao();
        this.orderItemDao = new OrderItemDaoV2();
    }

    async add(body: IOrderItem) {
        return this.orderItemDao.add(body);
    }

    list() {

    }

    copyObj(source: any, target: any) {
        for(let [k, v] of Object.entries(source)) {
            target[k] = v;
        }
    }

    async getOrderItemVO(orderItemId: number, itemId: number) {
        const orderItemVO = new OrderItemVO();
        const res = await this.orderItemDao.getOrderItemVO(orderItemId);
        if(res.length > 0) {
            const x = res[0];
            this.copyObj(x, orderItemVO);
        }
        const res2 = await this.orderItemDao.getVenderAndItem(itemId);
        if(res2.length > 0) {
            const x = res2[0];
            orderItemVO.itemName = x.itemName;
            orderItemVO.venderName = x.venderName;
            
        }
        return orderItemVO;
    }

    async listByOrderId(orderId: number) {
        // return this.orderItemDao.listByOrderId(orderId);
        const payload = {
            field: "orderId",
            val: orderId
        }
        return this.orderItemDao.listByField<OrderItem>(payload);
        // const res: Array<any> = [];
        // return res;
    }

    async listByItemField(payload: IFieldSearch) {
      return this.orderItemDao.listVOByItemField(payload);
    }

    async update(payload: OrderItem) {
        return this.orderItemDao.update(payload);
    }

    async returnListByDate(payload: IDateSearch) {
        return this.orderItemDao.returnListByDate(payload);
    }


}
