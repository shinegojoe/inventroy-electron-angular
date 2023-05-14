import { BaseDao } from './baseDao';
import { IOrderIdVO } from '../../app/shared/vo';
import { IDateSearch, IFieldSearch } from '../../app/shared/plyload';
import { Order, OrderItem } from '../../app/shared/model';
import { genAddSql, genUpdateSql } from '../utils/dbHelper';

export interface IOrderItemVOTemp {
  id: number;
  itemId: number;
  sellPrice: number;
  amount: number;
  note: string;
  orderId: number;
  isArrive: number;
  arriveDate: string ;
  inventoryId: number;
  returnDate: string;
  model: string;
  size: string;
  color: string;
}

interface IVenderAndItem {
  itemName: string
  venderName: string
}

export class OrderItemDaoV2 extends BaseDao {
    constructor() {
        const tableName: string = "orderItem";
        const addSql = genAddSql(new OrderItem(), tableName);
        const updateSql = genUpdateSql(new OrderItem(), tableName);
        
        super(tableName, addSql, updateSql);
      }

      // listByOrderId(orderId: number): Promise<Array<IOrderItemVO>> {
      //   const p = new Promise<Array<IOrderItemVO>>((resolve, reject) => {
      //     const db = this.getDB();
      //     // const sql = `select * from ${this.tableName} where historyId=$historyId`;
      //     // const sql = `select OI.id, OI.itemId, OI.sellPrice, ITEM.name as itemName,\n
      //     //  OI.amount, OI.note, OI.orderId, OI.isArrive, OI.arriveDate, OI.inventoryId ,OI.returnDate,
      //     //     ITEM.serialNo as itemNo from ${this.tableName} as OI inner join item as ITEM on OI.itemId=ITEM.id where OI.orderId=$orderId`;
      //         const sql = `select * from ${this.tableName} where orderId=$orderId`;
      //     const body = {
      //       $orderId: orderId
      //     }
      //     db.all(sql, body, (err: any, rows: any) => {
      //       console.log("err: ", err);
      //       resolve(rows);
      //     })
      //   });
      //   return p;
      // }

      getOrderItemVO(orderItemId: number) {
        const sql =  `select OI.*, PI.model, PI.size, PI.color from orderItem as OI inner join inventory as INV on OI.inventoryId=INV.id \n
        inner join purchaseItem as PI on INV.purchaseItemId=PI.id where OI.id=?`;
        const p = new Promise<Array<IOrderItemVOTemp>>((resolve, reject) => {
          const db = this.getDB();
          db.all(sql, orderItemId, (err: any, rows: any) => {
            if(err !== null) {
              this.logger.error({sql: sql, err: err});
              reject(err);
            } else {
              resolve(rows);

            }
          })
        });
        return p;
      }

      getVenderAndItem(itemId: number) {
        const sql = `select I.name as itemName, V.name as venderName from item as I inner join vender as V on I.venderId=V.id where I.id=?`;
        const p = new Promise<Array<IVenderAndItem>>((resolve, reject) => {
          const db = this.getDB();
          db.all(sql, itemId, (err: any, rows: any) => {
            if(err !== null) {
              this.logger.error({sql: sql, err: err});
              reject(err);
            } else {
              resolve(rows);

            }
          })
        });
        return p;
      }



      genVOSql(field: string) {
        const sql = `select DISTINCT OI.orderId  from ${this.tableName} as OI inner join item as ITEM on OI.itemId=ITEM.id where ITEM.${field}=$val`;
        return sql;
      }

      listVOByItemField(payload: IFieldSearch) {
        const p = new Promise<Array<IOrderIdVO>>((resolve, reject)=> {
          const db = this.getDB();
          const sql = this.genVOSql(payload.field);
          const body = {
            $val: payload.val
          }
          db.all(sql, body, (err: any, rows: Array<IOrderIdVO>)=> {
            console.log("err: ", err);
            resolve(rows);
          })
        });
        return p;
      }

      returnListByDate(payload: IDateSearch) {
        const p = new Promise<Array<OrderItem>>((resolve, reject)=> {
          const db = this.getDB();
          const sql = `select * from ${this.tableName} as OI inner join order_ as O on OI.orderId=O.id \n
          where OI.returnDate !='' and O.createDate >=$start and O.createDate<=$end`;
          const body = {
            $start: payload.start,
            $end: payload.end
          }
          db.all(sql, body, (err: any, rows: Array<OrderItem>)=> {
            if(err !== null) {
              this.logger.error({sql: sql, err: err})
              reject(err);
            } else {
              resolve(rows);

            }
          })
        });
        return p;
      }
}
