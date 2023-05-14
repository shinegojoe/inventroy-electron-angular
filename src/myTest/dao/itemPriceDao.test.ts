import { ItemPrice, IItemPrice } from '../../app/shared/model';
import { ItemPriceDao } from '../../electron/dao/itemPriceDao';
import { checkIsSameKey } from '../utils';


let id = 0;
test("list, should return ItemPrice[]", async()=> {
  const itemPriceDao = new ItemPriceDao();
  const res = await itemPriceDao.list<ItemPrice>();
  expect(Array.isArray(res)).toBe(true);
  checkIsSameKey<ItemPrice>(res, new ItemPrice());
});

test("add", async()=> {
  const itemPriceDao = new ItemPriceDao();
  const buf = new ItemPrice() as IItemPrice;
  delete buf.id;
  const body = buf;
  id = await itemPriceDao.add(body);
  expect(typeof id).toBe('number');
});

test("update", async()=> {
  const itemPriceDao = new ItemPriceDao();
  const body = new ItemPrice();
  body.id = id;
  const res = await itemPriceDao.update(body);
  
});

test("delete", async()=> {
  const itemPriceDao = new ItemPriceDao();
  const res = await itemPriceDao.deleteById(id);
  
});

