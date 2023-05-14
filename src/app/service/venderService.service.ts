import { ElectronService } from 'ngx-electron';
import { testStr, venderStr } from '../shared/apiString';
import { Injectable } from '@angular/core';
import { IVender, Vender, IResp, Resp } from '../shared/model';
import { IFieldSearch } from '../shared/plyload';
import { ToastService } from '../service/toastService.service';


@Injectable({
    providedIn: 'root',
})
export class VenderService {

    constructor(private _electronService: ElectronService, private toastService: ToastService) { }

    public list() {
        return this._electronService.ipcRenderer.sendSync(venderStr.list);
    }

    add(body: IVender) {
        const resp: Resp<string> = this._electronService.ipcRenderer.sendSync(venderStr.add, body);
        if(resp.err) {
            this.toastService.err();
            throw (resp.err);
        } else {
            return resp.data;
        }
    }

    listByLikeField(payload: IFieldSearch): Array<Vender> {
      const resp: Resp<Array<Vender>> = this._electronService.ipcRenderer.sendSync(venderStr.listByLikeField, payload);
      if(!resp.err) {
        return resp.data;
      } else {
        this.toastService.err();
        throw (resp.err);
      }
    }

    update(body: Vender) {
        const resp: Resp<string> = this._electronService.ipcRenderer.sendSync(venderStr.update, body);
        if(resp.err) {
            this.toastService.err();
            throw (resp.err);
        } else {
            return resp.data;
        }
    }
}
