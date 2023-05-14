import { BaseDao } from './baseDao';
import { Item } from '../../app/shared/model';
import { IFieldSearch, IFieldSearchAndId } from '../../app/shared/plyload';
import { genAddSql, genUpdateSql } from '../utils/dbHelper';


export class ItemDao extends BaseDao {
  constructor() {
    const tableName: string = "item";
    const addSql = genAddSql(new Item(), tableName);
    const updateSql = genUpdateSql(new Item(), tableName);
    super(tableName, addSql, updateSql);
  }

  // 0=> false, 1=> true


  listByLikeFieldAndVenderId(payload: IFieldSearchAndId) {
    const p = new Promise<Array<Item>>((resolve, reject) => {
      const db = this.getDB();
      const sql = `select * from ${this.tableName} where ${payload.field} like '%${payload.val}%' and venderId=?`;
      db.all(sql, payload.id, (err: any, rows: Array<Item>) => {
        console.log("err: ", err);
        // console.log(rows);
        resolve(rows);
      })
    })
    return p;
  }


}
