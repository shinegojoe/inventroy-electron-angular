import { Inventory, IInventory } from '../../app/shared/model';
import { InventoryDao } from '../../electron/dao/inventoryDao';
import { checkIsSameKey } from '../utils';


let id = 0;
test("list, should return Inventory[]", async()=> {
  const inventoryDao = new InventoryDao();
  const res = await inventoryDao.list<Inventory>();
  expect(Array.isArray(res)).toBe(true);
  checkIsSameKey<Inventory>(res, new Inventory());
});

test("add", async()=> {
  const inventoryDao = new InventoryDao();
  const buf = new Inventory() as IInventory;
  delete buf.id;
  const body = buf;
  id = await inventoryDao.add(body);
  expect(typeof id).toBe('number');
});

test("update", async()=> {
  const inventoryDao = new InventoryDao();
  const body = new Inventory();
  body.id = id;
  const res = await inventoryDao.update(body);
  
});

test("delete", async()=> {
  const inventoryDao = new InventoryDao();
  const res = await inventoryDao.deleteById(id);
  
});

