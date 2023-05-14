import { BaseDao } from './baseDao';
import { IDateSearchById } from '../../app/shared/plyload';
import { Purchase } from '../..//app/shared/model';
import { genUpdateSql, genAddSql } from '../utils/dbHelper';

export class PurchaseDao extends BaseDao {

  constructor() {
    const tableName: string = "purchase";
    // const addSql = `INSERT  into ${tableName} (serialNo, purchaseItemId, createDate, payment) values($serialNo, $purchaseItemId, $createDate, $payment)`;
    // const updateSql = `UPDATE ${tableName} set serialNo=$serialNo, purchaseItemId=$purchaseItemId, createDate=$createDate\n
    // , payment=$payment WHERE id = $id`;
    const addSql = genAddSql(new Purchase(), tableName);
    const updateSql = genUpdateSql(new Purchase(), tableName);
    super(tableName, addSql, updateSql);
  }

  public getByIdAndDate(payload: IDateSearchById) {
    const p = new Promise<Array<Purchase>>((resolve, reject)=> {
      const db = this.getDB();
      const sql = `select * from ${this.tableName} where id=$id and createDate>=$start and createDate<=$end`;
      const body = {
        $id: payload.id,
        $start: payload.start,
        $end: payload.end
      }
      db.all(sql, body, (err: any, rows: Array<Purchase>)=> {
        console.log("err: ", err, "rows: ", rows);
        resolve(rows);
      })

    });

    return p;
  }

  public listByPurchaseIdAndDate(payload: IDateSearchById) {
    const p = new Promise<Array<Purchase>>((resolve, reject)=> {
      const db = this.getDB();
      // const sql = `select * from ${this.tableName} where serialNo=$id and date>=$start and date<=$end`;
       const sql = `select * from ${this.tableName} where id=$id and createDate>=$start and createDate<=$end`;

      const body = {
        $id: payload.id,
        $start: payload.start,
        $end: payload.end
      }
      db.all(sql, body, (err: any, rows: Array<Purchase>)=> {
        console.log("err: ", err, "rows: ", rows);
        resolve(rows);
      })

    });

    return p;
  }

  public listByPurchaseNoAndDate(payload: any) {
    const p = new Promise<Array<Purchase>>((resolve, reject)=> {
      const db = this.getDB();
      // const sql = `select * from ${this.tableName} where serialNo=$id and date>=$start and date<=$end`;
       const sql = `select * from ${this.tableName} where serialNo=$serialNo and createDate>=$start and createDate<=$end`;

      const body = {
        $serialNo: payload.serialNo,
        $start: payload.start,
        $end: payload.end
      }
      db.all(sql, body, (err: any, rows: Array<Purchase>)=> {
        console.log("err: ", err, "rows: ", rows);
        resolve(rows);
      })

    });

    return p;
  }

  listLimitTen() {
    const p = new Promise<Array<Purchase>>((resolve, reject)=> {
      const db = this.getDB();
       const sql = `select * from ${this.tableName} order by createDate desc, id desc limit 10`;

     
      db.all(sql, (err: any, rows: Array<Purchase>)=> {
        // console.log("err: ", err, "rows: ", rows);
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

  setIsDone(id: number) {
    console.log("ididid: ", id);
    const p = new Promise<void>((resolve, reject)=> {
      const db = this.getDB();
       const sql = `update ${this.tableName} set isDone=1 where id=?`;
     
      db.all(sql, id, (err: any, rows: Array<Purchase>)=> {
        if(err !== null) {
          this.logger.error({sql: sql, err: err});
          reject(err);
        } else {
          resolve();
        }
      })

    });

    return p;
  }

  searchAllUnpay() {
    const p = new Promise<Array<Purchase>>((resolve, reject)=> {
      const db = this.getDB();
       const sql = `select * from ${this.tableName} where isDone=0 order by createDate desc, id desc`;
      db.all(sql, (err: any, rows: Array<Purchase>)=> {
        // console.log("err: ", err, "rows: ", rows);
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
  

}
