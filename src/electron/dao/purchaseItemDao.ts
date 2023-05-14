import { PurchaseItemVO, IPurchaseIdVO } from 'src/app/shared/vo';
import { BaseDao } from './baseDao';
import { PurchaseItem } from '../../app/shared/model';
import { genUpdateSql, genAddSql } from '../utils/dbHelper';

export class PurchaseItemDao extends BaseDao {

  constructor() {
    const tableName: string = "purchaseItem";
    // const addSql = `INSERT  into ${tableName} (itemId, totalPrice, amount,
    //   price, purchaseId) values($itemId, $totalPrice, $amount, $price, $purchaseId)`;
    const addSql = genAddSql(new PurchaseItem(), tableName);
    // const updateSql = `UPDATE ${tableName} set itemId=$itemId, totalPrice=$totalPrice, amount=$amount, price=$price, purchaseId=$purchaseId WHERE id = $id`;
    const updateSql = genUpdateSql(new PurchaseItem(), tableName);
    super(tableName, addSql, updateSql);
  }

  listByPurchaseId(purchaseId: number): Promise<Array<PurchaseItemVO>> {

    const p = new Promise<Array<PurchaseItemVO>>((resolve, reject) => {
      const db = this.getDB();
      // const sql = `select * from ${this.tableName} where purchaseId=$purchaseId`;
      // const sql = `SELECT PI.id as purchaseId, PI.price, PI.amount, \n
      // ITEM.id as itemId , ITEM.name as itemName, ITEM.serialNo as itemNo FROM ${this.tableName} As PI inner join \n
      // item as ITEM on PI.itemId = ITEM.id where PI.purchaseId=$purchaseId`;
      const sql = `SELECT PI.id as purchaseId, PI.price, PI.amount,PI.model,PI.color,PI.size,PI.note, \n
      ITEM.id as itemId , ITEM.name as itemName, ITEM.serialNo as itemNo FROM ${this.tableName} As PI inner join \n
      item as ITEM on PI.itemId = ITEM.id where PI.purchaseId=$purchaseId`;
      const body = { $purchaseId: purchaseId };
      db.all(sql, body, (err: any, rows: any) => {
        if (err !== null) {
          this.logger.error(err);
          reject(err);
        } else {
          resolve(rows);
        }
      })
    });
    return p;
  }



  purchaseIdsByVenderId(venderId: number) {

    const p = new Promise<Array<IPurchaseIdVO>>((resolve, reject) => {
      const db = this.getDB();
      // const sql = `select DISTINCT PI.purchaseId from ${this.tableName} as PI inner join item as ITEM on PI.itemId = ITEM.id\n
      //  where ITEM.venderId=$venderId`;
      const sql = `select DISTINCT PI.purchaseId from ${this.tableName} as PI inner join item as ITEM on PI.itemId = ITEM.id\n
       inner join purchase as P on P.id=PI.purchaseId where ITEM.venderId=$venderId order by P.createDate desc, P.id desc`;
      const body = { $venderId: venderId };
      db.all(sql, body, (err: any, rows: any) => {
        if (err !== null) {
          this.logger.error(err);
          reject(err);
        } else {
          resolve(rows);
        }
      })
    })

    return p;

  }

}
