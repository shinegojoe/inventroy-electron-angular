import { BaseDao } from './baseDao';
import { Order } from '../../app/shared/model';
import { genAddSql, genUpdateSql } from '../utils/dbHelper';
import { IFieldSearch } from '../../app/shared/plyload';

export class OrderDao extends BaseDao {
  constructor() {
    const tableName: string = "order_";
    const addSql = genAddSql(new Order(), tableName);
    const updateSql = genUpdateSql(new Order(), tableName);
    
    super(tableName, addSql, updateSql);
  }

  checkSuck(payload: IFieldSearch) {
    const db = this.getDB();
    const p = new Promise<Array<Order>>((resolve, reject)=> {
      const sql = `select * from ${this.tableName} where ${payload.field}=$val and isSuck=1`;
      const body = {
        $val: payload.val 
      }
      db.all(sql, body, (err: any, rows: Array<Order>)=> {
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

  override list<T>() {
    const p = new Promise<Array<T>>((resolve, reject) => {
      const db = this.getDB();
      const sql = `select * from ${this.tableName} order by createDate desc, id desc limit 10`;
      db.all(sql, (err: any, rows: Array<T>) => {
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







}
