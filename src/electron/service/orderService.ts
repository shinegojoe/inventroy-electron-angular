import { OrderDao } from '../dao/orderDao';
import { IOrder, Order } from '../../app/shared/model';
import { IFieldSearch } from '../../app/shared/plyload';


export class OrderService {

    orderDao: OrderDao
    constructor() {
        this.orderDao = new OrderDao();
    }

    async add(body: IOrder): Promise<number> {
        const res = await this.orderDao.add(body);
        // if (res.length > 0) {
        //   const id = res[0]["last_insert_rowid()"];
        //   console.log("id: ", id);
        //   return id;
        // }
        return res;
    }

    async list() {
        // const res: Array<any> = [];
        // return res;
        return await this.orderDao.list<Order>();
    }

    async get(id: number) {
      const res = await this.orderDao.get<Order>(id);
      if(res.length > 0) {
        return res[0];
      } else {
        const newItem = new Order();
        return newItem;
      }
    }

    async listByField(payload: IFieldSearch) {
      const res = await this.orderDao.listByField<Order>(payload);
      return res;
    }

    async listByLikeField(payload: IFieldSearch) {
      const res = await this.orderDao.listByLikeField<Order>(payload);
      return res;
    }

    async checkSuck(payload: IFieldSearch): Promise<boolean> {
      const res = await this.orderDao.checkSuck(payload);
      if(res.length > 0) {
        return true;
      } else {
        return false;
      }
    }

    async update(payload: Order) {
      const res = await this.orderDao.update(payload);
      return res;
    }


}
