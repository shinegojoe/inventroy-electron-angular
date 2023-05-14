import { BaseDao } from './baseDao';
import { IInventoryItemVO } from '../../app/shared/vo';
import { IFieldSearch } from '../../app/shared/plyload';
import { genUpdateSql, genAddSql } from '../utils/dbHelper';
import { Inventory } from '../../app/shared/model';

export class InventoryDao extends BaseDao {
  constructor() {
    const tableName: string = "inventory";
    // const addSql = `INSERT  into ${tableName} (itemId, returnDate, amount, price, purchaseId) values($itemId, $returnDate, $amount, $price, $purchaseId)`;
    // const updateSql = `UPDATE ${tableName} set itemId=$itemId, returnDate=$returnDate, amount=$amount, \n
    // price=$price, purchaseId=$purchaseId WHERE id = $id`;
    const addSql = genAddSql(new Inventory(), tableName)
    const updateSql = genUpdateSql(new Inventory(), tableName);
    super(tableName, addSql, updateSql);
  }

  // override list(): Promise<Array<IInventoryItemVO>> {
  //   const p = new Promise<Array<IInventoryItemVO>>((resolve, reject)=> {
  //     const db = this.getDB();
  //     const sql = `select INV.amount, INV.price, INV.date, ITEM.name as itemName, ITEM.id as itemId, \n
  //     ITEM.serialNo as itemNo from ${this.tableName} as INV inner join item as ITEM on INV.itemId=ITEM.id`;
  //     db.all(sql, (err: any, rows: any)=> {
  //       console.log("err: ", err);
  //       resolve(rows);
  //     })
  //   });
  //   return p;
  // }

    override list<Inventory>(): Promise<Array<Inventory>> {
    const p = new Promise<Array<Inventory>>((resolve, reject)=> {
      const db = this.getDB();
      const sql = `select * from ${this.tableName} order by createDate desc, id desc limit 10`;
      db.all(sql, (err: any, rows: Array<Inventory>)=> {
        console.log("err: ", err);
        resolve(rows);
      })
    });
    return p;
  }

 

  listByHistoryId(historyId: number) {
    const p = new Promise<Array<IInventoryItemVO>>((resolve, reject)=> {
      const db = this.getDB();
      // const sql = `select * from ${this.tableName} where historyId=$historyId`;
      const sql = `select INV.amount, INV.price, INV.date, ITEM.name as itemName, ITEM.id as itemId,\n
       ITEM.serialNo as itemNo from ${this.tableName} as INV inner join item as ITEM on INV.itemId=ITEM.id where INV.historyId=$historyId`;
      const body = {
        $historyId: historyId
      }
      db.all(sql, body, (err: any, rows: any)=> {
        console.log("err: ", err);
        resolve(rows);
      })
    });
    return p;
  }

  setAmount(amount: number, id: number) {
    const p = new Promise<void>((resolve, reject)=> {
      const db = this.getDB();
      const sql = `update ${this.tableName} set amount=$amount where id=$id`;
      const body = {
        $id: id,
        $amount: amount
      };
      db.all(sql, body, (err: any, row: any)=> {
        if(err !== null) {
          this.logger.error({sql: sql, err: err});
          reject(err);
        } else {
          resolve();
        }
      })

    });
    return p
  }

  // searchByCondition(condition: string, val: any) {
  //   const p = new Promise<Array<IInventoryItemVO>>((resolve, reject)=> {
  //     const db = this.getDB();
  //     // const sql = `select * from ${this.tableName} where historyId=$historyId`;
  //     const sql = `select INV.amount, INV.price, INV.date, ITEM.name as itemName, ITEM.id as itemId,\n
  //      ITEM.serialNo as itemNo from ${this.tableName} as INV inner join item as ITEM on INV.itemId=ITEM.id where INV.${condition}=$val`;
  //     const body = {
  //       $val: val
  //     }
  //     db.all(sql, body, (err: any, rows: any)=> {
  //       console.log("err: ", err);
  //       resolve(rows);
  //     })
  //   });
  //   return p;
  // }
  genVOSql(field: string) {
    const sql = `select INV.amount, INV.price, INV.date, ITEM.name as itemName, ITEM.id as itemId,\n
    ITEM.serialNo as itemNo from ${this.tableName} as INV inner join item as ITEM on INV.itemId=ITEM.id where ITEM.${field}=$val`;
    return sql;
  }

  listVOByItemField(payload: IFieldSearch) {
    const p = new Promise<Array<IInventoryItemVO>>((resolve, reject)=> {
      const db = this.getDB();
      // const sql = `select * from ${this.tableName} where historyId=$historyId`;
      const sql = this.genVOSql(payload.field);
      const body = {
        $val: payload.val
      }
      db.all(sql, body, (err: any, rows: Array<IInventoryItemVO>)=> {
        console.log("err: ", err);
        resolve(rows);
      })
    });
    return p;
  }

  purchaseSearchByVenderIdVO(venderId: number) {

  }

  purchaseSearchLikeItemNameVO(itemName: string) {
    const sql = `SELECT IV.date, IV.amount, IV.price, ITEM.name, ITEM.note, ITEM.serialNo, ITEM.venderId
    from ${this.tableName} as IV inner join item as ITEM on IV.itemId = ITEM.id where ITEM.venderId = 1`

  }

  override listByField<T>(payload: IFieldSearch) {
    const p = new Promise<Array<T>>((resolve, reject) => {
      const db = this.getDB();
      const sql = `select * from ${this.tableName} where ${payload.field}=? order by createDate desc, id desc`;
      db.all(sql, payload.val, (err: any, rows: Array<T>) => {
        if(err !== null) {
          this.logger.error({sql: sql, err: err});
          reject(err);
        } else {
          resolve(rows);
        }
      })
    })
    return p;
  }

  // SELECT * from inventory inner join item on inventory.itemId = item.id where item.name LIKE '%3%'
// SELECT * from inventory inner join item on inventory.itemId = item.id where item.venderId = 1

// SELECT IV.date, IV.amount, IV.price, ITEM.name, ITEM.note, ITEM.serialNo, ITEM.venderId
// from inventory as IV inner join item as ITEM on IV.itemId = ITEM.id where ITEM.venderId = 1
// then get vender name

}
