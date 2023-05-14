

export function genUpdateSql(model: Object, tableName: string) {
    // let sql =  `UPDATE ${tableName} set itemId=itemId, returnDate=$returnDate, amount=$amount, \n
    // price=$price, purchaseId=$purchaseId WHERE id = $id`;

    let sql = `UPDATE ${tableName} set`;

    for (let key of Object.keys(model)) {
        let line = ` ${key}=$${key}, `;
        sql += line;
    }
    sql = sql.substring(0, sql.length - 2);
    sql += ` where id=$id`;
    return sql;
}

export function genAddSql(model: Object, tableName: string) {

    // const addSql = `INSERT  into ${tableName} (itemId, totalPrice, amount,
    //     price, purchaseId) values($itemId, $totalPrice, $amount, $price, $purchaseId)`;

    let sql = `INSERT into ${tableName} (`;

    for (let key of Object.keys(model)) {
        if(key !== "id") {
            let line = `${key}, `;
            sql += line;
        }
    
    }
    sql = sql.substring(0, sql.length - 2);
    sql += ") values(";
    for (let key of Object.keys(model)) {
        if(key !== "id") {
            let line = `$${key}, `;
            sql += line;
        }
     
    }
    sql = sql.substring(0, sql.length - 2);
    sql += ")";

    return sql;
}