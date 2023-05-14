import { BaseDao } from './baseDao';
import { genAddSql, genUpdateSql } from '../utils/dbHelper';
import { ItemPrice} from '../../app/shared/model';


export class ItemPriceDao extends BaseDao {
    constructor() {
        const tableName: string = "itemPrice";
        const addSql = genAddSql(new ItemPrice(), tableName);
        const updateSql = genUpdateSql(new ItemPrice(), tableName);
        super(tableName, addSql, updateSql);
    }

    getPriceHistoryList(itemId: number) {
        const sql = `select * from ${this.tableName} where itemId=$itemId order by createTime desc`;
        const body = {
            $itemId: itemId
        }
        const p = new Promise((resolve, reject)=> {
            const db = this.getDB();
            db.all(sql, body, (err: any, rows: any)=> {
                console.log("err: ", err);
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