import { Vender, IVender } from '../../app/shared/model';
import { VenderDao } from '../../electron/dao/venderDao';
import { checkIsSameKey } from '../utils';


let id = 0;
test("list, should return Vender[]", async()=> {
  const venderDao = new VenderDao();
  const res = await venderDao.list<Vender>();
  expect(Array.isArray(res)).toBe(true);
  checkIsSameKey<Vender>(res, new Vender());
});

test("add", async()=> {
  const venderDao = new VenderDao();
  const buf = new Vender() as IVender;
  delete buf.id;
  const body = buf;
  id = await venderDao.add(body);
  expect(typeof id).toBe('number');
});

test("update", async()=> {
  const venderDao = new VenderDao();
  const body = new Vender();
  body.id = id;
  const res = await venderDao.update(body);
  
});

test("delete", async()=> {
  const venderDao = new VenderDao();
  const res = await venderDao.deleteById(id);
  
});

