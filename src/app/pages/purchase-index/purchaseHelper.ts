import { IPurchaeVO } from './../../shared/vo';
import { Item } from '../../shared/model';
import { PurchaseService } from '../../service/purchaseService.service';
import { VenderService } from '../../service/venderService.service';
import { IDateSearchById, IFieldSearch } from '../../shared/plyload';
import { Vender, Purchase } from '../../shared/model';


export function copyModel(selectedItemModel: Item | string, key: string) {
  if(typeof selectedItemModel !== "string") {
    const modelBuf = {...selectedItemModel};
    return modelBuf;
  } else {
    const item = new Item() as any;
    item[key] = selectedItemModel;
    // item.name = this.selectedItemModel;
    return item;
  }
}

export interface IPurchaseSearch<T> {
  autoUpdate: (val: string, field: string)=>Array<T>
  search: (start: string, end: string)=>Array<IPurchaeVO>
  selectedModel: any
}

export class VenderSearch implements IPurchaseSearch<Vender> {

  venderService: VenderService
  purchaseService: PurchaseService

  selectedModel = new Vender();
  constructor(venderService: VenderService, purchaseService: PurchaseService) {
    this.venderService = venderService;
    this.purchaseService = purchaseService;
  }

  autoUpdate(val: string, field: string) {

    const payload: IFieldSearch = {
      field: field,
      val: val
    }
    const res = this.venderService.listByLikeField(payload);
    return res;
  }

  search(start: string, end: string) {
    // search by venderId
    console.log("selected model: ", this.selectedModel.id);
    const payload: IDateSearchById = {
      id: this.selectedModel.id,
      start: start,
      end: end
    }
    return this.purchaseService.searchByVenderId(payload);
  }
}

export class PurchaseSearch implements IPurchaseSearch<Purchase>{

  purchaseService: PurchaseService
  selectedModel = new Purchase();
  constructor(purchaseService: PurchaseService) {
    this.purchaseService = purchaseService;
  }

  autoUpdate(val: string, field: string) {
    const payload: IFieldSearch = {
      field: field,
      val: val
    }
    const res = this.purchaseService.listByLikeField(payload);
    return res;

  }

  search(start: string, end: string) {
    // search by purchaseId
    console.log("selected model: ", this.selectedModel);
    const payload: any = {
    serialNo: this.selectedModel.serialNo,
    start: start,
    end: end
    }
    const res = this.purchaseService.searchByPurchaseNo(payload);
    return res;



  }
}
