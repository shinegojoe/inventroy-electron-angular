const sqlite3 = require('sqlite3').verbose();
import { config } from '../config';
import { IFieldSearch, IUpdateField } from '../../app/shared/plyload';
import { LoggerService } from '../service/loggerService';
import { DBManager } from '../utils/dbManager';

class BaseDao {

  dbPath: string = config.dbPath;
  tableName: string = "";
  addSql: string = "";
  updateSql: string = "";
  lastID: number = 0;
  logger: LoggerService;
  dbManager: DBManager
  constructor(tableName: string, addSql: string, updateSql: string) {
    this.tableName = tableName;
    this.addSql = addSql;
    this.updateSql = updateSql;
    this.dbManager = DBManager.getInstance();
    this.logger = LoggerService.getInstance();
  }

  public getDB() {
    // const db = new sqlite3.Database(this.dbPath);
    const db = this.dbManager.getDB();
    return db;
  }

  private parseBody(body: any) {
    const newBody: any = {}
    for (let [k, v] of Object.entries(body)) {
      const newK = `$${k}`;
      newBody[newK] = v;
    }
    return newBody;
  }

  public get<T>(id: number, ) {
   
    
    const db = this.getDB();

    const p = new Promise<Array<T>>((resolve, reject) => {
      const sql = `select * from ${this.tableName} where id=?`;
      db.all(sql, id, (err: any, rows: Array<T>) => {
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

  public listByField<T>(payload: IFieldSearch) {
    const p = new Promise<Array<T>>((resolve, reject) => {
      const db = this.getDB();
      const sql = `select * from ${this.tableName} where ${payload.field}=?`;
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

  public list<T>() {
    const p = new Promise<Array<T>>((resolve, reject) => {
      const db = this.getDB();
      const sql = `select * from ${this.tableName}`;
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

  public add(body: any) {
    // console.log("add body: ", body);
    const newBody: any = this.parseBody(body);
    // console.log("newBody: ", newBody);
    const p = new Promise<number>((resolve, reject) => {
      const db = this.getDB();
      // const sql = `INSERT  into ${this.tableName} (name, val) values($name, $val)`;
      const sql = this.addSql;
      // db.run(sql, newBody, (err: any, rows: any)=> {
      //     console.log("err", err);
      //     console.log("rows: ", rows);


      //     resolve();
      // })

      db.run(sql, newBody, (err: any, rows: any)=> {
        console.log("err: ", err);
        if (err !== null) {
          this.logger.error({sql: sql, err: err});
          reject(err);
        } else {
          const sql = "SELECT last_insert_rowid();";
          db.all(sql, (err2: any, rows: any) => {
            // console.log("err: ", err2, "rows: ", rows);
            if(err2 !== null) {
              this.logger.error({sql: sql, err: err2});

              reject(err2);
            } else {
              const id = rows[0]["last_insert_rowid()"];
              // console.log("id: ", id);
              resolve(id);
            }
          
          })
        }

      })
    })
    return p;

  }


  public deleteById(id: number) {
    console.log("id: ", id);

    const p = new Promise<void>((resolve, reject) => {
      const db = this.getDB();
      const sql = `delete from ${this.tableName} where id=?`;
      console.log("sql: ", sql);
      db.run(sql, id, (err: any) => {
        // console.log("err: ", err);
        if(err !== null) {
          this.logger.error({sql: sql, err: err});
          reject(err);
        } else {
          resolve();
        }
      })

    })
    return p;
  }

  public update(body: any) {
    const p = new Promise<void>((resolve, reject) => {
      const db = this.getDB();
      const sql = this.updateSql;
      const newBody = this.parseBody(body);
      // console.log("new body: ", newBody);
      db.run(sql, newBody, (err: any, rows: any) => {
        if(err !== null) {
          this.logger.error({sql: sql, err: err});
          reject(err);
        } else {
          resolve();
        }
      })
    })
    return p;
  }

  public listByLikeField<T>(payload: IFieldSearch) {
    const p = new Promise<Array<T>>((resolve, reject) => {
      const db = this.getDB();
      const sql = `select * from ${this.tableName} where ${payload.field} like '%${payload.val}%'`;
      db.all(sql, (err: any, rows: Array<T>) => {
        // console.log(rows);
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

  public updateField(payload: IUpdateField) {
    const p = new Promise<void>((resolve, reject) => {
      const db = this.getDB();
      const sql = `update ${this.tableName} set ${payload.field}=$val where id=$id`;
      const body = {
        $val: payload.val,
        $id: payload.id
      }
      db.run(sql, body, (err: any, rows: any) => {
        // console.log(rows);
        if(err !== null) {
          this.logger.error({sql: sql, err: err});
          reject(err);
        } else {
          resolve();

        }
      })
    })
    return p;
  }


}

export { BaseDao }
