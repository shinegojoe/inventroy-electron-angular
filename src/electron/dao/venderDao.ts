import { BaseDao } from './baseDao';


export class VenderDao extends BaseDao {

    constructor() {
        const tableName: string = "vender";
        const addSql = `INSERT  into ${tableName} (name, phone, serialNo, address, note) values($name, $phone, $serialNo, $address, $note)`;
        const updateSql = `UPDATE ${tableName} set name=$name, phone=$phone, serialNo=$serialNo, address=$address, note=$note WHERE id = $id`;
        super(tableName, addSql, updateSql);
    }

}
