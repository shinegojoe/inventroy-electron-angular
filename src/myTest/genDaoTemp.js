const fs = require('fs');

class GenDaoTemp {

  toNewName(name) {
    var x = name[0].toUpperCase();
    var newName = x;
    for(let i=1; i<name.length;i++) {
      newName += name[i];
    }
    return newName;
  }

  run(name) {
    const fileName = `D:\\project\\inventory\\src\\myTest\\dao\\${name}Dao.test.ts`;
    let content = '';
    const newName = this.toNewName(name);
    content += `import { ${newName}, I${newName} } from '../../app/shared/model';\n`
    content += `import { ${newName}Dao } from '../../electron/dao/${name}Dao';\n`;
    content += `import { checkIsSameKey } from '../utils';\n\n\n`;
    content += "let id = 0;\n";
 
    const list = `test("list, should return ${newName}[]", async()=> {
  const ${name}Dao = new ${newName}Dao();
  const res = await ${name}Dao.list<${newName}>();
  expect(Array.isArray(res)).toBe(true);
  checkIsSameKey<${newName}>(res, new ${newName}());
});`
    const add = `test("add", async()=> {
  const ${name}Dao = new ${newName}Dao();
  const buf = new ${newName}() as I${newName};
  delete buf.id;
  const body = buf;
  id = await ${name}Dao.add(body);
  expect(typeof id).toBe('number');
});`


    const update = `test("update", async()=> {
  const ${name}Dao = new ${newName}Dao();
  const body = new ${newName}();
  body.id = id;
  const res = await ${name}Dao.update(body);
  
});`

    const deleteTest = `test("delete", async()=> {
  const ${name}Dao = new ${newName}Dao();
  const res = await ${name}Dao.deleteById(id);
  
});`

    content += list + "\n\n";
    content += add + "\n\n";
    content += update + "\n\n";
    content += deleteTest + "\n\n";



    try {
      fs.writeFileSync(fileName, content);
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  }
}

const gen = new GenDaoTemp();
// var names = ["item", "vender", "itemPrice", "purchase", "purchaseItem"];
var names = ["inventory"];

for(let name of names) {
  gen.run(name);

}
