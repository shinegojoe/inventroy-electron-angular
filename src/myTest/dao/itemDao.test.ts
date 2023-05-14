import { Item, IItem } from '../../app/shared/model';
import { ItemDao } from '../../electron/dao/itemDao';
import { checkIsSameKey } from '../utils';


let id = 0;
test("list, should return Item[]", async()=> {
  const itemDao = new ItemDao();
  const res = await itemDao.list<Item>();
  expect(Array.isArray(res)).toBe(true);
  checkIsSameKey<Item>(res, new Item());
});

test("add", async()=> {
  const itemDao = new ItemDao();
  const buf = new Item() as IItem;
  delete buf.id;
  const body = buf;
  id = await itemDao.add(body);
  expect(typeof id).toBe('number');
});

test("update", async()=> {
  const itemDao = new ItemDao();
  const body = new Item();
  body.id = id;
  const res = await itemDao.update(body);
  
});

test("delete", async()=> {
  const itemDao = new ItemDao();
  const res = await itemDao.deleteById(id);
  
});

