const sqlite3 = require('sqlite3').verbose();
import { config} from '../config'

export class DBManager {

    private static instance: DBManager;
    dbPath: string = config.dbPath;
    isBegin: boolean = false;
    db: any
    constructor() {
    }


   
    public static getInstance(): DBManager {
        if (!DBManager.instance) {
            DBManager.instance = new DBManager();
        }
        return DBManager.instance;
    }

    getDB() {
        if(this.isBegin) {
            return this.db;
        } else {
            const db = new sqlite3.Database(this.dbPath);
            this.db = db;
            return db;
        }
       

    }
}