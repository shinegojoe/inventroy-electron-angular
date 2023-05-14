import { PurchaseItem, IPurchaseItem } from '../../app/shared/model';
import { PurchaseItemDao } from '../../electron/dao/purchaseItemDao';
import { checkIsSameKey } from '../utils';


let id = 0;
test("list, should return PurchaseItem[]", async()=> {
  const purchaseItemDao = new PurchaseItemDao();
  const res = await purchaseItemDao.list<PurchaseItem>();
  expect(Array.isArray(res)).toBe(true);
  checkIsSameKey<PurchaseItem>(res, new PurchaseItem());
});

test("add", async()=> {
  const purchaseItemDao = new PurchaseItemDao();
  const buf = new PurchaseItem() as IPurchaseItem;
  delete buf.id;
  const body = buf;
  id = await purchaseItemDao.add(body);
  expect(typeof id).toBe('number');
});

test("update", async()=> {
  const purchaseItemDao = new PurchaseItemDao();
  const body = new PurchaseItem();
  body.id = id;
  const res = await purchaseItemDao.update(body);
  
});

test("delete", async()=> {
  const purchaseItemDao = new PurchaseItemDao();
  const res = await purchaseItemDao.deleteById(id);
  
});

