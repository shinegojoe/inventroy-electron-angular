import { Purchase, IPurchase } from '../../app/shared/model';
import { PurchaseDao } from '../../electron/dao/purchaseDao';
import { checkIsSameKey } from '../utils';


let id = 0;
test("list, should return Purchase[]", async()=> {
  const purchaseDao = new PurchaseDao();
  const res = await purchaseDao.list<Purchase>();
  expect(Array.isArray(res)).toBe(true);
  checkIsSameKey<Purchase>(res, new Purchase());
});

test("add", async()=> {
  const purchaseDao = new PurchaseDao();
  const buf = new Purchase() as IPurchase;
  delete buf.id;
  const body = buf;
  id = await purchaseDao.add(body);
  expect(typeof id).toBe('number');
});

test("update", async()=> {
  const purchaseDao = new PurchaseDao();
  const body = new Purchase();
  body.id = id;
  const res = await purchaseDao.update(body);
  
});

test("delete", async()=> {
  const purchaseDao = new PurchaseDao();
  const res = await purchaseDao.deleteById(id);
  
});

