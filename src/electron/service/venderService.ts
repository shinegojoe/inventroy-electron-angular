import { VenderDao } from '../dao/venderDao';
import { IVender, Vender } from '../../app/shared/model';
import { IFieldSearch } from '../../app/shared/plyload';


export class VenderService {
    venderDao: VenderDao
    constructor() {
        this.venderDao = new VenderDao();
    }

    public async list() {
        return await this.venderDao.list();
    }

    async add(body: IVender) {
        return await this.venderDao.add(body);
    }

    async update(body: Vender) {
        return await this.venderDao.update(body);
    }

    async listByLikeField(payload: IFieldSearch) {
      return await this.venderDao.listByLikeField<Vender>(payload);
    }

    async get(id: number) {
        const res = await this.venderDao.get<Vender>(id);
        if(res.length > 0) {
            return res[0];
        } else {
            return new Vender();
        }
    }
}
