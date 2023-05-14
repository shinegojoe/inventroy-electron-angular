import { ElectronService } from 'ngx-electron';
import { orderStr, orderItemStr } from '../shared/apiString';
import { Injectable } from '@angular/core';
import { IAddOrder, IDateSearch, IFieldSearch } from '../shared/plyload';
import { IOrderVO } from '../shared/vo';
import { Order, OrderItem } from '../shared/model';



@Injectable({
    providedIn: 'root',
})
export class OrderService {

    constructor(private _electronService: ElectronService) {

    }

    get(id: number) {
      const res = this._electronService.ipcRenderer.sendSync(orderStr.get, id);
      return res;
    }

    addOrder(payload: IAddOrder) {
        const res = this._electronService.ipcRenderer.sendSync(orderStr.add, payload);
        return res;
    }

    list(): Array<IOrderVO> {
        const res = this._electronService.ipcRenderer.sendSync(orderStr.list);
        return res;
    }

    listByItemField(payload: IFieldSearch) {
      const res = this._electronService.ipcRenderer.sendSync(orderStr.listByItemField, payload);
      return res;
    }

    listByLikeField(payload: IFieldSearch) {
      const res = this._electronService.ipcRenderer.sendSync(orderStr.listByLikeField, payload);
      return res;
    }

    returnItem(orderItem: OrderItem) {
      const res = this._electronService.ipcRenderer.sendSync(orderItemStr.returnItem, orderItem);
      return res;
    }

    checkSuck(val: string, field: string) {
      const payload: IFieldSearch = {
        field: field,
        val: val
      }
      const res = this._electronService.ipcRenderer.sendSync(orderStr.checkSuck, payload)
      return res;
    }

    setArrive(orderItem: OrderItem) {
      const res = this._electronService.ipcRenderer.sendSync(orderItemStr.setArrive, orderItem);
      return res;
    }

    searchReturnList(start: string, end: string) {
      const payload: IDateSearch = {
        start: start,
        end: end
      }
      const res = this._electronService.ipcRenderer.sendSync(orderItemStr.returnListByDate, payload);
      return res;
    }

    listIOrderVOByField(payload: IFieldSearch): Array<IOrderVO> {
      const res = this._electronService.ipcRenderer.sendSync(orderStr.listIOrderVOByField, payload);
      return res;
    }

    update(order: Order) {
      const res = this._electronService.ipcRenderer.sendSync(orderStr.update, order);
      return res;
    }





}
